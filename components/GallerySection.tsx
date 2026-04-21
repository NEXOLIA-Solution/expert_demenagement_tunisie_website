"use client"

import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { MapPin, Calendar, X, Loader2 } from "lucide-react"

// Types correspondant au modèle backend
interface GalleryImage {
  _id: string
  src: string
  alt: string
  category: string
  location: string
  date: string
  createdAt?: string
  updatedAt?: string
}

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Récupération des images depuis le backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const res = await fetch(`${baseUrl}/gallery/api`)

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des images")
        }

        const data = await res.json()
        setImages(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Fermeture avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (loading) {
    return (
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 text-lg">Impossible de charger la galerie : {error}</p>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return (
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-lg">Aucune image disponible pour le moment.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-muted-foreground text-sm uppercase tracking-widest">
              Nos réalisations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Projets réalisés avec professionnalisme
            </h2>
            <p className="text-muted-foreground text-lg">
              Chaque intervention est documentée avec précision,
              transparence et exigence de qualité.
            </p>
          </div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {images.map((image, index) => {
              const randomDelay = index * 0.2 + Math.random() * 0.5
              const randomDuration = 3 + Math.random() * 2

              // ✅ Utilisation directe de l'URL (qui est une Data URL en base64)
              const imageUrl = image.src

              return (
                <motion.div
                  key={image._id}
                  variants={itemVariants}
                  whileInView={{
                    y: [0, -8, 0],
                    transition: {
                      duration: randomDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: randomDelay,
                    },
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -12,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative rounded-3xl overflow-hidden bg-muted shadow-lg hover:shadow-2xl cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Top Info Bar */}
                  <div className="absolute top-0 left-0 right-0 z-10 bg-black/55 backdrop-blur-sm px-5 py-3 flex items-center justify-between text-white text-xs tracking-wide">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 opacity-80" />
                      <span>{image.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 opacity-80" />
                      <span>{image.date}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <img
                    src={imageUrl}
                    alt={image.alt}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // En cas d'échec (peu probable avec Data URL), on met un placeholder
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />

                  {/* Bottom Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-lg font-semibold">
                        {image.alt}
                      </p>
                      <p className="text-white/80 text-sm mt-1">
                        {image.category}
                      </p>
                    </div>
                  </div>

                  {/* Soft border */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src} // ✅ Utilisation directe
              alt={selectedImage.alt}
              className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 backdrop-blur-sm py-2 px-4 rounded-lg">
              <p className="text-lg font-semibold">{selectedImage.alt}</p>
              <p className="text-sm opacity-80">
                {selectedImage.category} — {selectedImage.location} ({selectedImage.date})
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}