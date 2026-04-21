"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceModal } from "./ServiceModal"

// const services = [
//   {
//     title: "Déménagement résidentiel",
//     description:
//       "Service complet pour particuliers incluant emballage, transport et installation.",
//     images: ["/services/res1.jpg", "/services/res2.jpg", "/services/res3.jpg"],
//   },
//   {
//     title: "Déménagement commercial",
//     description:
//       "Solutions professionnelles pour bureaux, entreprises et commerces.",
//     images: ["/services/com1.jpg", "/services/com2.jpg"],
//   },
//   {
//     title: "Transport de piano et objets lourds",
//     description:
//       "Manutention spécialisée avec matériel adapté pour objets fragiles et lourds.",
//     images: ["/services/piano1.jpg", "/services/piano2.jpg"],
//   },
//   {
//     title: "Service d'emballage",
//     description:
//       "Protection optimale avec cartons, bulles et matériaux professionnels.",
//     images: ["/services/pack1.jpg", "/services/pack2.jpg"],
//   },
//   {
//     title: "Entreposage sécurisé",
//     description:
//       "Espaces sécurisés et surveillés pour stockage courte ou longue durée.",
//     images: ["/services/store1.jpg", "/services/store2.jpg"],
//   },
//   {
//     title: "Déménagement longue distance",
//     description:
//       "Transport national avec planification logistique maîtrisée.",
//     images: ["/services/long1.jpg", "/services/long2.jpg"],
//   },
// ]


export const services = [
  {
    title: "Déménagement résidentiel",
    shortDescription: "Un service clé en main pour un déménagement sans stress.",
    fullDescription: `
Notre service de déménagement résidentiel est conçu pour accompagner
les particuliers à chaque étape de leur projet.

Nous prenons en charge :
• L’évaluation préalable de vos besoins
• L’emballage sécurisé de vos biens
• Le démontage et remontage du mobilier
• Le transport avec véhicules adaptés
• L’installation dans votre nouveau logement

Notre priorité est la sécurité de vos biens et votre tranquillité d’esprit.
    `,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "https://images.unsplash.com/photo-1599423300746-b62533397364",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    ],
  },

  {
    title: "Déménagement commercial",
    shortDescription: "Solutions professionnelles pour entreprises et bureaux.",
    fullDescription: `
Nous accompagnons les entreprises dans leurs projets de déménagement
en minimisant l’impact sur leur activité.

Ce service comprend :
• Planification logistique détaillée
• Déménagement de bureaux et équipements IT
• Transport sécurisé de documents sensibles
• Intervention rapide en dehors des heures de travail
• Coordination avec les responsables internes

Une solution fiable, rapide et organisée.
    `,
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      "https://images.unsplash.com/photo-1581092334651-ddf26d9f71b3",
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
  },

  {
    title: "Transport de piano et objets lourds",
    shortDescription: "Manutention spécialisée pour objets fragiles et lourds.",
    fullDescription: `
Nous proposons un service spécialisé pour transporter vos objets volumineux et précieux
en toute sécurité, notamment les pianos et meubles lourds.

Ce service inclut :
• Évaluation du poids et dimensions des objets
• Emballage et protection renforcée
• Utilisation de matériel spécialisé (diables, sangles, coussins)
• Transport sécurisé et manutention experte
• Installation dans votre nouveau logement ou bureau

Votre mobilier fragile est entre de bonnes mains.
    `,
    images: [
      "https://images.unsplash.com/photo-1599423300746-b62533397364",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    ],
  },

  {
    title: "Service d'emballage",
    shortDescription: "Protection optimale avec matériaux professionnels.",
    fullDescription: `
Notre service d’emballage garantit que vos biens arrivent en parfait état à destination.

Nous prenons en charge :
• Fourniture de cartons, papiers bulle et protections sur mesure
• Emballage de la vaisselle, verre et objets fragiles
• Étiquetage clair pour un déballage rapide
• Protection spéciale des meubles et appareils électroménagers
• Déballage et installation si nécessaire

Un emballage professionnel pour une tranquillité totale.
    `,
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "https://images.unsplash.com/photo-1599423300746-b62533397364",
    ],
  },

  {
    title: "Entreposage sécurisé",
    shortDescription: "Espaces sécurisés pour stockage courte ou longue durée.",
    fullDescription: `
Nous offrons des solutions d’entreposage sécurisées pour vos biens, meubles ou archives.

Nos prestations incluent :
• Entrepôts surveillés 24/7 et accès sécurisé
• Gestion de l’humidité et température contrôlée
• Stockage courte ou longue durée
• Assistance pour le chargement et déchargement
• Inventaire complet pour chaque client

Gardez vos biens en sécurité, en toute tranquillité.
    `,
    images: [
      "https://images.unsplash.com/photo-1581092334651-ddf26d9f71b3",
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    ],
  },

  {
    title: "Déménagement longue distance",
    shortDescription: "Transport national avec planification logistique maîtrisée.",
    fullDescription: `
Notre service de déménagement longue distance assure un transport sécurisé
de vos biens partout dans le pays.

Ce service inclut :
• Planification logistique détaillée
• Suivi en temps réel du transport
• Emballage et manutention professionnelle
• Coordination avec transporteurs partenaires
• Livraison sécurisée et installation sur place

Une solution complète pour vos déplacements longue distance.
    `,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "https://images.unsplash.com/photo-1599423300746-b62533397364",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    ],
  },
]



export function ServicesSection() {
    const [selectedService, setSelectedService] = useState<any>(null)

    return (
        <>
            <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                            Ce que nous offrons
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-3">
                            Nos services
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Des solutions complètes et personnalisées adaptées à tous vos besoins
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {services.map((service, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedService(service)}
                                className="flex items-center gap-4 bg-background p-5 rounded-xl border-2 hover:border-primary hover:shadow-lg transition-all text-left"
                            >
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                </div>
                                <span className="font-semibold">{service.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button asChild size="lg" variant="outline">
                            <Link href="/services">Voir tous nos services en détail</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedService && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </>
    )
}
