"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
          {/* <span className="text-lg font-bold tracking-tight">Applivio</span> */}
        </Link>

        {/* Glassy Dock Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-xl shadow-2xl">
          <Link
            href="#features"
            className="rounded-full px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all hover:shadow-md"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="rounded-full px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all hover:shadow-md"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="rounded-full px-5 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all hover:shadow-md"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-300 hover:text-white hidden sm:block transition-colors"
          >
            Login
          </Link>
          <Button size="sm" variant="outline" className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
