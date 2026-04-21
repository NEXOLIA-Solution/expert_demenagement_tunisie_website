'use client'

import { MapPin, Globe, Phone, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function ServiceAreas() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fallbackCities = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba',
    'Sousse', 'Sfax', 'Nabeul', 'Hammamet',
    'Bizerte', 'Monastir', 'Gafsa', 'Tozeur'
  ]

  const countries = ['France', 'Belgique', 'Suisse', 'Allemagne', 'Pays-Bas', 'Autres pays UE']

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE
    axios.get(`${baseUrl}/company/api`)
      .then(response => {
        if (response.data && response.data.length > 0) setCompany(response.data[0])
        setLoading(false)
      })
      .catch(err => {
        console.error('Erreur lors du chargement des données:', err)
        setError('Impossible de charger les données depuis le serveur.')
        setLoading(false)
      })
  }, [])

  const cities = company?.activityZones || fallbackCities
  const phoneNumber = company?.phone || '+21697524666'
  const isAvailable24h = company?.isAvailable24h || true

  if (loading) {
    return (
      <section className="relative py-10 lg:py-15 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement des zones d'intervention...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-10 lg:py-15 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">{error}</p>
          <p className="text-gray-600 mt-2">Affichage des données par défaut.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-10 lg:py-15 bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 mb-6">
            <MapPin size={20} className="animate-bounce" />
            <span className="text-sm font-bold tracking-wider">ZONES D'INTERVENTION</span>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Où intervenons-nous ?
          </h2>
          <p className="text-gray-600">
            Couverture complète du territoire tunisien avec un service de déménagement international vers l'Europe
          </p>
        </header>

        <main className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Cities Cards */}
          <article className="space-y-6">
            <div className="group relative rounded-2xl bg-white p-6 shadow hover:shadow-lg transition-shadow border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                  Territoire Tunisien
                </h3>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {cities.length}+ villes
                </span>
              </div>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cities.map((city: string) => (
                  <li
                    key={city}
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition transform ${hoveredCity === city
                      ? 'bg-primary text-white scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Right - CTA */}
          <aside className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-3">Vous êtes dans une autre ville ?</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre équipe expérimentée est prête à vous proposer une solution de déménagement adaptée à vos besoins, peu importe où vous vous trouvez.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{cities.length}+</div>
                <div className="text-sm font-medium text-gray-700">Villes Couvertes</div>
              </div>
              <div className="bg-secondary/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-1">
                  {isAvailable24h ? '24/7' : 'Sur rendez-vous'}
                </div>
                <div className="text-sm font-medium text-gray-700">À votre service</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${phoneNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition"
              >
                <Phone className="w-5 h-5" /> Contacter via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/devis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center border-2 border-primary text-primary font-bold py-3 rounded-lg
             hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm
             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                Demander un Devis
              </a>
            </div>

            <ul className="pt-6 border-t border-gray-200 space-y-2">
              {[`Disponible dans ${cities.length} villes`, 'Équipe professionnelle certifiée', 'Assurance complète incluse'].map(badge => (
                <li key={badge} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <span className="text-gray-700 text-sm">{badge}</span>
                </li>
              ))}
              {company?.address && (
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <span className="text-gray-700 text-sm">Adresse: {company.address}</span>
                </li>
              )}
            </ul>
          </aside>
        </main>
      </div>
    </section>
  )
}