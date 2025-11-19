"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Alex Chen",
    role: "Frontend Developer",
    company: "TechCorp",
    content: "I applied to 50 jobs in one day using voice input. It felt like magic. Got 3 offers within a week.",
    avatar: "AC"
  },
  {
    name: "Sarah Jones",
    role: "Product Manager",
    company: "StartupInc",
    content: "The AI parsing is incredibly accurate. It even picked up the salary range I mumbled.",
    avatar: "SJ"
  },
  {
    name: "Michael Brown",
    role: "UX Designer",
    company: "DesignStudio",
    content: "Finally, a job tracker that doesn't feel like a second job. The dashboard is beautiful.",
    avatar: "MB"
  },
  {
    name: "Emily Davis",
    role: "Data Scientist",
    company: "BigData Co",
    content: "Team mode helped us organize our university placement drive perfectly.",
    avatar: "ED"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-zinc-950/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">Loved by job seekers</h2>
      </div>
      
      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-marquee gap-6 px-4">
          {[...testimonials, ...testimonials].map((item, i) => (
            <Card key={i} className="min-w-[300px] max-w-[300px] bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} />
                  <AvatarFallback>{item.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role} @ {item.company}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300">"{item.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
