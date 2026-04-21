'use client'

import { Lightbulb, CheckCircle2, Phone, ArrowRight, Mail, MapPin, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CompanyData {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  description: string
  website: string
  hours: {
    mondayFriday: string
    saturday: string
    sunday: string
  }
  socials: Array<{
    title: string
    url: string
    _id: string
  }>
  activityZones: string[]
  services: string[]
  foundedYear: number
  employees: number
  isAvailable24h: boolean
  city: string
  postalCode: string
  matriculeFiscal: string
}

export function TipsSection() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
         const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const response = await fetch(`${baseUrl}/company/api`)
        if (!response.ok) throw new Error('Erreur lors du chargement des données')
        const data = await response.json()
        setCompanyData(data[0]) // Prendre le premier élément du tableau
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de connexion')
        console.error('Erreur API:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanyData()
  }, [])

  const tips = [
    {
      number: '01',
      title: 'Bien préparer son déménagement',
      description: 'Commencez au moins 4 semaines avant. Établissez une liste d\'inventaire, triez vos affaires et décidez quoi garder.',
      points: ['Faire un inventaire', 'Organiser par pièce', 'Estimer le volume'],
      seoKeywords: ['préparation déménagement', 'inventaire maison', 'organisation déménagement']
    },
    {
      number: '02',
      title: 'Quand réserver notre service',
      description: 'Idéalement 2-3 semaines avant la date de votre déménagement pour avoir une meilleure disponibilité.',
      points: ['Obtenir un devis', 'Confirmer la date', 'Préparer l\'accès'],
      seoKeywords: ['réserver déménagement', 'devis déménagement', 'disponibilité déménageur']
    },
    {
      number: '03',
      title: 'Protéger les objets fragiles',
      description: 'Utilisez notre service de bubble-wrap et de cartons spécialisés pour la meilleure protection possible.',
      points: ['Emballer correctement', 'Étiqueter les cartons', 'Assurer les précieux'],
      seoKeywords: ['emballage objets fragiles', 'protection déménagement', 'cartons déménagement']
    },
    {
      number: '04',
      title: 'Checklist jour du déménagement',
      description: 'Le jour J, vérifiez que tout est en place. Nous nous occupons du reste avec professionnalisme.',
      points: ['Vérifier les accès', 'Préparer les documents', 'Dernier tour'],
      seoKeywords: ['jour déménagement', 'checklist déménagement', 'organisation déménagement']
    },
  ]

  // Fonction pour gérer l'appel téléphonique
  const handlePhoneCall = () => {
    if (companyData?.phone) {
      window.location.href = `tel:${companyData.phone.replace(/\s/g, '')}`
    }
  }

  // Fonction pour gérer l'envoi d'email
  const handleEmail = () => {
    if (companyData?.email) {
      window.location.href = `mailto:${companyData.email}?subject=Demande d'information - Déménagement&body=Bonjour, je souhaiterais obtenir plus d'informations sur vos services de déménagement.`
    }
  }

  // Données structurées JSON-LD pour le SEO
  const jsonLd = companyData ? {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": companyData.name,
    "email": companyData.email,
    "telephone": companyData.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyData.address,
      "addressLocality": companyData.city,
      "postalCode": companyData.postalCode,
      "addressCountry": "TN"
    },
    "description": companyData.description,
    "url": companyData.website,
    "sameAs": companyData.socials.map(social => social.url),
    "foundingDate": companyData.foundedYear?.toString(),
    "numberOfEmployees": companyData.employees,
    "areaServed": companyData.activityZones,
    "openingHours": companyData.isAvailable24h ? 
      ["Mo-Su 00:00-23:59"] : 
      [
        companyData.hours.mondayFriday || "Mo-Fr 09:00-18:00",
        companyData.hours.saturday || "Sa 09:00-13:00",
        companyData.hours.sunday || "Su Fermé"
      ]
  } : null

  return (
    <>
      {/* JSON-LD Schema Markup pour SEO */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <section 
        className="relative py-10 lg:py-20 bg-white overflow-hidden"
        aria-label="Conseils pour déménagement"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Background Elements - Optimisés pour performance */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header SEO Optimisé */}
          <header className="text-center mb-20 fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full px-6 py-3 mb-8 border border-primary/20">
              <Lightbulb size={20} className="animate-pulse" aria-hidden="true" />
              <span className="text-sm font-bold tracking-wider">CONSEILS & ASTUCES</span>
            </div>
            <h1 className="section-title mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold">
              Nos conseils pour un déménagement réussi
            </h1>
            <p className="section-subtitle text-lg text-muted-foreground max-w-3xl mx-auto">
              Suivez nos recommandations pour garantir une transition en douceur vers votre nouveau logement
            </p>
          </header>

          {/* Tips Grid avec microdata */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tips.map((tip, index) => (
              <article
                key={index}
                className="fade-in-up group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-border p-8 hover:border-primary/50 transition-all duration-500 card-hover hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
                itemScope
                itemType="https://schema.org/HowTo"
              >
                <meta itemProp="name" content={tip.title} />
                <meta itemProp="description" content={tip.description} />
                
                {/* Number Badge */}
                <div className="text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors mb-4" aria-hidden="true">
                  {tip.number}
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors" itemProp="name">
                  {tip.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed" itemProp="description">
                  {tip.description}
                </p>

                {/* Points avec microdata */}
                <div className="space-y-2" itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                  {tip.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-xs font-medium text-foreground" itemProp="name">{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section avec données dynamiques */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-pink-500 p-12 md:p-16 fade-in-up">
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Besoin d'aide pour préparer votre déménagement ?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {isLoading ? 'Chargement des coordonnées...' : 
                 error ? 'Nos experts sont à votre écoute' : 
                 `${companyData?.name} vous accompagne dans votre projet`}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-6">
                {/* Bouton Appeler - Dynamique */}
                <button
                  onClick={handlePhoneCall}
                  disabled={!companyData?.phone}
                  className={`
                    group relative overflow-hidden
                    px-8 py-4 rounded-2xl
                    bg-white text-primary
                    font-semibold text-lg
                    flex items-center justify-center gap-3
                    shadow-lg transition-all duration-300 ease-in-out
                    hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                    active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  `}
                  aria-label={`Appeler ${companyData?.name || 'notre équipe'}`}
                >
                  <Phone className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                  <span>
                    {isLoading ? 'Chargement...' : 
                     error ? 'Nous contacter' : 
                     companyData?.phone || 'Numéro indisponible'}
                  </span>
                </button>

                {/* Bouton Message - Dynamique */}
                <button
                  onClick={handleEmail}
                  disabled={!companyData?.email}
                  className={`
                    group relative overflow-hidden
                    px-8 py-4 rounded-2xl
                    bg-white/10 backdrop-blur-md
                    text-white font-semibold text-lg
                    border border-white/40
                    flex items-center justify-center gap-3
                    shadow-lg transition-all duration-300 ease-in-out
                    hover:bg-white hover:text-primary
                    hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                    active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  `}
                  aria-label="Envoyer un message"
                >
                  <Mail className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                  <span>Envoyer un message</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                </button>
              </div>

              {/* Informations de contact additionnelles */}
              {companyData && !error && (
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span>{companyData.address}</span>
                  </div>
                  {companyData.isAvailable24h && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>Disponible 24h/24</span>
                    </div>
                  )}
                </div>
              )}

              {/* Trust Line */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm">
                  ✓ Réponse en moins de 24h • ✓ Consultation gratuite • ✓ Experts certifiés
                </p>
              </div>
            </div>
          </div>

          {/* Checklist Download avec microdata */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-border fade-in-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">Check-list avant le jour J</h3>
              <ul className="space-y-3">
                {[
                  'Vérifier les accès (clés, codes, parking)',
                  'Mesurer les portes et escaliers',
                  'Préparer les objets fragiles',
                  'Faire un dernier ménage',
                  'Laisser les clés au syndic',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-gradient-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold text-foreground mb-4">Le jour du déménagement</h3>
              <ul className="space-y-3">
                {[
                  'Arriver à l\'heure convenue',
                  'Protéger les murs et sols',
                  'Diriger l\'équipe si nécessaire',
                  'Vérifier tout avant la fin',
                  'Signer le bon de déménagement',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}