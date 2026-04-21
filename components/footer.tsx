import Link from "next/link"
import { Truck, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import logoAla from "@/public/logoAla.png"


export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Logo */}

              <div className="bg-white" style={{borderRadius: "50%"}}>
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src={logoAla}
                    alt="Logo DéménagePro"
                    width={100}
                    height={40}
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>




            </div>
            <p className="text-sm text-background/80 mb-4">
              Votre partenaire de confiance pour tous vos déménagements résidentiels et commerciaux.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="hover:text-primary transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/temoignages" className="hover:text-primary transition-colors">
                  Témoignages
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Déménagement résidentiel</li>
              <li>Déménagement commercial</li>
              <li>Emballage professionnel</li>
              <li>Entreposage sécurisé</li>
              <li>Transport de piano</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>contact@demenagepro.fr</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Rue du Commerce, 75001 Paris</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} EXPERTDEM-tn. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
