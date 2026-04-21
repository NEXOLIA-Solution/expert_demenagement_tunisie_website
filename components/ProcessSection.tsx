"use client"

import { ArrowRight, ClipboardList, CalendarCheck, Package, Truck, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const, // ✅ indique à TS que c'est exactement "spring"
      stiffness: 100,
      damping: 12,
    },
  },
};

const steps = [
  {
    step: "1",
    title: "Devis gratuit",
    desc: "Évaluation personnalisée",
    icon: ClipboardList,
  },
  {
    step: "2",
    title: "Planification",
    desc: "Organisation détaillée",
    icon: CalendarCheck,
  },
  {
    step: "3",
    title: "Emballage",
    desc: "Protection de vos biens",
    icon: Package,
  },
  {
    step: "4",
    title: "Transport",
    desc: "Déplacement sécurisé",
    icon: Truck,
  },
  {
    step: "5",
    title: "Installation",
    desc: "Mise en place finale",
    icon: CheckCircle,
  },
]

// Variants d'animation pour le conteneur et les éléments
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}


const numberVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 },
  },
}

export default function ProcessSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* En-tête avec animations */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide bg-primary/10 px-4 py-2 rounded-full inline-block">
            Comment ça marche
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Notre processus simplifié
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un déménagement réussi en 5 étapes claires. Nous vous accompagnons du début à la fin pour une expérience
            sans stress.
          </p>
        </motion.div>

        {/* Étapes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto"
        >
          {steps.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center relative group"
              >
                {/* Flèche de connexion */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/40 to-primary"
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="absolute -right-3 -top-3 h-6 w-6 text-primary bg-white rounded-full shadow-md p-1" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Numéro de l'étape avec animation */}
                <motion.div
                  variants={numberVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-shadow"
                >
                  {item.step}
                </motion.div>

                {/* Icône avec animation */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="flex justify-center mb-3"
                >
                  <Icon className="h-10 w-10 text-primary group-hover:text-purple-600 transition-colors" />
                </motion.div>

                {/* Texte */}
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Effet de brillance au survol */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ filter: "blur(20px)" }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}