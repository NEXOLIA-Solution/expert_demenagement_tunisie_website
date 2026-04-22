'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Phone,
  CheckCircle2,
  Home,
  Users,
  Clock,
  Zap,
  Shield,
  Award,
  ChevronDown,
  MapPin,
  Building2,
  Briefcase,
  User,
  ArrowRight,
  Loader2,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Package,
  Truck,
  Box,

  Sparkles,
  HeartHandshake,
  FileText,
  ClipboardCheck,
  BadgeCheck,
  GraduationCap,
  Wrench,
  Sofa,
  Shirt,
  Tv,
  Utensils,
  Paintbrush,
  Dumbbell,
  Laptop,
  Gem,
  BookOpen,
  Baby,
  Flower2,
  Smartphone,
  ShieldCheck,
  Handshake,
  TrendingUp,
  Timer,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { QuoteForm } from '../QuoteForm';

interface CompanyContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description?: string;
  website?: string;
  socials?: Array<{
    title: string;
    url: string;
    _id: string;
  }>;
  isAvailable24h?: boolean;
  logo?: string;
}

export function ResidentialServicePage() {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<CompanyContact | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [contactError, setContactError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    moveType: 'residential',
    adresseDepart: '',
    etagesDepart: '',
    ascenseurDepart: '',
    adresseArrivee: '',
    etagesArrivee: '',
    ascenseurArrivee: '',
    quoteDate: null as Date | null,
    moveStartDate: null as Date | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoadingContact(true);
         const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const response = await axios.get(`${baseUrl}/company/api`);
        if (response.data && response.data.length > 0) {
          setContactInfo(response.data[0]);
        } else {
          setContactError('Aucune information de contact trouvée');
        }
      } catch (err: any) {
        console.error('Erreur lors de la récupération des contacts:', err);
        setContactError('Impossible de charger les informations de contact');
      } finally {
        setLoadingContact(false);
      }
    };

    fetchContactInfo();
  }, []);

  const whatsappNumber = contactInfo?.phone?.replace('+', '') || '23267646';
  const emailAddress = contactInfo?.email || 'wahbisj@gmail.com';
  const companyName = contactInfo?.name || 'DéménagePro';
  const youtubeId = '_D0uOmC86Ek';

  const getSocialIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('facebook')) return Facebook;
    if (lowerTitle.includes('instagram')) return Instagram;
    if (lowerTitle.includes('youtube')) return Youtube;
    return Globe;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked ? 'oui' : 'non' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date || null }));
  };

  const handleWhatsApp = () => {
    const message = `Bonjour, je souhaite demander un devis pour un déménagement à domicile.

*Informations personnelles*
Nom complet: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.phone}

*Adresse de départ*
Adresse: ${formData.adresseDepart}
Étages: ${formData.etagesDepart || 'Non précisé'}
Ascenseur: ${formData.ascenseurDepart === 'oui' ? 'Oui' : 'Non'}

*Adresse d'arrivée*
Adresse: ${formData.adresseArrivee}
Étages: ${formData.etagesArrivee || 'Non précisé'}
Ascenseur: ${formData.ascenseurArrivee === 'oui' ? 'Oui' : 'Non'}

*Détails du déménagement*
Type: ${formData.moveType === 'residential' ? 'Résidentiel' : 'Commercial'}
Date du devis: ${formData.quoteDate ? formData.quoteDate.toLocaleDateString() : 'Non précisée'}
Date du déménagement: ${formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : 'Non précisée'}

*Message complémentaire*
${formData.message || 'Aucun message'}

Merci de me contacter rapidement.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Demande de devis - Déménagement à domicile - ${formData.firstName} ${formData.lastName}`;
    const body = `Bonjour,

Je souhaite demander un devis pour un déménagement à domicile.

**Informations personnelles**
- Nom complet: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Téléphone: ${formData.phone}

**Adresse de départ**
- Adresse: ${formData.adresseDepart}
- Étages: ${formData.etagesDepart || 'Non précisé'}
- Ascenseur: ${formData.ascenseurDepart === 'oui' ? 'Oui' : 'Non'}

**Adresse d'arrivée**
- Adresse: ${formData.adresseArrivee}
- Étages: ${formData.etagesArrivee || 'Non précisé'}
- Ascenseur: ${formData.ascenseurArrivee === 'oui' ? 'Oui' : 'Non'}

**Détails du déménagement**
- Type: ${formData.moveType === 'residential' ? 'Résidentiel' : 'Commercial'}
- Date du devis: ${formData.quoteDate ? formData.quoteDate.toLocaleDateString() : 'Non précisée'}
- Date du déménagement: ${formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : 'Non précisée'}

**Message complémentaire**
${formData.message || 'Aucun message'}

Merci de me contacter rapidement.

Cordialement,
${formData.firstName} ${formData.lastName}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Veuillez remplir tous les champs obligatoires.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        moveType: formData.moveType,
        pickupAddress: formData.adresseDepart,
        pickupFloors: formData.etagesDepart ? Number(formData.etagesDepart) : null,
        pickupElevator: formData.ascenseurDepart,
        deliveryAddress: formData.adresseArrivee,
        deliveryFloors: formData.etagesArrivee ? Number(formData.etagesArrivee) : null,
        deliveryElevator: formData.ascenseurArrivee,
        quoteDate: formData.quoteDate,
        moveStartDate: formData.moveStartDate,
        additionalInfo: formData.message,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/quote/api`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(true);
      setTimeout(() => {
        router.push("/merci");
      }, 2000);
    } catch (err: any) {
      console.error("Erreur détaillée :", err.response?.data);
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'envoi du devis.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Home, label: 'Déménagement complet' },
    { icon: Users, label: 'Équipe professionnelle' },
    { icon: Clock, label: 'Rapide et efficace' },
    { icon: Package, label: 'Emballage premium' },
    { icon: Shield, label: 'Assuré' },
    { icon: Award, label: 'Certifié' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <Head>
        <title>Déménagement à domicile professionnel | {companyName} Tunisie</title>
        <meta name="description" content="Service de déménagement professionnel en Tunisie : emballage soigné, transport sécurisé, équipe experte. Devis gratuit, matériel premium, assurance incluse." />
        <meta name="keywords" content="déménagement Tunisie, déménagement domicile, emballage professionnel, transport meubles, déménageurs Tunis" />
        <meta property="og:title" content="Déménagement à domicile - Service Premium en Tunisie" />
        <meta property="og:description" content="Confiez votre déménagement à des experts. Emballage soigné, transport sécurisé, équipe professionnelle." />
        <meta property="og:image" content="/images/og-demenagement.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary/80">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto bg-black/20 backdrop-blur-sm rounded-2xl p-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Déménagement <br />
              <span className="text-secondary drop-shadow-lg">À Domicile</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95"
            >
              Service professionnel, emballage soigné, transport sécurisé — Votre déménagement entre de bonnes mains
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group px-8 py-4 rounded-full font-bold text-lg shadow-2xl bg-white text-primary hover:bg-secondary hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <span>Demander un devis</span>
                <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={contactInfo?.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm transition"
              >
                Découvrir nos services
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Video Section */}
            <motion.div
              variants={itemVariants}
              className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-border bg-card"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/FWmZUg8InB0?si=AdFhHtCnJP5PGak3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </motion.div>

            {/* Quick Features */}
            <motion.div
              variants={itemVariants}
              className="mb-12 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Service Description */}
            <motion.div variants={itemVariants} className="space-y-8 text-foreground">
              {/* Introduction */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                  <HeartHandshake className="w-8 h-8" />
                  Votre Déménagement, Notre Expertise
                </h2>
                <p className="text-lg leading-relaxed opacity-90 mb-4">
                  Chez <strong>{companyName}</strong>, nous comprenons que déménager est bien plus qu'un simple transport de biens. 
                  C'est un moment important dans votre vie, chargé d'émotions et de souvenirs. C'est pourquoi nous mettons tout 
                  notre savoir-faire et notre expérience à votre service pour faire de cette transition une expérience sereine et réussie.
                </p>
                <p className="text-lg leading-relaxed opacity-90">
                  Forts de plusieurs années d'expérience dans le domaine du déménagement en Tunisie, nous avons développé 
                  une méthodologie unique qui allie efficacité, délicatesse et professionnalisme. Chaque déménagement est unique 
                  et mérite une attention particulière.
                </p>
              </div>

              {/* Emballage Professionnel */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  Emballage Professionnel : La Protection Maximale
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                      <Box className="w-5 h-5" />
                      Matériaux de Qualité Supérieure
                    </h3>
                    <p className="text-base leading-relaxed opacity-90 mb-3">
                      Nous utilisons uniquement des matériaux d'emballage professionnels pour garantir la sécurité de vos biens :
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { icon: Box, text: "Cartons double-canaux renforcés (plusieurs tailles)" },
                        { icon: Box, text: "Papier bulle à haute protection anti-choc" },
                        { icon: Box, text: "Film étirable pour meubles et électroménagers" },
                        { icon: Box, text: "Couvre-meubles en tissu rembourré" },
                        { icon: Box, text: "Angles de protection en mousse" },
                        { icon: Box, text: "Rubans adhésifs haute résistance" },
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <item.icon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm opacity-90">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                      <ClipboardCheck className="w-5 h-5" />
                      Techniques d'Emballage Spécifiques
                    </h3>
                    <p className="text-base leading-relaxed opacity-90">
                      Nos emballeurs professionnels maîtrisent les techniques adaptées à chaque type d'objet :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-secondary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Tv className="w-4 h-4" /> Appareils électroniques
                        </h4>
                        <p className="text-sm opacity-80">Emballage spécifique anti-ondes et anti-chocs, boîtiers d'origine conservés.</p>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Sofa className="w-4 h-4" /> Meubles
                        </h4>
                        <p className="text-sm opacity-80">Démontage soigné, protection des angles, filmage complet.</p>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Gem className="w-4 h-4" /> Objets fragiles
                        </h4>
                        <p className="text-sm opacity-80">Papier bulle double couche, cartons renforcés, marquage "FRAGILE".</p>
                      </div>
                      <div className="bg-secondary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shirt className="w-4 h-4" /> Vêtements
                        </h4>
                        <p className="text-sm opacity-80">Cartons penderie, housses de protection, pliage soigné.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Équipe Professionnelle */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                  <Users className="w-8 h-8" />
                  Notre Équipe : Des Experts à Votre Service
                </h2>
                
                <div className="space-y-6">
                  <p className="text-base leading-relaxed opacity-90">
                    La qualité de notre service repose avant tout sur la compétence et le professionnalisme de nos équipes. 
                    Chaque membre de notre personnel est rigoureusement sélectionné et formé pour répondre aux exigences 
                    les plus élevées du métier.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-secondary/10 p-5 rounded-xl">
                      <GraduationCap className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Formation Continue</h3>
                      <p className="text-sm opacity-80">
                        Notre équipe suit régulièrement des formations sur les techniques de manutention, 
                        l'emballage professionnel et la manipulation d'objets précieux.
                      </p>
                    </div>
                    <div className="bg-secondary/10 p-5 rounded-xl">
                      <BadgeCheck className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Certifiés et Assurés</h3>
                      <p className="text-sm opacity-80">
                        Tous nos déménageurs sont certifiés et notre entreprise est entièrement assurée 
                        pour couvrir vos biens pendant toute la durée du déménagement.
                      </p>
                    </div>
                    <div className="bg-secondary/10 p-5 rounded-xl">
                      <Handshake className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Disponibilité et Réactivité</h3>
                      <p className="text-sm opacity-80">
                        Notre équipe est disponible 7j/7 et intervient rapidement. Nous nous adaptons à 
                        vos contraintes horaires pour un service personnalisé.
                      </p>
                    </div>
                    <div className="bg-secondary/10 p-5 rounded-xl">
                      <HeartHandshake className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Service Personnalisé</h3>
                      <p className="text-sm opacity-80">
                        Un chargé de clientèle vous accompagne personnellement tout au long de votre 
                        déménagement, du premier contact jusqu'à l'installation finale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Types de Biens Déménagés */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                  <Truck className="w-8 h-8" />
                  Nous Déménageons Tous Vos Biens
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Sofa, label: "Meubles", desc: "Canapés, lits, armoires, tables" },
                    { icon: Tv, label: "Électroménager", desc: "Réfrigérateurs, lave-linge, TV" },
                    { icon: Gem, label: "Objets précieux", desc: "Antiquités, œuvres d'art, bijoux" },
                    { icon: Laptop, label: "Équipements", desc: "Ordinateurs, bureaux, imprimantes" },
                    { icon: Utensils, label: "Cuisine", desc: "Vaisselle, verrerie, ustensiles" },
                    { icon: Shirt, label: "Vêtements", desc: "Garde-robes, accessoires" },
                    { icon: BookOpen, label: "Documents", desc: "Archives, livres, papiers importants" },
                    { icon: Baby, label: "Équipement bébé", desc: "Berceaux, poussettes, jouets" },
                    { icon: Flower2, label: "Plantes", desc: "Végétaux, jardinières" },
                    { icon: Dumbbell, label: "Équipement sportif", desc: "Vélos, appareils de sport" },
                    { icon: Paintbrush, label: "Décoration", desc: "Tableaux, miroirs, luminaires" },
                    { icon: Smartphone, label: "Petit matériel", desc: "Objets personnels divers" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-secondary/5 p-3 rounded-lg text-center hover:bg-secondary/10 transition">
                      <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs font-semibold">{item.label}</p>
                      <p className="text-xs opacity-70 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processus de Déménagement */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                  <ClipboardCheck className="w-8 h-8" />
                  Notre Processus en 5 Étapes
                </h2>
                
                <div className="space-y-6">
                  {[
                    { num: 1, title: "Consultation et Devis Gratuit", icon: FileText, desc: "Nous évaluons vos besoins, la quantité de biens à déménager et vous proposons un devis transparent et sans engagement." },
                    { num: 2, title: "Préparation et Emballage", icon: Package, desc: "Notre équipe procède à l'emballage professionnel de tous vos biens avec du matériel de qualité supérieure." },
                    { num: 3, title: "Chargement et Transport", icon: Truck, desc: "Chargement soigné dans nos camions équipés, transport sécurisé vers votre nouveau domicile." },
                    { num: 4, title: "Déchargement et Installation", icon: Home, desc: "Déchargement méthodique, installation de vos meubles et objets à l'endroit souhaité." },
                    { num: 5, title: "Service Après-Déménagement", icon: HeartHandshake, desc: "Vérification de votre satisfaction, récupération des matériaux d'emballage si souhaité." },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 p-4 bg-secondary/5 rounded-xl">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                        {step.num}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <step.icon className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-sm opacity-80">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avantages Exclusifs */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-3xl font-bold mb-6 text-primary text-center">
                  Pourquoi Nous Choisir ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Assurance Complète</h3>
                    <p className="text-sm opacity-80">Vos biens sont entièrement assurés pendant tout le déménagement</p>
                  </div>
                  <div className="text-center">
                    <Timer className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Respect des Délais</h3>
                    <p className="text-sm opacity-80">Nous garantissons le respect des horaires convenus</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Devis Transparent</h3>
                    <p className="text-sm opacity-80">Prix clairs, sans surprise, sans frais cachés</p>
                  </div>
                  <div className="text-center">
                    <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Satisfaction Garantie</h3>
                    <p className="text-sm opacity-80">Service client réactif et suivi personnalisé</p>
                  </div>
                  <div className="text-center">
                    <Package className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Matériel Premium</h3>
                    <p className="text-sm opacity-80">Cartons renforcés, papier bulle, protections spéciales</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Équipe Expérimentée</h3>
                    <p className="text-sm opacity-80">Professionnels formés et passionnés</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
            id="contact"
          >
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-8 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6 text-primary">Demander un devis</h3>

              {loadingContact && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Chargement...</span>
                </div>
              )}

              {contactError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{contactError}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Votre demande a été envoyée avec succès ! Redirection...
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <QuoteForm/>

              {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prénom *</label>
                    <Input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom *</label>
                    <Input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Téléphone *</label>
                  <Input type="tel" name="phone" placeholder="+216 XX XXX XXX" value={formData.phone} onChange={handleInputChange} required />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Type de déménagement *</label>
                  <Select value={formData.moveType} onValueChange={(value) => handleSelectChange("moveType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Résidentiel</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Adresse de départ
                  </h4>
                  <div className="space-y-3">
                    <Input name="adresseDepart" placeholder="Adresse complète" value={formData.adresseDepart} onChange={handleInputChange} />
                    <div className="flex gap-2">
                      <Input type="number" name="etagesDepart" placeholder="Étages" value={formData.etagesDepart} onChange={handleInputChange} className="w-2/3" min="0" />
                      <Select value={formData.ascenseurDepart} onValueChange={(value) => handleSelectChange("ascenseurDepart", value)}>
                        <SelectTrigger className="w-1/3"><SelectValue placeholder="Ascenseur ?" /></SelectTrigger>
                        <SelectContent><SelectItem value="oui">Oui</SelectItem><SelectItem value="non">Non</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Adresse d'arrivée
                  </h4>
                  <div className="space-y-3">
                    <Input name="adresseArrivee" placeholder="Adresse complète" value={formData.adresseArrivee} onChange={handleInputChange} />
                    <div className="flex gap-2">
                      <Input type="number" name="etagesArrivee" placeholder="Étages" value={formData.etagesArrivee} onChange={handleInputChange} className="w-2/3" min="0" />
                      <Select value={formData.ascenseurArrivee} onValueChange={(value) => handleSelectChange("ascenseurArrivee", value)}>
                        <SelectTrigger className="w-1/3"><SelectValue placeholder="Ascenseur ?" /></SelectTrigger>
                        <SelectContent><SelectItem value="oui">Oui</SelectItem><SelectItem value="non">Non</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t pt-4">
                  <div>
                    <label className="text-sm mb-1 block">Date du devis</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.quoteDate ? formData.quoteDate.toLocaleDateString() : "Choisir"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={formData.quoteDate || undefined} onSelect={(date) => handleDateChange("quoteDate", date)} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Date déménagement</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : "Choisir"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={formData.moveStartDate || undefined} onSelect={(date) => handleDateChange("moveStartDate", date)} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Détails complémentaires</label>
                  <Textarea name="message" placeholder="Informations supplémentaires..." value={formData.message} onChange={handleInputChange} rows={3} />
                </div>

                <div className="space-y-3 pt-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi...</> : "Envoyer ma demande"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Ou contactez-nous</span></div>
                  </div>

                  <Button type="button" onClick={handleWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" /> Devis par WhatsApp
                  </Button>

                  <Button type="button" onClick={handleEmail} className="w-full bg-secondary hover:bg-secondary/90">
                    <Mail className="w-4 h-4 mr-2" /> Devis par Email
                  </Button>
                </div>

                {!loadingContact && contactInfo && (
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-4 h-4 text-primary" />
                      <div><p className="font-semibold">Téléphone</p><p className="opacity-75">{contactInfo.phone}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="w-4 h-4 text-primary" />
                      <div><p className="font-semibold">Email</p><p className="opacity-75">{contactInfo.email}</p></div>
                    </div>
                    {contactInfo.socials && contactInfo.socials.length > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="flex-1"><p className="font-semibold mb-2">Réseaux sociaux</p>
                          <div className="flex gap-3">
                            {contactInfo.socials.map((social, idx) => {
                              const Icon = getSocialIcon(social.title);
                              return <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer"><Icon className="w-5 h-5 text-primary" /></a>;
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 p-4 bg-secondary/10 border border-secondary rounded-lg">
                  <p className="text-xs opacity-75">
                    ✓ Réponse rapide garantie<br />
                    ✓ Devis sans engagement<br />
                    {contactInfo?.isAvailable24h && "✓ Disponible 24h/24, 7j/7"}
                  </p>
                </div>
              </form> */}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}