"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import { motion } from "framer-motion";
import Hero3DModel from "./hero-3d";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden pt-20">
      {/* Background Gradient Blob */}
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[100px] filter" />
      <div className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px] filter" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8 text-left"
          >
            <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              <span className="text-white/80">
                AI-Powered Job Tracking is Here
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                Track your job search <br /> with just your voice
              </h1>

              <p className="max-w-[600px] text-lg text-zinc-400 md:text-xl leading-relaxed">
                Stop manually filling spreadsheets. Just say "I applied to
                Google for Frontend Engineer" and let Applivio handle the rest.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row pt-4"
            >
              <Button
                size="lg"
                className="h-14 rounded-full px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              >
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full px-8 text-base"
              >
                <Mic className="ml-2 h-5 w-5 mr-2 text-blue-400" />
                Try Voice Input Demo
              </Button>
            </motion.div>

            <div className="flex items-center gap-4 pt-4 text-sm text-zinc-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-black bg-zinc-800"
                  />
                ))}
              </div>
              <p>Trusted by 2,000+ job seekers</p>
            </div>
          </motion.div>

          {/* Right Column: 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full h-full min-h-[500px]">
              <Hero3DModel />

              {/* Decorative Elements behind 3D model */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
