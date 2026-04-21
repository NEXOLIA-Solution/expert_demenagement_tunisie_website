import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import GallerySection from "@/components/GallerySection"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PremiumFooter } from "@/components/premium-footer"
import VideoShowcase from "@/components/videoShowcases/video-showcase"



export default function GalleryPage() {
  const images = [
    {
      src: "/moving-truck-loaded-with-boxes.jpg",
      alt: "Camion de déménagement chargé",
      category: "Transport",
    },
    {
      src: "/professional-movers-carrying-furniture.jpg",
      alt: "Déménageurs professionnels",
      category: "Équipe",
    },
    {
      src: "/carefully-packed-boxes-and-furniture.jpg",
      alt: "Emballage soigné",
      category: "Emballage",
    },
    {
      src: "/secure-storage-warehouse-interior.jpg",
      alt: "Entrepôt sécurisé",
      category: "Entreposage",
    },
    {
      src: "/piano-being-carefully-moved.jpg",
      alt: "Transport de piano",
      category: "Spécialisé",
    },
    {
      src: "/happy-family-in-new-home-with-movers.jpg",
      alt: "Famille satisfaite",
      category: "Résidentiel",
    },
    {
      src: "/office-furniture-being-moved.jpg",
      alt: "Déménagement de bureau",
      category: "Commercial",
    },
    {
      src: "/protective-packaging-materials.jpg",
      alt: "Matériel d'emballage",
      category: "Équipement",
    },
    {
      src: "/moving-team-with-van.jpg",
      alt: "Équipe de déménagement",
      category: "Équipe",
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary via-background to-muted overflow-hidden py-24 md:py-36">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('/abstract-moving-boxes-pattern.jpg')] opacity-5" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-semibold text-sm">
                  ✓ Réalisations réelles & équipes en action
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
                Notre <span className="text-primary">galerie</span> en images
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
                Découvrez à travers nos photos la qualité de notre travail, le professionnalisme de nos équipes
                et le soin apporté à chaque déménagement. Chaque image reflète notre engagement et notre savoir-faire.
              </p>



              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Photos réelles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Équipe certifiée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Clients satisfaits</span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Gallery Section */}

        <GallerySection />



<VideoShowcase/>

{/* CTA Section */}
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
    <PremiumFooter/>
    </>
  )
}
