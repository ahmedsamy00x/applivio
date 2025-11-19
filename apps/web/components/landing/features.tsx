"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mic,
  Sparkles,
  LayoutDashboard,
  BellRing,
  Users,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Voice-Powered Entry",
    description:
      'Simply speak your application details. "I applied to Spotify for Product Designer" is all it takes.',
    icon: Mic,
  },
  {
    title: "AI Parsing",
    description:
      "Our advanced AI extracts company names, roles, and dates from your voice notes automatically.",
    icon: Sparkles,
  },
  {
    title: "Smart Dashboard",
    description:
      "Visualize your job search progress with a Kanban-style board for Applied, Interview, and Offer stages.",
    icon: LayoutDashboard,
  },
  {
    title: "Smart Reminders",
    description:
      "Never miss a follow-up. Get automated nudges when you haven't heard back in a while.",
    icon: BellRing,
  },
  {
    title: "Team Collaboration",
    description:
      "Job hunting with friends or organizing for a placement agency? Collaborate in workspaces.",
    icon: Users,
  },
  {
    title: "Secure Cloud Sync",
    description:
      "Your data is encrypted and synced across all your devices instantly.",
    icon: Lock,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Features designed for speed
          </h2>
          <p className="mt-4 text-zinc-400 md:text-xl max-w-2xl mx-auto">
            Everything you need to manage your job search efficiently, powered
            by AI.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 hover:border-purple-500/30 transition-all h-full group">
                <CardHeader>
                  <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors mb-4">
                    <feature.icon className="h-8 w-8 text-blue-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
