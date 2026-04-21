import type { Metadata } from "next"
import RootLayoutClient from "./RootLayoutClient"
import "./globals.css"

export const metadata: Metadata = {
  title: "Service de Déménagement Professionnel | Votre Expert en Déménagement",
  description:
    "Service de déménagement professionnel, fiable et abordable. Déménagement résidentiel et commercial avec une équipe expérimentée.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>
}
