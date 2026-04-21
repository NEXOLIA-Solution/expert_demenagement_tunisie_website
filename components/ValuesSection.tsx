"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Heart, Users } from "lucide-react" // Assure-toi d'importer tes icônes

export default function ValuesSection() {
  // Définition des valeurs directement dans la component
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque déménagement, avec un souci constant de la qualité.",
    },
    {
      icon: Target,
      title: "Professionnalisme",
      description: "Notre équipe formée garantit un service professionnel et fiable à chaque étape.",
    },
    {
      icon: Heart,
      title: "Bienveillance",
      description: "Nous traitons vos biens avec le plus grand soin, comme s'ils étaient les nôtres.",
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Une relation client basée sur l'écoute, la transparence et la confiance.",
    },
  ]

  return (
    <section className="md:py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wide text-sm">
            Ce qui nous définit
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Nos valeurs
          </h2>

          <p className="text-lg text-muted-foreground">
            Les principes qui guident notre travail au quotidien
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Card className="group h-full border border-muted/60 bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-10 pb-8 px-6 text-center">

                  {/* Icon */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="absolute inset-0 w-14 h-14 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <value.icon className="relative h-12 w-12 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
