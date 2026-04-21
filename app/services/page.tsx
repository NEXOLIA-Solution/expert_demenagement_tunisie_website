import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  Building2,
  Package,
  Warehouse,
  Piano,
  TruckIcon,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react"
import Link from "next/link"
import ProcessSection from "@/components/ProcessSection"
import ImageCarousel from "@/components/ImageCarousel"
// import { ServicesSection } from "@/components/Services/ServicesSection"
import { ServiceAreas } from "@/components/ServiceAreas/service-areas"
import { TipsSection } from "@/components/tips-section"
import ServicesSection from "../../components/ServicePrincipalComp/ServicesSection"
import { motion } from "framer-motion";
import HeroSection from "@/components/Services/HeroSection"
import { PremiumFooter } from "@/components/premium-footer"

export default function ServicesPage() {


  return (
    <>
      <Navigation />
      <main>
    
        <HeroSection/>

        <ServiceAreas/>



       <ServicesSection/>









          

  
        <ProcessSection />







<TipsSection/>










        {/* Carocel Image demenagement */}
        <ImageCarousel />
        {/* Guarantees Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">

            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wide bg-primary/10 px-4 py-1 rounded-full">
                Nos garanties
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-4">
                Votre tranquillité d'esprit
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Nous nous engageons à vous offrir un service fiable, sécurisé et sans stress,
                du début à la fin de votre déménagement.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Assurance tous risques",
                  description:
                    "Protection complète de vos biens pendant tout le processus de déménagement.",
                },
                {
                  icon: Clock,
                  title: "Ponctualité garantie",
                  description:
                    "Respect strict des horaires convenus, avec engagement de remboursement.",
                },
                {
                  icon: CheckCircle,
                  title: "Satisfaction 100%",
                  description:
                    "Si vous n'êtes pas satisfait, nous intervenons gratuitement.",
                },
              ].map((guarantee, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-border/50 bg-background/80 backdrop-blur-sm
                     hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Hover accent */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                  <CardContent className="pt-12 pb-10 text-center">
                    <div className="relative mb-6">
                      <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto
                              group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <guarantee.icon className="h-10 w-10 text-primary group-hover:text-white" />
                      </div>
                    </div>

                    <h3 className="font-bold text-xl mb-4">
                      {guarantee.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {guarantee.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


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
