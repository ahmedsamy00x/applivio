"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How accurate is the voice parsing?",
    answer: "Our AI is trained on thousands of job application patterns. It accurately captures company names, roles, dates, and even notes like 'referral from John' with over 95% accuracy."
  },
  {
    question: "Can I import from other tools?",
    answer: "Yes, we support CSV imports from Excel, Google Sheets, and other trackers. Just upload your file and we'll map the columns."
  },
  {
    question: "Is there a mobile app?",
    answer: "We have a mobile-optimized web app currently, and native iOS/Android apps are coming in Q4 2025."
  },
  {
    question: "What happens to my data if I stop paying?",
    answer: "Your data is yours. If you downgrade to Free, you keep all your data, but you'll be limited to adding new entries if you're over the free limit."
  }
]

export function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
