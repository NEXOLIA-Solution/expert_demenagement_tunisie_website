"use client"

import { Navigation } from "@/components/navigation"
import { PremiumFooter } from "@/components/premium-footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, FileText, Facebook, Instagram, Youtube, MapPin, Globe, Loader2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import logoAla from "@/public/logoSite/logo1-removebg-preview.png"
import Link from "next/link"

interface SocialLink {
  title: string
  url: string
  _id: string
}

interface CompanyData {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  description?: string
  website?: string
  socials: SocialLink[]
  logo?: string
  city?: string
  postalCode?: string
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Effet de parallaxe : déplace légèrement le fond en fonction de la souris
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      containerRef.current.style.setProperty('--mouse-x', `${x}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Récupération des données de contact depuis l'API
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const response = await fetch(`${baseUrl}/company/api`)
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setCompany(data[0])
        } else {
          throw new Error('Format de données inattendu')
        }
      } catch (err) {
        console.error('Erreur lors du chargement des coordonnées:', err)
        setError('Impossible de charger les informations de contact. Veuillez réessayer plus tard.')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [])

  const getSocialIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('facebook')) return Facebook
    if (lowerTitle.includes('instagram')) return Instagram
    if (lowerTitle.includes('youtube')) return Youtube
    if (lowerTitle.includes('tiktok')) {
      return () => (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      )
    }
    return Globe
  }

  const getSocialHoverColor = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('facebook')) return 'hover:bg-blue-600'
    if (lowerTitle.includes('instagram')) return 'hover:bg-pink-600'
    if (lowerTitle.includes('youtube')) return 'hover:bg-red-600'
    if (lowerTitle.includes('tiktok')) return 'hover:bg-black dark:hover:bg-white'
    return 'hover:bg-primary'
  }

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des coordonnées...</p>
        </div>
      </main>
    )
  }

  if (error || !company) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4 text-5xl">⚠️</div>
          <p className="text-muted-foreground mb-6">{error || "Données non disponibles"}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Réessayer
          </Button>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* <Navigation /> */}
      <main ref={containerRef} className="relative overflow-x-hidden">
        {/* Arrière-plans animés - désactivés ou réduits sur mobile pour éviter la surcharge */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-80 md:h-80 bg-secondary/30 rounded-full blur-3xl animate-float-slower" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-full blur-3xl animate-spin-slow" />
        </div>

        {/* Section Contact compacte - responsive */}
        <section className="relative min-h-[calc(100vh-200px)] flex items-center py-8 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
              {/* Colonne gauche */}
              <div className="space-y-6 md:space-y-8 animate-fade-in-left">
                {/* Logo */}
                <div className="flex items-center gap-3 group justify-center lg:justify-start">
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src={logoAla}
                      alt={`Logo ${company.name}`}
                      width={120}
                      height={80}
                      className="object-contain md:w-[150px] md:h-[100px]"
                      priority
                    />
                  </Link>
                </div>

                {/* Phrase - taille réduite sur mobile */}
                <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight md:leading-relaxed text-center lg:text-left text-balance animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] relative">
                  <span className="relative inline-block">
                    Naviguez rapidement
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full animate-width-grow" />
                  </span>
                  {" "}et partagez vos expériences avec nous sur nos réseaux sociaux
                </p>

                {/* Icônes sociales - responsive */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-4 md:pt-6 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                  {company.socials && company.socials.length > 0 ? (
                    company.socials.map((social, index) => {
                      const Icon = getSocialIcon(social.title)
                      const hoverColor = getSocialHoverColor(social.title)
                      return (
                        <a
                          key={social._id || index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-xl group ${hoverColor}`}
                          style={{ animationDelay: `${600 + index * 100}ms` }}
                        >
                          <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:text-white transition-colors duration-300" />
                          <span className="absolute inset-0 rounded-full border-2 border-primary/50 group-hover:border-primary animate-ping-slow opacity-0 group-hover:opacity-100" />
                        </a>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground text-sm">Aucun réseau social disponible</p>
                  )}
                </div>

                {/* Adresse - responsive */}
                {company.address && (
                  <div className="flex items-start justify-center lg:justify-start gap-3 text-muted-foreground text-sm md:text-base animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-center lg:text-left">{company.address}</span>
                  </div>
                )}
              </div>

              {/* Colonne droite : options de contact */}
              <div className="space-y-4 md:space-y-6 animate-fade-in-right">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-center lg:text-left animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
                  Contactez-nous
                </h3>

                {/* Carte Email */}
                <div className="group relative p-4 md:p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-3 md:gap-5 relative">
                    <div className="p-2 md:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                      <Mail className="h-5 w-5 md:h-8 md:w-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Email</p>
                      <a href={`mailto:${company.email}`} className="text-sm md:text-xl font-medium hover:underline underline-offset-4 break-all">
                        {company.email}
                      </a>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-2 md:bottom-2 md:right-4 text-[10px] md:text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Réponse sous 24h
                  </div>
                </div>

                {/* Carte Téléphone */}
                <div className="group relative p-4 md:p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 animate-fade-in-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-3 md:gap-5 relative">
                    <div className="p-2 md:p-3 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-500">
                      <Phone className="h-5 w-5 md:h-8 md:w-8 text-green-500 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground group-hover:text-green-500/70 transition-colors">Téléphone / WhatsApp</p>
                      <a href={`tel:${company.phone}`} className="text-sm md:text-xl font-medium hover:underline underline-offset-4">
                        {company.phone}
                      </a>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-2 md:bottom-2 md:right-4 text-[10px] md:text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Disponible 24/7
                  </div>
                </div>

                {/* Site web */}
                {company.website && (
                  <div className="group relative p-4 md:p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in-up [animation-delay:1400ms] opacity-0 [animation-fill-mode:forwards]">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center gap-3 md:gap-5 relative">
                      <div className="p-2 md:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                        <Globe className="h-5 w-5 md:h-8 md:w-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Site web</p>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm md:text-xl font-medium hover:underline underline-offset-4 break-all">
                          {company.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Carte Devis */}
                <div className="group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 animate-pulse-soft animate-fade-in-up [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="flex items-center gap-3 md:gap-5 relative">
                    <div className="p-2 md:p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-500">
                      <FileText className="h-5 w-5 md:h-8 md:w-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Devis personnalisé</p>
                      <a href="/devis" className="text-sm md:text-xl font-medium hover:underline underline-offset-4">
                        Demander un devis
                      </a>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-primary text-primary-foreground text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full font-semibold animate-bounce-soft">
                    Gratuit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Call-to-Action responsive */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0" />
          <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-secondary/20 rounded-full blur-3xl animate-float-slower" />

          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in-up">
              Prêt à déménager ?
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-10 px-2 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Visitez notre site web pour découvrir tous nos services, nos offres spéciales et obtenir un devis instantané.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
              <Button size="lg" variant="outline" className="group text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 hover:bg-primary/10">
                <Link href={"/"}>
                  Voir nos offres
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* <PremiumFooter /> */}

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 30px) rotate(240deg); }
        }
        .animate-float-slow {
          animation: float-slow 20s infinite ease-in-out;
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.2); }
        }
        .animate-float-slower {
          animation: float-slower 25s infinite alternate;
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        @keyframes width-grow {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-width-grow {
          animation: width-grow 1s ease-out forwards;
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-soft {
          animation: bounce-soft 2s infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.02); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s infinite;
        }
        main {
          transform: translate(calc(var(--mouse-x, 0) * 0.1), calc(var(--mouse-y, 0) * 0.1));
          transition: transform 0.1s ease-out;
        }
        /* Ajustements supplémentaires pour très petits écrans */
        @media (max-width: 480px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </>
  )
}