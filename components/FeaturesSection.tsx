"use client"

import {
    Truck,
    Package,
    Shield,
    Clock,
    Users,
    MapPin,
} from "lucide-react"
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"

const features = [
    {
        icon: Truck,
        title: "Déménagement professionnel",
        description:
            "Équipe expérimentée et équipement moderne pour un déménagement en toute sécurité",
    },
    {
        icon: Package,
        title: "Emballage soigné",
        description:
            "Service d'emballage complet avec matériaux de qualité professionnelle",
    },
    {
        icon: Shield,
        title: "Assurance complète",
        description:
            "Protection totale de vos biens pendant tout le processus de déménagement",
    },
    {
        icon: Clock,
        title: "Ponctualité garantie",
        description:
            "Respect des délais et planification précise de chaque étape",
    },
    {
        icon: Users,
        title: "Équipe qualifiée",
        description:
            "Personnel formé et expérimenté pour un service de qualité supérieure",
    },
    {
        icon: MapPin,
        title: "Couverture nationale",
        description:
            "Interventions sur tout le territoire avec une organisation logistique maîtrisée",
    },
]

// Animations (inchangées)
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
        },
    },
    hover: {
        scale: 1.2,
        rotate: 360,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 10,
        },
    },
};

export function FeaturesSection() {
    return (
        <section
            className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50"
            aria-labelledby="features-heading"
        >
            {/* Background animé (inchangé) */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"
                    animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">

                {/* Header SEO */}
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wide bg-primary/10 px-4 py-2 rounded-full inline-block">
                            Nos avantages déménagement
                        </span>

                        <h2
                            id="features-heading"
                            className="text-4xl md:text-5xl font-bold mb-6 mt-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                        >
                            Pourquoi choisir notre service de déménagement ?
                        </h2>

                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Profitez d’un service de déménagement professionnel, sécurisé et rapide
                            avec une équipe qualifiée et une organisation optimisée pour garantir
                            votre satisfaction.
                        </p>
                    </motion.div>
                </header>

                {/* Liste SEO */}
                <motion.ul
                    role="list"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group list-none"
                        >
                            <Card className="border-2 hover:border-primary hover:shadow-2xl transition-all duration-300 h-full backdrop-blur-sm bg-white/70">
                                <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">

                                    {/* Icône */}
                                    <motion.div
                                        variants={iconVariants}
                                        whileHover="hover"
                                        className="bg-gradient-to-br from-primary/10 to-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow"
                                        aria-hidden="true"
                                    >
                                        <feature.icon className="h-8 w-8 text-primary group-hover:text-blue-600 transition-colors" />
                                    </motion.div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* effet */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ filter: "blur(20px)" }}
                                    />
                                </CardContent>
                            </Card>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    )
}