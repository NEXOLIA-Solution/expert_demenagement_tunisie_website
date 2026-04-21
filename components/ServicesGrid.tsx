"use client"


import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Home,
  Building2,
  Package,
  Warehouse,
  Piano,
  TruckIcon,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react"

const ServicesGrid = () => {


     const services = [
    {
      icon: Home,
      title: "Déménagement résidentiel",
      description: "Service complet pour particuliers et familles",
      details: [
        "Évaluation gratuite à domicile",
        "Fourniture de matériel d'emballage professionnel",
        "Démontage et remontage de meubles",
        "Transport sécurisé et assuré",
        "Installation complète dans votre nouveau logement",
        "Nettoyage de l'ancien logement (option)",
      ],
      highlight: "Service le plus populaire",
    },
    {
      icon: Building2,
      title: "Déménagement commercial",
      description: "Solutions professionnelles pour entreprises",
      details: [
        "Planification détaillée avec chef de projet dédié",
        "Déménagement en dehors des heures d'ouverture",
        "Transport sécurisé de matériel informatique",
        "Installation ergonomique des espaces de travail",
        "Minimisation des temps d'arrêt",
        "Coordination avec vos équipes IT",
      ],
      highlight: "Idéal pour bureaux",
    },
    {
      icon: Package,
      title: "Service d'emballage",
      description: "Emballage professionnel de tous vos biens",
      details: [
        "Matériaux de qualité professionnelle fournis",
        "Emballage sécurisé d'objets fragiles",
        "Étiquetage systématique par pièce",
        "Cartons spécialisés (vaisselle, livres, vêtements)",
        "Service de déballage et installation",
        "Protection renforcée pour objets de valeur",
      ],
      highlight: "Gain de temps garanti",
    },
    {
      icon: Warehouse,
      title: "Entreposage sécurisé",
      description: "Stockage temporaire ou longue durée",
      details: [
        "Entrepôts sécurisés 24h/24 et 7j/7",
        "Contrôle climatique pour objets sensibles",
        "Surveillance vidéo permanente",
        "Accès flexible selon vos besoins",
        "Assurance tous risques incluse",
        "Solutions de stockage modulables",
      ],
      highlight: "Flexible et sécurisé",
    },
    {
      icon: Piano,
      title: "Transport d'objets lourds",
      description: "Spécialistes des objets encombrants et délicats",
      details: [
        "Piano et instruments de musique",
        "Œuvres d'art et antiquités précieuses",
        "Équipement industriel et machines",
        "Coffres-forts de toutes dimensions",
        "Matériel professionnel spécialisé",
        "Équipe formée aux techniques spécifiques",
      ],
      highlight: "Expertise reconnue",
    },
    {
      icon: TruckIcon,
      title: "Déménagement longue distance",
      description: "Services nationaux et internationaux",
      details: [
        "Couverture nationale complète",
        "Déménagements internationaux vers l'Europe",
        "Suivi GPS en temps réel",
        "Coordination logistique multimodale",
        "Assurance transit international",
        "Assistance douanière pour l'international",
      ],
      highlight: "Partout en France et Europe",
    },
  ]
  return (
    <div>
      
        {/* Services Grid */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 p-4 rounded-2xl">
                        <service.icon className="h-10 w-10 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {service.highlight}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

    </div>
  )
}

export default ServicesGrid
