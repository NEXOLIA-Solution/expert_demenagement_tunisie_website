'use client'

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import logoAla from "@/public/logoSite/logo1-removebg-preview.png"

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagrame: Instagram,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
}

export function PremiumFooter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [company, setCompany] = useState<any>(null)
  const [loadingCompany, setLoadingCompany] = useState(true)
  const [errorCompany, setErrorCompany] = useState<string | null>(null)

  useEffect(() => {
    axios.get('http://localhost:2000/company/api')
      .then(response => {
        if (response.data && response.data.length > 0) setCompany(response.data[0])
        setLoadingCompany(false)
      })
      .catch(err => {
        console.error(err)
        setErrorCompany('Impossible de charger les informations de contact.')
        setLoadingCompany(false)
      })
  }, [])

  const defaultPhone = '+216 XX XXX XXX'
  const defaultEmail = 'info@demenagement.tn'
  const defaultAddress = 'Tunis, Tunisie'
  const defaultName = 'Déménagement'
  const defaultDescription = 'Votre partenaire de confiance pour tous vos déménagements en Tunisie et vers l\'Europe.'

  const phone = company?.phone || defaultPhone
  const emailContact = company?.email || defaultEmail
  const address = company?.address || defaultAddress
  const companyName = company?.name || defaultName
  const companyDescription = company?.description || defaultDescription
  const socials = company?.socials || []
  const logoUrl = company?.logo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE || ''
      await axios.post(`${API_URL}/email-list/api/register`, { email })
      setSuccess('Merci ! Votre email a bien été enregistré.')
      setEmail('')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Devis', path: '/devis' },
  ]

  const serviceLinks = [
    { name: 'Déménagement Local', path: '/services/demenagement-local' },
    { name: 'Déménagement Entreprise', path: '/services/demenagement-entreprise' },

  ]

  if (loadingCompany) {
    return (
      <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white overflow-hidden">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-white/70">Chargement des informations...</p>
        </section>
      </footer>
    )
  }

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="grid md:grid-cols-4 gap-12 py-16 border-b border-white/10">
          {/* Brand Column */}
          <article className="space-y-4">
            <header className="flex items-center gap-3 group">
              <div className="w-20 h-12 bg-gradient-primary rounded-lg flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                {logoUrl ? (
                  <Image src={logoUrl} alt={`Logo ${companyName}`} width={100} height={40} className="object-contain" priority />
                ) : (
                  <Image src={logoAla} alt="Logo DéménagePro" width={100} height={40} className="object-contain" priority />
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg">{companyName}</h2>
                <p className="text-xs text-white/60">Service Premium</p>
              </div>
            </header>
            <p className="text-white/70 leading-relaxed text-sm">{companyDescription}</p>
            <nav className="flex gap-3 pt-4" aria-label="Réseaux sociaux">
              {socials.length > 0 ? (
                socials.map((social: any) => {
                  const Icon = socialIcons[social.title.toLowerCase()] || Facebook
                  return (
                    <a key={social._id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-gradient-primary text-white/70 hover:text-white transition-all flex items-center justify-center group">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  )
                })
              ) : (
                [Facebook, Instagram, Youtube, Twitter].map((Icon, idx) => (
                  <button key={idx} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-gradient-primary text-white/70 hover:text-white transition-all flex items-center justify-center group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                ))
              )}
            </nav>
          </article>

          {/* Quick Links */}
          <nav>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-primary" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-primary" />
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link href={service.path} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic space-y-4">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-primary" />
              Contact
            </h3>
            <a href={`tel:${phone}`} className="flex items-start gap-3 group">
              <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
              <div className="text-sm">
                <span className="text-white/70 group-hover:text-white transition-colors">Téléphone: </span>
                <span className="font-semibold">{phone}</span>
              </div>
            </a>
            <a href={`mailto:${emailContact}`} className="flex items-start gap-3 group">
              <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
              <div className="text-sm">
                <span className="text-white/70 group-hover:text-white transition-colors">Email: </span>
                <span className="font-semibold">{emailContact}</span>
              </div>
            </a>
            <div className="flex items-start gap-3 group">
              <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
              <div className="text-sm">
                <span className="text-white/70 group-hover:text-white transition-colors">Adresse: </span>
                <span className="font-semibold">{address}</span>
              </div>
            </div>
          </address>
        </section>

        {/* Newsletter */}
        <section className="py-12 border-b border-white/10 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <article className="max-w-md">
            <h4 className="font-bold text-lg mb-4">Restez informé</h4>
            <p className="text-white/70 mb-6 text-sm">Abonnez-vous à notre newsletter pour les dernières offres et conseils</p>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-primary rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi...' : "S'abonner"}
              </button>
            </form>
            {success && <p className="mt-2 text-green-400 text-sm">{success}</p>}
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          </article>


           {/* Logo camionnette animé (inchangé) */}
          <div className="flex justify-center items-center w-full md:w-auto">
            <div className="relative w-56 h-36 rounded-xl backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <svg
                width="200"
                height="120"
                viewBox="0 0 200 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
              >
                {/* Éléments de fond (nuages, poussière) */}
                <circle cx="30" cy="30" r="8" fill="white" fillOpacity="0.2" className="animate-cloud" />
                <circle cx="50" cy="20" r="12" fill="white" fillOpacity="0.15" className="animate-cloud-delay" />

                {/* Petit carton volant 1 */}
                <rect x="120" y="25" width="15" height="12" rx="2" fill="#F59E0B" fillOpacity="0.8" className="animate-box1" />
                <rect x="122" y="27" width="11" height="2" fill="white" fillOpacity="0.3" />

                {/* Petit carton volant 2 */}
                <rect x="150" y="45" width="12" height="12" rx="2" fill="#F59E0B" fillOpacity="0.8" className="animate-box2" />
                <rect x="152" y="47" width="8" height="2" fill="white" fillOpacity="0.3" />

                {/* Camion principal */}
                <g className="animate-truck">
                  {/* Carrosserie */}
                  <rect x="10" y="40" width="70" height="25" rx="4" fill="#F59E0B" />
                  <rect x="55" y="20" width="30" height="20" rx="4" fill="#F59E0B" />
                  {/* Roues */}
                  <circle cx="35" cy="65" r="10" fill="#2D3748" />
                  <circle cx="80" cy="65" r="10" fill="#2D3748" />
                  <circle cx="35" cy="65" r="5" fill="#A0AEC0" />
                  <circle cx="80" cy="65" r="5" fill="#A0AEC0" />
                  {/* Conteneur / caisse */}
                  <rect x="85" y="30" width="40" height="25" rx="2" fill="#F59E0B" fillOpacity="0.7" stroke="#F59E0B" strokeWidth="1.5" />
                  {/* Détails de caisse (lignes) */}
                  <line x1="90" y1="37" x2="120" y2="37" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="90" y1="44" x2="120" y2="44" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="90" y1="51" x2="120" y2="51" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Lignes de mouvement derrière le camion */}
                <line x1="5" y1="55" x2="20" y2="55" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" className="animate-move-line" />
                <line x1="5" y1="50" x2="20" y2="50" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" className="animate-move-line-delay" />
              </svg>

              <style jsx>{`
                @keyframes truck-move {
                  0% { transform: translateX(-3px) rotate(0deg); }
                  50% { transform: translateX(3px) rotate(0.3deg); }
                  100% { transform: translateX(-3px) rotate(0deg); }
                }
                .animate-truck {
                  animation: truck-move 2.5s ease-in-out infinite;
                }
                
                @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                  100% { transform: translateY(0px); }
                }
                .animate-box1 {
                  animation: float 2s ease-in-out infinite;
                }
                .animate-box2 {
                  animation: float 2.3s ease-in-out infinite 0.5s;
                }
                
                @keyframes cloud-drift {
                  0% { transform: translateX(0px); }
                  50% { transform: translateX(8px); }
                  100% { transform: translateX(0px); }
                }
                .animate-cloud {
                  animation: cloud-drift 4s ease-in-out infinite;
                }
                .animate-cloud-delay {
                  animation: cloud-drift 5s ease-in-out infinite 1s;
                }
                
                @keyframes line-move {
                  0% { transform: translateX(0px); opacity: 0.3; }
                  50% { transform: translateX(5px); opacity: 1; }
                  100% { transform: translateX(0px); opacity: 0.3; }
                }
                .animate-move-line {
                  animation: line-move 1.5s ease-in-out infinite;
                }
                .animate-move-line-delay {
                  animation: line-move 1.8s ease-in-out infinite 0.3s;
                }
              `}</style>
            </div>
          </div>
        </section>

        {/* Footer Bottom */}
        <section className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © 2024 Déménagement Premium. Tous droits réservés.
          </p>
          <nav className="flex gap-6 text-sm text-white/60" aria-label="Liens légaux">
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/conditions-utilisation" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
            <Link href="/plan-site" className="hover:text-white transition-colors">Plan du site</Link>
          </nav>
        </section>
      </div>
    </footer>
  )
}



































