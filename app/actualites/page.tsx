"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ChevronDown, Download, Eye, FileText, HelpCircle, Tag, Clock, AlertCircle, Loader2, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import FAQDocuments from "@/components/FAQDocuments"
import { OffersSection } from "@/components/OffersSection"
import { PremiumFooter } from "@/components/premium-footer"
import { useEffect, useState } from "react"

// Interface pour les actualités
interface NewsItem {
  _id?: string
  id?: string
  title: string
  category: "Offre" | "Actualité" | "Conseils"
  date: string
  endDateOfOffre?: string | null
  excerpt: string
  content?: string
  image: string
  isFeatured: boolean
  createdAt?: string
  updatedAt?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Récupérer les actualités depuis l'API
  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/news/api`)
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des actualités")
      }
      const data = await response.json()
      setNews(data)
    } catch (error) {
      console.error("Erreur:", error)
      setError("Impossible de charger les actualités. Veuillez réessayer plus tard.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour ouvrir la popup
  const openPopup = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    setIsPopupOpen(true)
    // Empêcher le défilement du body quand la popup est ouverte
    document.body.style.overflow = "hidden"
  }

  // Fonction pour fermer la popup
  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedNews(null)
    // Réactiver le défilement du body
    document.body.style.overflow = "auto"
  }

  // Fermer la popup avec la touche Echap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPopupOpen) {
        closePopup()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isPopupOpen])

  // Séparer les actualités en vedette et les autres
  const featuredNews = news.filter(item => item.isFeatured)
  const regularNews = news.filter(item => !item.isFeatured)

  // Prendre la première actualité en vedette pour la section "À la une"
  const topFeatured = featuredNews[0] || null
  const otherNews = topFeatured ? [...featuredNews.slice(1), ...regularNews] : [...regularNews]

  // Fonction pour obtenir la couleur de la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Offre":
        return "bg-green-500 text-white"
      case "Actualité":
        return "bg-blue-500 text-white"
      case "Conseils":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Fonction pour obtenir l'icône de la catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Offre":
        return <Tag className="h-3 w-3" />
      case "Actualité":
        return <FileText className="h-3 w-3" />
      case "Conseils":
        return <HelpCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  // Vérifier si une offre est toujours valide
  const isOfferValid = (endDate: string | null | undefined) => {
    if (!endDate) return true
    const today = new Date()
    const endDateObj = new Date(endDate)
    return endDateObj >= today
  }

  // Afficher le chargement
  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Chargement des actualités...</p>
          </div>
        </main>
        <PremiumFooter />
      </>
    )
  }

  // Afficher une erreur
  if (error) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="p-4 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchNews} variant="outline">
              Réessayer
            </Button>
          </div>
        </main>
        <PremiumFooter />
      </>
    )
  }

  // Afficher un message si aucune actualité
  if (news.length === 0) {
    return (
      <>
        <Navigation />
        <main>
          {/* Hero Section */}
          <section
            className="relative overflow-hidden py-20 md:py-28 bg-cover bg-center"
            style={{ backgroundImage: "url('/moving-news-background.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-background/85 to-muted/90" />
            <div className="absolute inset-0 bg-[url('/abstract-lines.svg')] opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                  <span className="text-primary font-semibold text-sm">📰 Infos • Promotions • Conseils</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight text-balance">
                  Actualités & <span className="text-primary">Offres</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Suivez nos dernières actualités, découvrez nos offres spéciales et profitez
                  de conseils pratiques pour un déménagement organisé, sécurisé et sans stress.
                </p>
              </div>
            </div>
          </section>

          {/* Message aucun contenu */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-lg mx-auto">
                <div className="p-4 bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Aucune actualité pour le moment</h2>
                <p className="text-muted-foreground mb-6">
                  Revenez bientôt pour découvrir nos dernières actualités, offres spéciales et conseils.
                </p>
                <Button asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <PremiumFooter />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section – Actualités & Offres */}
        <section
          className="relative overflow-hidden py-20 md:py-28 bg-cover bg-center"
          style={{ backgroundImage: "url('/moving-news-background.jpg')" }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-background/85 to-muted/90" />

          {/* Subtle pattern */}
          <div className="absolute inset-0 bg-[url('/abstract-lines.svg')] opacity-10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge avec compteur d'actualités */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <span className="text-primary font-semibold text-sm">
                  📰 {news.length} article{news.length > 1 ? 's' : ''} • Infos • Promotions • Conseils
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight text-balance">
                Actualités & <span className="text-primary">Offres</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Suivez nos dernières actualités, découvrez nos offres spéciales et profitez
                de conseils pratiques pour un déménagement organisé, sécurisé et sans stress.
              </p>
            </div>
          </div>
        </section>

        {/* Section Offres */}
        <OffersSection />

        {/* Featured News - Article à la une */}
        {topFeatured && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">À la une</h2>
                  <Card className="overflow-hidden border-2 border-primary">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="aspect-[16/9] md:aspect-auto bg-muted">
                        <img
                          src={topFeatured.image || "/placeholder.svg"}
                          alt={topFeatured.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                          <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${getCategoryColor(topFeatured.category)}`}>
                            {getCategoryIcon(topFeatured.category)}
                            <span>{topFeatured.category}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {topFeatured.date}
                          </span>
                          {topFeatured.category === "Offre" && topFeatured.endDateOfOffre && (
                            <span className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full ${isOfferValid(topFeatured.endDateOfOffre) 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"}`}>
                              <Clock className="h-3 w-3" />
                              {isOfferValid(topFeatured.endDateOfOffre) ? "Valide jusqu'au" : "Expirée le"} : {topFeatured.endDateOfOffre}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{topFeatured.title}</h3>
                        <p className="text-muted-foreground mb-6 line-clamp-3">{topFeatured.excerpt}</p>
                        <Button className="w-fit" onClick={() => openPopup(topFeatured)}>
                          En savoir plus
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* News Grid - Toutes les actualités */}
                {otherNews.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Toutes les actualités</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherNews.map((item) => (
                        <Card key={item._id || item.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                          <div className="aspect-[16/9] bg-muted relative">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            {item.category === "Offre" && item.endDateOfOffre && (
                              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${isOfferValid(item.endDateOfOffre) 
                                ? "bg-green-500 text-white" 
                                : "bg-red-500 text-white"}`}>
                                {isOfferValid(item.endDateOfOffre) ? "Offre valide" : "Offre expirée"}
                              </div>
                            )}
                          </div>
                          <CardHeader>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                                {getCategoryIcon(item.category)}
                                <span>{item.category}</span>
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {item.date}
                              </span>
                            </div>
                            <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
                          </CardHeader>
                          <CardContent className="mt-auto">
                            <Button variant="outline" size="sm" onClick={() => openPopup(item)}>
                              Lire la suite
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Si pas d'article à la une, afficher tous les articles normalement */}
        {!topFeatured && otherNews.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Toutes les actualités</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherNews.map((item) => (
                    <Card key={item._id || item.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                      <div className="aspect-[16/9] bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <Button variant="outline" size="sm" onClick={() => openPopup(item)}>
                          Lire la suite
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section
          className="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat bg-fixed text-primary-foreground overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Overlay sombre pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/90"></div>

          {/* Fondu blanc en bas */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"></div>

          <div className="relative container mx-auto px-4 text-center">
            <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wide bg-white/10 px-4 py-1 rounded-full">
              Devis gratuit & rapide
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Besoin d'un devis personnalisé ?
            </h2>

            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
              Contactez-nous dès aujourd'hui pour obtenir une estimation gratuite et sans engagement,
              parfaitement adaptée à vos besoins spécifiques.
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-12 py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <Link href="/devis">
                Demander un devis gratuit
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <PremiumFooter />

      {/* Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton de fermeture */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Contenu de la popup */}
              <div className="overflow-y-auto max-h-[85vh]">
                {/* Image d'en-tête */}
                <div className="relative aspect-[16/9] bg-muted">
                  <img
                    src={selectedNews.image || "/placeholder.svg"}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${getCategoryColor(selectedNews.category)}`}>
                      {getCategoryIcon(selectedNews.category)}
                      <span>{selectedNews.category}</span>
                    </span>
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {selectedNews.date}
                    </span>
                    {selectedNews.category === "Offre" && selectedNews.endDateOfOffre && (
                      <span className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full ${isOfferValid(selectedNews.endDateOfOffre) 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"}`}>
                        <Clock className="h-3 w-3" />
                        {isOfferValid(selectedNews.endDateOfOffre) ? "Valide jusqu'au" : "Expirée le"} : {selectedNews.endDateOfOffre}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedNews.title}</h2>
                  
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {selectedNews.content || selectedNews.excerpt}
                    </p>
                  </div>

                  {/* Boutons d'action */}
                  <div className="mt-8 pt-6 border-t flex flex-wrap gap-4">
                    <Button asChild variant="default">
                      <Link href="/devis">
                        Demander un devis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={closePopup}>
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}