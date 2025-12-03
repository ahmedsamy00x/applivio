"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import Orb from "./ui/orb";
import { StarBorder } from "./ui/star-border";
import { Card } from "./ui/card";
import { toast } from "sonner";

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType,
        });

        const file = new File(
          [audioBlob],
          `recording-${Date.now()}.${mediaRecorder.mimeType.includes("webm") ? "webm" : "mp4"}`,
          { type: audioBlob.type }
        );

        setAudioFile(file);
        toast.success("Recording saved successfully!");

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      toast.success("Recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Failed to access microphone. Please check permissions.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording]);

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      toast.error("Please record audio first");
      return;
    }

    try {
      // Prepare FormData for API submission
      const formData = new FormData();
      formData.append("audio", audioFile);

      // TODO: Replace with your actual API endpoint
      // const response = await fetch('/api/jobs/transcribe', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) throw new Error('Upload failed');

      // const result = await response.json();
      // toast.success("Audio submitted successfully!");

      // For now, just show the file info
      toast.success(
        `Ready to submit: ${audioFile.name} (${(audioFile.size / 1024).toFixed(2)} KB)`
      );
      console.log("Audio file ready for submission:", audioFile);
    } catch (error) {
      console.error("Error submitting audio:", error);
      toast.error("Failed to submit audio");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-md aspect-[4/5] rounded-[2.5rem] flex flex-col items-center justify-between p-8 relative bg-background/50 backdrop-blur-sm border-border/50 shadow-xl mx-auto overflow-hidden">
      {/* Spacer to push circle to center */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        {/* Animated Orb Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          {/* Orb is always present but reacts to hover/state if needed */}
        </div>

        {/* Record Button Container */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Orb behind the button when recording */}
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-150">
              <Orb
                hoverIntensity={0.5}
                rotateOnHover={true}
                hue={0}
                forceHoverState={true}
              />
            </div>
          )}

          <button
            onClick={handleRecordToggle}
            className={cn(
              "relative z-20 w-32 h-32 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group",
              isRecording
                ? "bg-transparent scale-110"
                : "bg-foreground/5 hover:bg-foreground/10"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-500",
                isRecording && "opacity-100"
              )}
            />
            {isRecording ? (
              <Square className="w-10 h-10 fill-foreground stroke-none transition-colors duration-300" />
            ) : (
              <Mic
                className={cn(
                  "w-10 h-10 stroke-[1.5] transition-colors duration-300",
                  "text-foreground/70"
                )}
              />
            )}
          </button>

          {/* Recording Timer */}
          {isRecording && (
            <div className="text-foreground/70 text-sm font-mono">
              {formatTime(recordingTime)}
            </div>
          )}

          {/* Audio File Status */}
          {audioFile && !isRecording && (
            <div className="text-foreground/70 text-xs text-center">
              Recording ready
              <br />
              {(audioFile.size / 1024).toFixed(2)} KB
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="w-full">
        <StarBorder
          as="button"
          className="w-full text-lg font-medium"
          color="hsl(var(--foreground))"
          speed="4s"
          onClick={handleSubmit}
          disabled={!audioFile || isRecording}
        >
          {audioFile && !isRecording
            ? "Submit Recording"
            : "Record a new job application"}
        </StarBorder>
      </div>
    </Card>
  );
}
