"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Mail, MessageCircle, FileText } from "lucide-react"
import Link from "next/link"
import axios from "axios"

const slides = [
  {
    image: "/images/move1.jpg",
    title: "Déménagement résidentiel",
    description: "Un service fiable et sécurisé pour votre déménagement en toute tranquillité.",
  },
  {
    image: "/images/move4.jpg",
    title: "Déménagement professionnel",
    description: "Solutions adaptées aux entreprises avec une organisation sur mesure.",
  },
  {
    image: "/images/move6.jpg",
    title: "Emballage & protection",
    description: "Vos biens sont emballés avec soin par nos experts qualifiés.",
  },
  {
    image: "/images/move5.jpg",
    title: "Transport sécurisé",
    description: "Une flotte moderne pour garantir un transport sans risque.",
  },
]

export default function HeroImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [company, setCompany] = useState<any>(null)

  // récupération API
  useEffect(() => {
     const baseUrl = process.env.NEXT_PUBLIC_API_BASE
    axios.get(`${baseUrl}/company/api`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setCompany(res.data[0])
        }
      })
      .catch(err => console.log(err))
  }, [])

  const phone = company?.phone || "+21697524666"
  const email = company?.email || "contact@entreprise.com"
  const whatsappNumber = phone.replace("+", "")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative w-screen h-[55vh] md:h-[60vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className={`object-cover transition-transform duration-[7000ms] ease-out ${
              current === index ? "scale-110" : "scale-100"
            }`}
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl text-white">

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>

                <p className="text-base md:text-lg text-white/90 mb-8">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">

                  {/* Devis */}
                  <Link
                    href="/devis"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    <FileText className="h-5 w-5" />
                    Demander un devis
                  </Link>

                  {/* WhatsApp dynamique */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Bonjour%20je%20souhaite%20avoir%20un%20devis`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>

                  {/* Email dynamique */}
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </a>

                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-background/70 hover:bg-background text-primary p-3 rounded-full shadow-lg"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-background/70 hover:bg-background text-primary p-3 rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              current === index ? "w-8 bg-primary" : "w-2 bg-primary/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}