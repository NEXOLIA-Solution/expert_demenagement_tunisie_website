'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, Shield, Heart } from 'lucide-react'

interface GalleryItem {
  id: string
  category: string
  title: string
  image: string
  description: string
}

export function BeforeAfterGallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const items: GalleryItem[] = [
    {
      id: '1',
      category: 'apartment',
      title: 'Déménagement d\'Appartement',
      image: '/services/interior-design-consulting.jpg',
      description: 'Relocalisation complète d\'un appartement de 3 pièces en 6 heures',
    },
    {
      id: '2',
      category: 'fragile',
      title: 'Emballage d\'Objets Fragiles',
      image: '/services/professional-cleaning.jpg',
      description: 'Cristallerie, porcelaine et verres emballés avec le plus grand soin',
    },
    {
      id: '3',
      category: 'truck',
      title: 'Chargement Sécurisé du Camion',
      image: '/services/packing-storage.jpg',
      description: 'Optimisation de l\'espace avec système de calage professionnel',
    },
    {
      id: '4',
      category: 'installation',
      title: 'Installation Finale',
      image: '/services/assembly-installation.jpg',
      description: 'Placement et agencement des meubles selon vos souhaits',
    },
  ]

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'apartment', label: 'Appartements' },
    { id: 'fragile', label: 'Objets Fragiles' },
    { id: 'truck', label: 'Transport' },
    { id: 'installation', label: 'Installation' },
  ]

  const filteredItems = activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory)

  return (
    <section className="relative py-24 lg:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-primary/10 text-secondary rounded-full px-6 py-3 mb-8 border border-secondary/20">
            <Award size={20} />
            <span className="text-sm font-bold tracking-wider">NOS RÉALISATIONS</span>
          </div>
          <h2 className="section-title mb-6 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
            Nos déménagements en images
          </h2>
          <p className="section-subtitle">
            Chaque projet est traité avec le même niveau d'exigence et de soin. Découvrez quelques-unes de nos réalisations
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 fade-in-up">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary/50 scale-105'
                  : 'bg-white text-foreground border-2 border-border hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="fade-in-up group overflow-hidden rounded-2xl cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 card-hover border border-white/10">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-y-0 translate-y-2 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm group-hover:translate-y-0 translate-y-2 transition-transform delay-100">
                    {item.description}
                  </p>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-gradient-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  {item.category === 'apartment' && '✓ Approuvé'}
                  {item.category === 'fragile' && '★ Premium'}
                  {item.category === 'truck' && '⚡ Pro'}
                  {item.category === 'installation' && '♥ Soigné'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-12 border border-primary/20 fade-in-up">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: '10,000+', desc: 'Déménagements réussis' },
              { icon: Shield, title: '100%', desc: 'Satisfaction client' },
              { icon: Heart, title: 'Zéro', desc: 'Dégâts ou casse' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{item.title}</div>
                <div className="text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
