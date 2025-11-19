"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual job seekers.",
    features: [
      "Track up to 20 applications",
      "Basic voice input",
      "Manual status updates",
      "1 Resume version"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For power users who want to land a job fast.",
    features: [
      "Unlimited applications",
      "Advanced AI Parsing",
      "Email integration",
      "Interview insights",
      "Unlimited Resume versions"
    ],
    buttonText: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For agencies and placement tracking.",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Collaborative notes",
      "Admin analytics",
      "Priority support"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
]

export function Pricing() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-zinc-400 md:text-xl">
            Choose the plan that fits your job hunt intensity.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white">Most Popular</Badge>
                </div>
              )}
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-purple-500/50 bg-gradient-to-b from-blue-950/10 to-purple-950/10' : 'bg-zinc-900/50 border-zinc-800'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className={`h-4 w-4 mr-2 ${plan.popular ? 'text-purple-400' : 'text-green-500'}`} />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/20 border-0' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
