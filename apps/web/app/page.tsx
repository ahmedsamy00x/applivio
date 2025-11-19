import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
