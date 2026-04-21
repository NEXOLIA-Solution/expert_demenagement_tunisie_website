import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ServiceSection2 from "../components/ServiceSection2/Services"
import {
  CheckCircle,
  Truck,
  Package,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Star,
  Quote,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import { FeaturesSection } from "@/components/FeaturesSection"
import { ServicesSection } from "@/components/Services/ServicesSection"
import { PartnersSection } from "@/components/partners/PartnersSection"
import { CTASection } from "@/components/CTASection"
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs"
import VisitorDashboardWithCharts from "@/components/VisitorDashboardWithCharts"
import Testimonials from "@/components/component_5/Testimonials"
import FAQSection from "@/components/FAQ/faq-section"
import ServicesGrid from "@/components/ServicesGrid"
import ProcessSection from "@/components/ProcessSection"
import VideoShowcase from "@/components/videoShowcases/video-showcase"
import { PremiumFooter } from "../components/premium-footer"
import { PromoSection } from "@/components/PromoSection"
import StatsSection from "@/components/StatsSection"



export default function HomePage() {
  

  const services = [
    "Déménagement résidentiel",
    "Déménagement commercial",
    "Transport de piano et objets lourds",
    "Service d'emballage",
    "Entreposage sécurisé",
    "Déménagement longue distance",
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary via-background to-muted overflow-hidden py-24 md:py-36">
          <div className="absolute inset-0 bg-[url('/abstract-moving-boxes-pattern.jpg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-semibold text-sm">✓ Plus de 15 ans d'expérience</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
                Votre déménagement en toute <span className="text-primary">sérénité</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
                Service de déménagement professionnel, fiable et abordable. Nous prenons soin de vos biens comme si
                c'étaient les nôtres. Une équipe d'experts à votre service pour un déménagement sans stress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/devis">
                    Demander un devis gratuit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                  <Link href="/services">Découvrir nos services</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Devis gratuit en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Assurance tous risques</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </section>




        <ProcessSection />

        


 


          


      

        <ServiceSection2/>




        <Testimonials/>
        <FeaturesSection />

       
        <StatsSection/>


        <CTASection />






       






        <FAQSection/>
        <VideoShowcase/>

          <PartnersSection />


          <PromoSection/>
      </main>




      <PremiumFooter/>
    </>
  )
}
