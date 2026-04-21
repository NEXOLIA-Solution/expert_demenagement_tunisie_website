"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Building2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Link from "next/link";

// Types
type Partner = {
  _id: string;
  name: string;
  sector: string;
  description: string;
  logo: string;
  year: string;
  testimonial: string;
  bgGradient: string;
};

// Fonction pour grouper un tableau par taille
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

// Variants d'animation pour les cartes
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  }),
  hover: {
    y: -12,
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  },
};

// Variants pour les slides
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  }),
};

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [[index, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Charger les partenaires depuis l'API avec axios
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const response = await axios.get(`${baseUrl}/partner/api/all`);
        
        setPartners(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des partenaires :", err);
        setError("Impossible de charger les partenaires. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Calculer les groupes de partenaires
  // Sur mobile: 1 carte par slide, sur desktop: 3 cartes par slide
  const itemsPerSlide = isMobile ? 1 : 3;
  const partnerGroups = chunkArray(partners, itemsPerSlide);

  const nextSlide = useCallback(() => {
    if (partnerGroups.length === 0) return;
    setPage(([prevIndex]) => [(prevIndex + 1) % partnerGroups.length, 1]);
  }, [partnerGroups.length]);

  const prevSlide = useCallback(() => {
    if (partnerGroups.length === 0) return;
    setPage(([prevIndex]) => [
      (prevIndex - 1 + partnerGroups.length) % partnerGroups.length,
      -1,
    ]);
  }, [partnerGroups.length]);

  // Auto-défilement
  useEffect(() => {
    if (isHovered || partnerGroups.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered, partnerGroups.length]);

  // Réinitialiser l'index si le nombre de groupes change (ex: après suppression ou changement de taille d'écran)
  useEffect(() => {
    setPage([0, 0]);
  }, [partnerGroups.length]);

  // Affichages conditionnels
  if (loading) {
    return (
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return (
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground">Aucun partenaire pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted/20">
      {/* Fond animé avec particules */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 blur-3xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        {/* En-tête avec animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 border-none backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Références prestigieuses
          </Badge>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4 md:mb-6">
            Ils nous ont accordé leur confiance
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            Des entreprises leaders nous ont confié leurs projets stratégiques de déménagement,
            bénéficiant de notre expertise et de notre engagement total.
          </p>
        </motion.div>

        {/* Carousel principal */}
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Boutons de navigation */}
          <motion.div
            className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/80 backdrop-blur-sm border-2 shadow-lg hover:border-primary transition-colors"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </motion.div>

          <motion.div
            className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-background/80 backdrop-blur-sm border-2 shadow-lg hover:border-primary transition-colors"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </motion.div>

          {/* Conteneur des slides */}
          <div className="relative h-[520px] md:h-[520px] lg:h-[480px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-4 md:gap-6 lg:gap-8`}>
                  {partnerGroups[index]?.map((partner, i) => (
                    <motion.div
                      key={partner._id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="h-full"
                    >
                      <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-300 shadow-xl hover:shadow-2xl h-full">
                        {/* Overlay animé */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${partner.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />

                        {/* Effet de brillance */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        <CardContent className="relative pt-6 md:pt-8 pb-6 md:pb-8 px-4 md:px-6 text-center space-y-4 md:space-y-5 h-full flex flex-col">
                          {/* Badge année */}
                          <motion.div
                            className="absolute top-2 right-2 md:top-4 md:right-4"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm text-xs md:text-sm">
                              {partner.year}
                            </Badge>
                          </motion.div>

                          {/* Logo */}
                          <motion.div
                            className="relative h-20 md:h-24 flex items-center justify-center"
                            whileHover={{ rotateY: 10, rotateX: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              width={120}
                              height={50}
                              className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10"
                            />
                          </motion.div>

                          {/* Nom et secteur */}
                          <div className="space-y-1 md:space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                              {partner.name}
                            </h3>
                            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground">
                              <Building2 className="h-3 w-3 md:h-4 md:w-4" />
                              <span className="font-medium">{partner.sector}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1">
                            {partner.description}
                          </p>

                          {/* Témoignage */}
                          <motion.div
                            initial={{ opacity: 0.6, y: 5 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="pt-2 border-t border-primary/10"
                          >
                            <p className="text-xs md:text-sm italic text-foreground/80 mb-2 md:mb-3">
                              "{partner.testimonial}"
                            </p>
                            <div className="flex justify-center items-center gap-2 text-primary font-semibold">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                              </motion.div>
                              <span className="text-xs md:text-sm">Mission accomplie</span>
                            </div>
                          </motion.div>

                          {/* Icône décorative */}
                          <motion.div
                            className="absolute bottom-1 left-1 md:bottom-2 md:left-2 opacity-20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <Award className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicateurs de slide */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-6 md:mt-8 lg:mt-10">
            {partnerGroups.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 md:w-8 bg-primary" : "w-1.5 md:w-2 bg-muted group-hover:bg-primary/50"
                  }`}
                />
                {i === index && (
                  <motion.div
                    className="absolute -inset-1 bg-primary/20 rounded-full blur-sm"
                    layoutId="activeDot"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Appel à l'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-center mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-primary/10"
        >
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6">
            Rejoignez nos partenaires satisfaits
          </p>

          <Link href="/devis">
            <Button size="lg" className="gap-2 px-6 md:px-8 relative overflow-hidden group cursor-pointer text-sm md:text-base">
              <span className="relative z-10">Devenir partenaire</span>

              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 relative z-10 group-hover:translate-x-1 transition-transform" />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}