"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Gift, Rocket, Zap, Star } from "lucide-react"
import Link from "next/link"

export function PromoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  
  // State for particle positions - only generated on client
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  // Generate particle positions only on the client side
  useEffect(() => {
    const positions = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(positions)
  }, [])

  // Parallax effects for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grandes formes floues mouvantes */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ rotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] border-2 border-white/5 rounded-full"
        />

        {/* Particules scintillantes - only render after client-side hydration */}
        {particles.length > 0 && particles.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">ÉDITION LIMITÉE</span>
            </div>
          </motion.div>

          {/* Titre principal avec effet de révélation */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-[1.1] tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent">
              NE RATEZ PAS
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
              NOS OFFRES EXCEPTIONNELLES
            </span>
          </motion.h2>

          {/* Accroche avec animation de mots */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-center text-purple-100/80 mt-8 max-w-3xl mx-auto"
          >
            Des réductions<span className="text-pink-300 font-bold"> jusqu'à -50%</span> sur nos forfaits,
            des nouveautés exclusives et des soldes flash.
            <br />
            <span className="text-white font-semibold">Le moment idéal pour déménager au meilleur prix !</span>
          </motion.p>

          {/* Icônes flottantes décoratives */}
          <div className="relative h-32 my-12">
            <motion.div
              className="absolute left-1/4"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="w-12 h-12 text-pink-300/50" />
            </motion.div>
            <motion.div
              className="absolute right-1/4"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Rocket className="w-12 h-12 text-blue-300/50" />
            </motion.div>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-14 h-14 text-yellow-300/50" />
            </motion.div>
          </div>

          {/* Grille de "points forts" animés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 my-16"
          >
            {[
              { label: "Jusqu'à -50%", icon: Star },
              { label: "Livraison offerte", icon: Gift },
              { label: "Service prioritaire", icon: Rocket },
              { label: "Garantie satisfait", icon: Sparkles },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <item.icon className="w-6 h-6 text-purple-300" />
                <span className="text-sm font-medium text-white/90">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bouton d'appel à l'action ultra-stylisé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <Link href="/actualites">
              <Button
                size="lg"
                className="cursor-pointer group relative px-10 py-7 text-xl font-bold rounded-full overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 border-none shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center gap-3 text-white">
                  Voir les actualités
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
                {/* Effet d'étincelles autour du bouton */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                />
              </Button>
            </Link>
          </motion.div>

          {/* Mini texte de confiance */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center text-sm text-purple-200/60 mt-8"
          >
            * Offres valables dans la limite des stocks disponibles. Ne manquez pas cette chance !
          </motion.p>
        </div>
      </div>
    </section>
  )
}