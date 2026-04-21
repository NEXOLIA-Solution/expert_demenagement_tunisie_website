"use client"

import { motion } from "framer-motion"
import Timeline from "./Timeline/Timeline"

export default function AboutIntro() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-muted/40 to-background">
      
      {/* Background decorative shapes */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary font-semibold uppercase tracking-wide text-sm">
            Qui sommes-nous
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Plus de <span className="text-primary">15 ans d’expertise</span>  
            <br className="hidden md:block" /> au service de votre tranquillité
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Nous transformons chaque déménagement en une expérience fluide,
            humaine et sans stress.
          </p>
        </motion.div>

        {/* STORY */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-background/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Notre histoire
          </h2>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Fondée en <strong>2008</strong>, DéménagePro est née d’une volonté
              simple : repenser le déménagement comme un moment serein et maîtrisé.
              Après avoir vécu plusieurs expériences stressantes, notre fondateur
              a décidé de créer une entreprise centrée sur la confiance et la
              satisfaction client.
            </p>

            <p>
              Au fil des années, nous sommes devenus un acteur de référence dans
              la région, sans jamais renoncer à nos valeurs fondamentales :
              <strong> professionnalisme, fiabilité et attention aux détails</strong>.
              Chaque membre de notre équipe est formé pour manipuler vos biens
              comme s’ils étaient les siens.
            </p>

            <p>
              Aujourd’hui, avec plus de <strong>5 000 déménagements réussis</strong>
              et un taux de satisfaction de <strong>98%</strong>, nous continuons
              d’innover pour offrir un service toujours plus performant,
              transparent et humain.
            </p>
          </div>
        </motion.div>


        {/* Timeline ExpertDemenagement */}
        <Timeline/>
      </div>
    </section>
  )
}
