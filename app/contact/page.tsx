"use client"

import { Navigation } from "@/components/navigation"
import { PremiumFooter } from "@/components/premium-footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, FileText, Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import logoAla from "@/public/logoAla.png"
import Link from "next/link"


export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      {/* <Navigation /> */}
      <main ref={containerRef} className="relative overflow-x-hidden">
        {/* Arrière-plans animés */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-float-slower" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-full blur-3xl animate-spin-slow" />
        </div>

        {/* Section Contact compacte */}
        <section className="relative min-h-[calc(100vh-200px)] flex items-center py-12 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Colonne gauche : logo, phrase, réseaux sociaux */}
              <div className="space-y-8 animate-fade-in-left">
                {/* Logo avec pulse */}
                <div className="flex items-center gap-3 group">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src={logoAla}
                      alt="Logo DéménagePro"
                      width={150}
                      height={100}
                      className="object-contain"
                      priority
                    />

                  </Link>
                </div>

                {/* Phrase avec soulignement animé */}
                <p className="text-3xl md:text-4xl font-light leading-relaxed text-balance animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] relative">
                  <span className="relative inline-block">
                    Naviguez rapidement
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full animate-width-grow" />
                  </span>
                  {" "}et partagez vos expériences avec nous sur nos réseaux sociaux
                </p>

                {/* Icônes sociales avec effets */}
                <div className="flex gap-6 pt-6 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                  {[
                    { Icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
                    { Icon: Instagram, href: "https://instagram.com", color: "hover:bg-pink-600" },
                    {
                      Icon: () => (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      ),
                      href: "https://tiktok.com",
                      color: "hover:bg-black dark:hover:bg-white"
                    },
                    { Icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-600" },
                  ].map(({ Icon, href, color }, index) => (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-xl group ${color}`}
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                      <span className="absolute inset-0 rounded-full border-2 border-primary/50 group-hover:border-primary animate-ping-slow opacity-0 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Colonne droite : options de contact */}
              <div className="space-y-6 animate-fade-in-right">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
                  Contactez-nous
                </h3>

                {/* Carte Email */}
                <div className="group relative p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-5 relative">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                      <Mail className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Email</p>
                      <a href="mailto:contact@nexolia.tn" className="text-xl font-medium hover:underline underline-offset-4">
                        contact@nexolia.tn
                      </a>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Réponse sous 24h
                  </div>
                </div>

                {/* Carte WhatsApp */}
                <div className="group relative p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 animate-fade-in-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-5 relative">
                    <div className="p-3 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-500">
                      <Phone className="h-8 w-8 text-green-500 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground group-hover:text-green-500/70 transition-colors">WhatsApp</p>
                      <a href="https://wa.me/21600000000" className="text-xl font-medium hover:underline underline-offset-4">
                        +216 00 000 000
                      </a>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Disponible 24/7
                  </div>
                </div>

                {/* Carte Devis */}
                <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 animate-pulse-soft animate-fade-in-up [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="flex items-center gap-5 relative">
                    <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-500">
                      <FileText className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Devis personnalisé</p>
                      <a href="/devis" className="text-xl font-medium hover:underline underline-offset-4">
                        Demander un devis
                      </a>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold animate-bounce-soft">
                    Gratuit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Call-to-Action (corrigée) */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" />
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float-slower" />

          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Prêt à déménager ?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Visitez notre site web pour découvrir tous nos services, nos offres spéciales et obtenir un devis instantané.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
             
              <Button size="lg" variant="outline" className="group text-lg px-8 py-6 border-2 hover:bg-primary/10">
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

      {/* Styles des animations */}
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

        /* Effet de parallaxe basé sur la souris */
        main {
          transform: translate(calc(var(--mouse-x, 0) * 0.1), calc(var(--mouse-y, 0) * 0.1));
          transition: transform 0.1s ease-out;
        }
      `}</style>
    </>
  )
}