"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/vBack.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Prêt à déménager ?
        </h2>

        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-95 leading-relaxed">
          Obtenez un devis gratuit et personnalisé en quelques minutes.
          Notre équipe d'experts analysera vos besoins et vous proposera
          la meilleure solution.
        </p>

        <Button
          size="lg"
          variant="secondary"
          className="text-lg px-10 py-6"
          asChild
        >
          <Link href="/devis">
            Demander un devis gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
