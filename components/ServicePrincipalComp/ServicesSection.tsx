"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Truck,
  Package,
  Home,
  Clock,
  Shield,
  Wrench,
  ChevronRight,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// ---------- Types ----------
// Type correspondant à la réponse de l'API
interface ServiceAPI {
  _id: string;
  title: string;
  description: string;
  images: string[];
  keywords: string[];
}

// Type attendu par le composant
interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ElementType;
  images: string[];           // ← modifié : tableau d'images
  details: string[];
  highlight: string;
  benefits?: string[];
}

// Mapping des noms d'icônes (à adapter selon vos données ou ajouter un champ iconName dans le backend)
const iconMap: { [key: string]: React.ElementType } = {
  Wrench,
  Package,
  Truck,
  Home,
  Clock,
  Shield,
  // Ajoutez d'autres mappings si nécessaire
};

// Fonction pour transformer une donnée API en Service
const transformService = (apiService: ServiceAPI): Service => {
  // Déterminer une icône par défaut basée sur le titre ou utiliser une icône générique
  let IconComponent = Package; // icône par défaut
  if (apiService.title.toLowerCase().includes("démontage")) IconComponent = Wrench;
  else if (apiService.title.toLowerCase().includes("emballage")) IconComponent = Package;
  else if (apiService.title.toLowerCase().includes("transport")) IconComponent = Truck;
  else if (apiService.title.toLowerCase().includes("stockage") || apiService.title.toLowerCase().includes("garde")) IconComponent = Home;
  else if (apiService.title.toLowerCase().includes("express")) IconComponent = Clock;
  else if (apiService.title.toLowerCase().includes("garantie") || apiService.title.toLowerCase().includes("assurance")) IconComponent = Shield;

  // Générer un highlight basé sur les mots-clés ou utiliser une valeur par défaut
  const highlight = apiService.keywords && apiService.keywords.length > 0 
    ? apiService.keywords[0] 
    : "Service";

  // Utiliser la description comme longDesc, et générer une shortDesc (première phrase ou extrait)
  const shortDesc = apiService.description.length > 50 
    ? apiService.description.substring(0, 50) + "..." 
    : apiService.description;

  // Utiliser les mots-clés comme détails (ou générer des détails par défaut)
  const details = apiService.keywords && apiService.keywords.length > 0 
    ? apiService.keywords 
    : ["Service professionnel", "Équipe qualifiée", "Matériel adapté"];

  // Conserver toutes les images (ou une image par défaut si vide)
  const images = apiService.images && apiService.images.length > 0 
    ? apiService.images 
    : ["/services/default.jpg"];

  return {
    id: apiService._id,
    title: apiService.title,
    shortDesc: shortDesc,
    longDesc: apiService.description,
    icon: IconComponent,
    images: images,            // ← modifié
    details: details,
    highlight: highlight,
    benefits: [], // Pas de bénéfices dans l'API pour l'instant
  };
};

// ---------- Composant Modale de détail (identique) ----------
const ServiceDetailModal = ({ service }: { service: Service }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full mt-4 group flex items-center justify-between text-primary hover:text-primary/80"
        >
          <span>Découvrir l’offre complète</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="bg-primary/10 p-3 rounded-xl">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {service.longDesc}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {service.benefits && service.benefits.length > 0 && (
            <div className="bg-primary/5 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">Avantages exclusifs</h4>
              <ul className="grid grid-cols-2 gap-2">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h4 className="font-semibold mb-2">Détails du service</h4>
            <ul className="space-y-2">
              {service.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Composant Carte (avec carrousel d'images) ----------
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {/* Carrousel des images */}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
          >
            {service.images.map((imgSrc, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={imgSrc}
                  alt={`${service.title} - image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Éléments superposés (gradient, badge, icône) */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
            style={{ zIndex: 1 }}
          />
          <div
            className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
            style={{ zIndex: 2 }}
          >
            {service.highlight}
          </div>
          <div
            className="absolute bottom-4 left-4 flex items-center gap-2"
            style={{ zIndex: 2 }}
          >
            <div className="bg-white/90 p-2 rounded-xl shadow-lg">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="text-base">
            {service.shortDesc}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {service.details.slice(0, 3).map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <ServiceDetailModal service={service} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ---------- Section principale ----------
export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
         const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const { data } = await axios.get(`${baseUrl}/service/api/all`);
        // Transformer les données API en format attendu
        const transformed = data.map(transformService);
        setServices(transformed);
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err);
        setError('Impossible de charger les services. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-10 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Chargement des services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-10 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Aucun service disponible pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        {/* En-tête de section animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Des services pensés pour votre sérénité
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez notre gamme complète de prestations, de l'emballage à l'installation,
            avec une qualité certifiée et des équipes passionnées.
          </p>
        </motion.div>

        {/* Version desktop : grille */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Version mobile : carrousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-12"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <ServiceCard service={service} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}