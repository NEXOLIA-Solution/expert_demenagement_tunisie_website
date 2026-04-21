"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaArrowRight,
  FaStar,
  FaTruck,
  FaSmile,
  FaAward,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import axios from "axios";

interface ContactCtaProfessionalEnhancedProps {
  backgroundImage?: string;
  // Les props suivantes sont optionnelles car elles seront surchargées par l'API
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  hours?: string;
  devisLink?: string;
  questionLink?: string;
  stats?: {
    demenagements: number;
    satisfaction: number;
    annees: number;
  };
  trustBadges?: Array<{ label: string; icon?: React.ReactNode }>;
}

const ContactCtaProfessionalEnhanced: React.FC<
  ContactCtaProfessionalEnhancedProps
> = ({
  backgroundImage = "/images/demenagement-bg.jpg",
  // Valeurs par défaut (seront écrasées par l'API si disponible)
  address: defaultAddress = "123 Rue du Commerce, 75001 Paris",
  phone: defaultPhone = "+33 1 23 45 67 89",
  email: defaultEmail = "contact@demenagepro.fr",
  whatsapp: defaultWhatsapp = "+33 6 12 34 56 78",
  hours: defaultHours = "Lun-Ven : 8h-19h | Sam : 9h-17h",
  devisLink = "/devis",
  questionLink = "/contact",
  stats: defaultStats = {
    demenagements: 600,
    satisfaction: 98,
    annees: 10,
  },
  trustBadges: defaultTrustBadges = [
    { label: "Entreprise certifiée", icon: <FaAward /> },
    { label: "4.8/5 sur Google", icon: <FaStar /> },
    { label: "Membre de la FEDEM", icon: null },
  ],
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [counts, setCounts] = useState({ demenagements: 0, satisfaction: 0, annees: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // État pour les données de l'entreprise
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Récupération des données API
  useEffect(() => {
    axios
      .get("http://localhost:2000/company/api")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCompany(response.data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement entreprise:", err);
        setLoading(false);
      });
  }, []);

  // Construction des valeurs dynamiques à partir de l'API
  const phone = company?.phone || defaultPhone;
  const email = company?.email || defaultEmail;
  const address = company?.address || defaultAddress;
  // const whatsapp = company?.phone || defaultWhatsapp;

  // Récupération du WhatsApp depuis les réseaux sociaux (si présent)
  const whatsappFromSocials = company?.socials?.find(
    (s: any) => s.title.toLowerCase() === "whatsapp"
  )?.url;
  // Extraction du numéro depuis l'URL (si c'est une URL WhatsApp)
  const whatsappNumber = whatsappFromSocials
    ? whatsappFromSocials.replace(/^https?:\/\/(wa\.me\/|api\.whatsapp\.com\/send\?phone=)/, "")
    : null;
const whatsapp = company?.phone || defaultWhatsapp;

  // Construction des horaires
  const hoursObj = company?.hours;
  const hours = hoursObj
    ? `Lun-Ven : ${hoursObj.mondayFriday || "8h-19h"} | Sam : ${hoursObj.saturday || "9h-17h"}${hoursObj.sunday ? ` | Dim : ${hoursObj.sunday}` : ""}`
    : defaultHours;

  // Calcul des années d'expérience à partir de foundedYear
  const currentYear = new Date().getFullYear();
  const anneesExperience = company?.foundedYear
    ? currentYear - company.foundedYear
    : defaultStats.annees;

  const stats = {
    demenagements: defaultStats.demenagements, // toujours statique car non fourni par l'API
    satisfaction: defaultStats.satisfaction,
    annees: anneesExperience,
  };

  // Parallax doux sur l'image de fond
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        setOffsetY(window.scrollY * 0.2);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation des compteurs au défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated && !loading) {
          setHasAnimated(true);
          const duration = 2000; // 2 secondes
          const steps = 60;
          const interval = duration / steps;

          const incrementDemenagements = stats.demenagements / steps;
          const incrementSatisfaction = stats.satisfaction / steps;
          const incrementAnnees = stats.annees / steps;

          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCounts({
              demenagements: Math.min(
                Math.round(incrementDemenagements * step),
                stats.demenagements
              ),
              satisfaction: Math.min(
                Math.round(incrementSatisfaction * step),
                stats.satisfaction
              ),
              annees: Math.min(
                Math.round(incrementAnnees * step),
                stats.annees
              ),
            });
            if (step >= steps) clearInterval(timer);
          }, interval);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, stats, loading]);

  // Affichage du loader pendant le chargement initial
  if (loading) {
    return (
      <section className="relative py-24 bg-white flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#a10128] border-t-transparent"></div>
        <p className="ml-4 text-gray-600">Chargement des informations...</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Arrière-plan avec effet parallaxe et overlay moderne */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${offsetY}px) scale(1.05)`,
          }}
        />
        {/* Overlay dégradé sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/70" />
      </div>

      {/* Éléments décoratifs animés (bulles flottantes) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a10128]/5 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#a10128]/5 rounded-full mix-blend-multiply filter blur-3xl animate-float-slower" />
      </div>

      <div className="relative container mx-auto px-4 max-w-6xl z-10">
        {/* En-tête avec animation d'entrée */}
        <div className="flex flex-col items-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-[#a10128]/10 backdrop-blur-sm text-[#a10128] border border-[#a10128]/20 px-4 py-2 rounded-full mb-4 hover:bg-[#a10128]/20 hover:scale-105 transition-all duration-300">
            <HiOutlineSparkles className="text-[#a10128]" />
            <span className="text-sm font-medium">Contact professionnel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            Une question ? Un devis ?
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#a10128] to-[#a10128] rounded-full" />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl text-center">
            Notre équipe est à votre écoute pour vous accompagner dans toutes
            vos démarches.
          </p>
        </div>

        {/* Statistiques avec compteurs animés et effet de survol */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              value: counts.demenagements,
              label: "Déménagements réalisés",
              icon: FaTruck,
              suffix: "+",
            },
            {
              value: counts.satisfaction,
              label: "Clients satisfaits",
              icon: FaSmile,
              suffix: "%",
            },
            {
              value: counts.annees,
              label: "Années d'expérience",
              icon: FaAward,
              suffix: "+",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 text-center hover:bg-white hover:border-[#a10128]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <stat.icon className="text-4xl text-[#a10128] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Carte principale avec effet glassmorphique et brillance */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 hover:shadow-[#a10128]/20 transition-all duration-500 relative overflow-hidden group">
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%]" />

          {/* Colonne coordonnées */}
          <div className="space-y-6 relative z-10 animate-slide-in-left">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-[#a10128] to-[#a10128] rounded-full" />
              Nos coordonnées
            </h3>
            <ul className="space-y-5">
              {[
                {
                  icon: FaMapMarkerAlt,
                  text: address,
                  href: `https://maps.google.com/?q=${encodeURIComponent(
                    address
                  )}`,
                },
                { icon: FaPhoneAlt, text: phone, href: `tel:${phone}` },
                { icon: FaEnvelope, text: email, href: `mailto:${email}` },
                {
                  icon: FaWhatsapp,
                  text: `${whatsapp} (WhatsApp)`,
                  href: `https://wa.me/${whatsapp.replace(/\s/g, "")}`,
                },
                { icon: FaClock, text: hours },
              ].map((item, index) => (
                <li
                  key={index}
                  className="group/item flex items-start gap-4 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="p-3 bg-white/60 rounded-xl group-hover/item:bg-white group-hover/item:scale-110 group-hover/item:shadow-md transition-all duration-300">
                    <item.icon className="text-xl text-[#a10128]" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-lg flex-1 pt-1 hover:underline underline-offset-2 text-gray-700 hover:text-gray-900"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-lg flex-1 pt-1 text-gray-700">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne appel à l'action */}
          <div className="flex flex-col justify-center space-y-6 relative z-10 animate-slide-in-right">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-[#a10128] to-[#a10128] rounded-full" />
              Prêt à déménager ?
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Obtenez votre devis personnalisé en quelques clics ou posez-nous
              directement votre question.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={devisLink}
                className="group/btn relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#a10128] to-[#a10128] hover:from-[#a10128]/90 hover:to-[#a10128]/90 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative">Demander un devis gratuit</span>
                <FaArrowRight className="relative group-hover/btn:translate-x-1 transition-transform" />
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/\s/g, "")}`}
                className="group/btn inline-flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm border border-[#a10128]/30 text-[#a10128] hover:bg-white/80 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Contactez-nous sur WhatsApp</span>
                <FaArrowRight className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
              </a>
            </div>
            {/* Badges de confiance */}
            <div className="flex flex-wrap gap-2 pt-4">
              {defaultTrustBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs bg-white/60 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full border border-gray-200/50 hover:bg-white hover:border-[#a10128]/30 hover:shadow-md transition-all duration-200"
                >
                  {badge.icon && (
                    <span className="text-[#a10128]">{badge.icon}</span>
                  )}
                  {badge.label}
                </span>
              ))}
            </div>

            <p className="text-gray-500 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#a10128] rounded-full animate-pulse" />
              Réponse sous 24h ouvrées
            </p>
          </div>
        </div>
      </div>

      {/* Styles personnalisés pour les animations (à placer dans le global CSS si possible) */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(10px, -20px) scale(1.05);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-15px, 10px) scale(1.1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactCtaProfessionalEnhanced;