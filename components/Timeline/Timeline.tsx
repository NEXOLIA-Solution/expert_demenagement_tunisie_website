import React from "react"
import { motion, Variants } from "framer-motion"
import { Award, Globe, Lightbulb, Rocket, Star, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "./card"

type Direction = "left" | "right"

const Timeline: React.FC = () => {
  const timeline = [
    {
      year: "2008",
      title: "Début de l'aventure",
      description:
        "Nos experts en déménagement ont commencé leur activité, accompagnant leurs premiers clients avec professionnalisme et soin.",
      icon: <Rocket className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      year: "2010",
      title: "Premiers grands projets",
      description:
        "Nous avons pris en charge nos premiers déménagements d’entreprise et de familles nombreuses, renforçant notre expertise et fiabilité.",
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-green-500 to-teal-600",
    },
    {
      year: "2012",
      title: "Expansion régionale",
      description:
        "Ouverture de nouvelles agences pour desservir toute la région et répondre à la demande croissante de nos clients.",
      icon: <Lightbulb className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      year: "2015",
      title: "Service premium",
      description:
        "Lancement d’un service haut de gamme avec emballage spécialisé, suivi des biens et garantie totale de sécurité.",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-600",
    },
    {
      year: "2018",
      title: "Technologie et innovation",
      description:
        "Mise en place d’outils digitaux pour améliorer le suivi des déménagements et la communication avec nos clients.",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      year: "2023",
      title: "Plus de 5000 déménagements",
      description:
        "Notre expertise reconnue nous a permis d’accompagner plus de 5000 clients avec un taux de satisfaction supérieur à 98%.",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-indigo-500 to-blue-700",
    },
  ]

  /* ---------------- ANIMATION VARIANTS ---------------- */

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const cardVariants: Variants = {
    hidden: (direction: Direction) => ({
      opacity: 0,
      x: direction === "left" ? -60 : 60
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2 }
    }
  }

  /* ---------------- COMPONENT ---------------- */

  return (
    <section className="py-20 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl bg-[#53828a]/10"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#b05f76]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-[#53828a]/20 mb-6">
            <TrendingUp className="w-4 h-4 text-[#53828a] mr-2" />
            <span className="text-[#53828a] font-semibold text-sm">
              Notre Parcours
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Plus de <span className="text-primary">Notre Histoire</span>
          </h1>

          <p className="text-[#727683]">
            Un parcours d'innovation et de croissance continue
          </p>

        </motion.div>

        <div className="max-w-4xl mx-auto">

          <div className="relative">

            {/* Timeline line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#53828a] to-[#b05f76]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />

            {timeline.map((event, index) => {

              const direction: Direction = index % 2 === 0 ? "left" : "right"

              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >

                  <motion.div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                    custom={direction}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >

                    <Card className="border-0 shadow-lg group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm relative overflow-hidden">

                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${event.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`}
                      />

                      <CardContent className="p-6 relative">

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-[#53828a]">
                            {event.year}
                          </div>

                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-r ${event.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                          >
                            {event.icon}
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-[#53828a] mb-2 group-hover:text-[#b05f76] transition-colors duration-300">
                          {event.title}
                        </h3>

                        <p className="text-[#727683] leading-relaxed">
                          {event.description}
                        </p>

                      </CardContent>
                    </Card>

                  </motion.div>

                  {/* Dot */}
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${event.gradient} rounded-full border-4 border-white shadow-lg z-10`}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />

                </div>
              )
            })}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
