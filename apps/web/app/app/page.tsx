import React from "react";
import { auth } from "@applivio/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { VoiceRecorder } from "@/components/voice-recorder";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <VoiceRecorder />
    </div>
  );
};

export default Page;
