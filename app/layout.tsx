import type { Metadata } from "next"
import RootLayoutClient from "./RootLayoutClient"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.expert-demenagement-tunisie.com"),
  manifest: "/site.webmanifest", // 👈 Ajout crucial pour lier ton fichier de configuration PWA

  title: {
    default: "Déménagement Tunisie Pas Cher | Expert Déménagement & Transport",
    template: "%s | Expert Déménagement Tunisie",
  },

  description:
    "Société de déménagement en Tunisie 🇹🇳. Devis gratuit en 24h pour particuliers et entreprises à Tunis, Ariana, Sousse, Sfax. Camions sécurisés & emballage pro.",
  
  icons: {
    icon: "https://www.expert-demenagement-tunisie.com/logoSite/logo1-removebg-preview.png",
    shortcut: "https://www.expert-demenagement-tunisie.com/logoSite/logo1-removebg-preview.png",
    apple: "https://www.expert-demenagement-tunisie.com/logoSite/logo1-removebg-preview.png",
  },
  
  keywords: [
    // Mots-clés principaux (Génériques Tunisie)
    "déménagement Tunisie",
    "déménageur Tunisie",
    "société de déménagement Tunisie",
    "entreprise de déménagement Tunisie",
    "déménagement pas cher Tunisie",
    "prix déménagement Tunisie",
    "devis déménagement Tunisie",
    
    // Mots-clés par Villes (Le plus important en Tunisie)
    "déménagement Tunis",
    "déménagement Ariana",
    "déménagement Ben Arous",
    "déménagement Sousse",
    "déménagement Sfax",
    "déménagement Nabeul",
    "déménagement Hammamet",
    "déménagement Bizerte",
    
    // Mots-clés spécifiques / Services
    "transport meubles Tunisie",
    "location camion déménagement Tunisie",
    "transport bagages Tunisie",
    "garde meuble Tunisie",
    "déménagement de bureau Tunisie",
    "déménagement résidentiel Tunisie",
    "montage meubles Tunisie"
  ],

  authors: [{ name: "Expert Déménagement Tunisie" }],

  openGraph: {
    title: "Déménagement Tunisie Pas Cher | Service Professionnel 🇹🇳",
    description:
      "Société spécialisée en déménagement résidentiel, commercial et transport de meubles partout en Tunisie. Devis gratuit sous 24h.",
    url: "https://www.expert-demenagement-tunisie.com",
    siteName: "Expert Déménagement Tunisie",
    images: [
      {
        url: "https://www.expert-demenagement-tunisie.com/logoSite/logo1-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Société de déménagement professionnel en Tunisie",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Déménagement Tunisie | Expert Déménagement",
    description: "Service professionnel et économique de déménagement partout en Tunisie. Camions équipés et emballage soigné.",
    images: [
      "https://www.expert-demenagement-tunisie.com/logoSite/logo1-removebg-preview.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>
}