'use client';

import { motion, Variants } from "framer-motion";
import { CheckCircle, Truck, Shield, Clock } from "lucide-react"; // Icônes pertinentes pour les services

const ServicesHero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-gradient-to-br from-secondary via-background to-muted overflow-hidden py-24 md:py-36">
      {/* Arrière-plan avec pattern animé */}
      <motion.div
        className="absolute inset-0 bg-[url('/abstract-moving-boxes-pattern.jpg')] opacity-5"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Éléments flottants pour plus d'énergie */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.header
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">
                ✓ Services sur mesure & équipes certifiées
              </span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight"
          >
            Nos <span className="text-primary">services</span> personnalisés
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty leading-relaxed max-w-3xl mx-auto"
          >
            Des solutions complètes et adaptées à vos besoins : déménagement, garde-meuble,
            transport d'œuvres d'art et bien plus. Chaque service est pensé pour vous offrir
            tranquillité d'esprit et satisfaction totale.
          </motion.p>

          {/* Indicateurs de confiance */}
          <motion.ul
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <li className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Transport sécurisé</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Garantie tous risques</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Respect des délais</span>
            </li>
          </motion.ul>
        </motion.header>
      </div>
    </section>
  );
};

export default ServicesHero;