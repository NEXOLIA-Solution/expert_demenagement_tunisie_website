'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, Search, Package, Truck, Home, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import imagDem from "../../public/happy-family-in-new-home-with-movers.jpg"
import axios from 'axios'

interface FAQItem {
  _id: string
  question: string
  answer: string
  order?: number
}

export default function FAQSection() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000'
        const { data } = await axios.get(`${baseUrl}/faq/api/all`)
        setFaqItems(data)
        if (data.length > 0) setExpandedId(data[0]._id)
      } catch (err) {
        console.error('Erreur lors du chargement des FAQs:', err)
        setError('Impossible de charger les FAQs. Veuillez réessayer plus tard.')
      } finally {
        setLoading(false)
      }
    }
    fetchFAQs()
  }, [])

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <p className="text-slate-600 text-xl">Chargement des questions...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <p className="text-red-500 text-xl">{error}</p>
      </section>
    )
  }

  if (faqItems.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <p className="text-slate-600 text-xl">Aucune question fréquente pour le moment.</p>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20 px-4 md:px-8">

      {/* Background */}
      <aside className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-slate-200 rounded-full blur-xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-32 h-32 bg-slate-300 rounded-full blur-xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>

        <figure className="absolute bottom-10 right-20 opacity-10 animate-float">
          <Truck className="w-24 h-24 text-blue-600" />
        </figure>
        <figure className="absolute top-1/3 left-5 opacity-10 animate-float">
          <Home className="w-20 h-20 text-slate-600" />
        </figure>
        <figure className="absolute bottom-1/4 right-10 opacity-10 animate-float">
          <Package className="w-20 h-20 text-blue-600" />
        </figure>
        <figure className="absolute top-1/2 right-1/4 opacity-10 animate-float">
          <MapPin className="w-16 h-16 text-slate-500" />
        </figure>
      </aside>

      <main className="relative max-w-6xl mx-auto z-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <article className="space-y-8">

            <header className="space-y-4">
              <span className="inline-block mt-12 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Questions Fréquentes
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Vos questions sur le
                <span className="block bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent py-2">
                  déménagement
                </span>
              </h2>

              <p className="text-lg text-slate-600">
                Trouvez les réponses aux questions les plus courantes sur nos services de déménagement professionnels.
              </p>
            </header>

            {/* SEARCH */}
            <form role="search" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                aria-label="Rechercher une question"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              />
            </form>

            {/* FAQ LIST */}
            <section aria-label="Liste des questions fréquentes" className="space-y-4">
              {currentItems.map((item) => (
                <article key={item._id} className="group">
                  <button
                    aria-expanded={expandedId === item._id}
                    onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                    className="w-full flex justify-between p-5 bg-white rounded-xl border hover:border-blue-400"
                  >
                    <header className="text-left">
                      <h3 className="font-semibold text-slate-900">
                        {item.question}
                      </h3>
                      {expandedId === item._id && (
                        <p className="text-slate-600 text-sm mt-3">
                          {item.answer}
                        </p>
                      )}
                    </header>

                    <ChevronDown className={`w-5 h-5 ${expandedId === item._id ? 'rotate-180' : ''}`} />
                  </button>
                </article>
              ))}
            </section>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav aria-label="Pagination FAQ" className="flex flex-col sm:flex-row justify-between pt-6 border-t">
                <p>Page {currentPage} sur {totalPages}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
    ${currentPage === 1
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm'}
  `}
                  >
                    Précédent
                  </button>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                          ${currentPage === totalPages
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}
  `}
                  >
                    Suivant
                  </button>
                </div>
              </nav>
            )}
          </article>

          {/* RIGHT */}
          <aside className="relative lg:sticky lg:top-8">
            <figure className="relative aspect-square rounded-2xl overflow-hidden p-8 shadow-lg">

              <Image
                src={imagDem}
                alt="Service de déménagement professionnel avec équipe et camion"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-lg"
                priority
              />

              <figcaption className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/30 to-transparent">
                <section className="space-y-4">

                  <article className="flex gap-3 bg-white/95 p-4 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Service Rapide</p>
                      <p className="text-xs">Déménagement en 24-48h</p>
                    </div>
                  </article>

                  <article className="flex gap-3 bg-white/95 p-4 rounded-lg">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Équipe Professionnelle</p>
                      <p className="text-xs">Experts formés et assurés</p>
                    </div>
                  </article>

                </section>
              </figcaption>

            </figure>
          </aside>

        </section>
      </main>

      <style jsx>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s infinite; }
      `}</style>
    </section>
  )
}