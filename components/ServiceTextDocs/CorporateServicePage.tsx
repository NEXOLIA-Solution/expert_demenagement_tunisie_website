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
  Receipt,
  Calculator,
  FileSignature,
  Building,
  HardDrive,
  Server,
  Printer,
  Archive,
  FolderKanban,
  ClipboardList,
  Calendar,
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
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

export function CorporateServicePage() {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<CompanyContact | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [contactError, setContactError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    position: '',
    email: '',
    phone: '',
    message: '',
    moveType: 'corporate',
    adresseDepart: '',
    etagesDepart: '',
    ascenseurDepart: '',
    adresseArrivee: '',
    etagesArrivee: '',
    ascenseurArrivee: '',
    quoteDate: null as Date | null,
    moveStartDate: null as Date | null,
    employeeCount: '',
    equipmentType: [] as string[],
    needsStorage: '',
    needsRecycling: '',
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

  const handleEquipmentToggle = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentType: prev.equipmentType.includes(equipment)
        ? prev.equipmentType.filter(e => e !== equipment)
        : [...prev.equipmentType, equipment]
    }));
  };

  const handleWhatsApp = () => {
    const message = `Bonjour, je souhaite demander un devis pour un déménagement d'entreprise.

*Informations de l'entreprise*
Société: ${formData.companyName || formData.firstName + ' ' + formData.lastName}
Nom du contact: ${formData.firstName} ${formData.lastName}
Poste: ${formData.position || 'Non précisé'}
Email: ${formData.email}
Téléphone: ${formData.phone}
Nombre d'employés: ${formData.employeeCount || 'Non précisé'}

*Adresse de départ*
Adresse: ${formData.adresseDepart}
Étages: ${formData.etagesDepart || 'Non précisé'}
Ascenseur: ${formData.ascenseurDepart === 'oui' ? 'Oui' : 'Non'}

*Adresse d'arrivée*
Adresse: ${formData.adresseArrivee}
Étages: ${formData.etagesArrivee || 'Non précisé'}
Ascenseur: ${formData.ascenseurArrivee === 'oui' ? 'Oui' : 'Non'}

*Équipements à déménager*
${formData.equipmentType.length > 0 ? formData.equipmentType.join(', ') : 'Non spécifié'}

*Services supplémentaires*
Stockage temporaire: ${formData.needsStorage === 'oui' ? 'Oui' : 'Non'}
Recyclage mobilier: ${formData.needsRecycling === 'oui' ? 'Oui' : 'Non'}

*Détails du déménagement*
Type: Entreprise / Bureau
Date du devis: ${formData.quoteDate ? formData.quoteDate.toLocaleDateString() : 'Non précisée'}
Date du déménagement: ${formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : 'Non précisée'}

*Message complémentaire*
${formData.message || 'Aucun message'}

Merci de me contacter rapidement pour un devis détaillé.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Demande de devis - Déménagement d'entreprise - ${formData.companyName || formData.firstName + ' ' + formData.lastName}`;
    const body = `Bonjour,

Je souhaite demander un devis pour un déménagement d'entreprise.

**Informations de l'entreprise**
- Société: ${formData.companyName || formData.firstName + ' ' + formData.lastName}
- Nom du contact: ${formData.firstName} ${formData.lastName}
- Poste: ${formData.position || 'Non précisé'}
- Email: ${formData.email}
- Téléphone: ${formData.phone}
- Nombre d'employés: ${formData.employeeCount || 'Non précisé'}

**Adresse de départ**
- Adresse: ${formData.adresseDepart}
- Étages: ${formData.etagesDepart || 'Non précisé'}
- Ascenseur: ${formData.ascenseurDepart === 'oui' ? 'Oui' : 'Non'}

**Adresse d'arrivée**
- Adresse: ${formData.adresseArrivee}
- Étages: ${formData.etagesArrivee || 'Non précisé'}
- Ascenseur: ${formData.ascenseurArrivee === 'oui' ? 'Oui' : 'Non'}

**Équipements à déménager**
${formData.equipmentType.length > 0 ? formData.equipmentType.join(', ') : 'Non spécifié'}

**Services supplémentaires**
- Stockage temporaire: ${formData.needsStorage === 'oui' ? 'Oui' : 'Non'}
- Recyclage mobilier: ${formData.needsRecycling === 'oui' ? 'Oui' : 'Non'}

**Détails du déménagement**
- Type: Entreprise / Bureau
- Date du devis: ${formData.quoteDate ? formData.quoteDate.toLocaleDateString() : 'Non précisée'}
- Date du déménagement: ${formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : 'Non précisée'}

**Message complémentaire**
${formData.message || 'Aucun message'}

Merci de me contacter rapidement pour un devis détaillé.

Cordialement,
${formData.firstName} ${formData.lastName}
${formData.position ? formData.position : ''}
${formData.companyName ? formData.companyName : ''}`;
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
        companyName: formData.companyName,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        moveType: 'corporate',
        pickupAddress: formData.adresseDepart,
        pickupFloors: formData.etagesDepart ? Number(formData.etagesDepart) : null,
        pickupElevator: formData.ascenseurDepart,
        deliveryAddress: formData.adresseArrivee,
        deliveryFloors: formData.etagesArrivee ? Number(formData.etagesArrivee) : null,
        deliveryElevator: formData.ascenseurArrivee,
        quoteDate: formData.quoteDate,
        moveStartDate: formData.moveStartDate,
        employeeCount: formData.employeeCount ? Number(formData.employeeCount) : null,
        equipmentType: formData.equipmentType,
        needsStorage: formData.needsStorage,
        needsRecycling: formData.needsRecycling,
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
    { icon: Building2, label: 'Bureaux & Sièges' },
    { icon: Users, label: 'Équipe certifiée' },
    { icon: Clock, label: 'Sans interruption' },
    { icon: Package, label: 'Emballage pro' },
    { icon: Shield, label: 'Assurance RC' },
    { icon: Award, label: 'Expert reconnu' },
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

  // Thème clair professionnel : Bleu corporate / Blanc / Gris élégant
  const theme = {
    primary: 'from-blue-600 via-indigo-700 to-blue-800',
    primarySolid: 'blue-600',
    accent: 'indigo-600',
    accentHover: 'indigo-700',
    accentLight: 'indigo-50',
    cardBg: 'bg-white',
    border: 'border-gray-100',
    textPrimary: 'text-gray-900',
    textAccent: 'text-indigo-600',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
    buttonAccent: 'bg-blue-600 hover:bg-blue-700',
    gradientBg: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50/30',
  };

  return (
    <>
      <Head>
        <title>Déménagement d'entreprise professionnel | {companyName} Tunisie</title>
        <meta name="description" content="Service de déménagement professionnel pour entreprises en Tunisie : transfert de bureaux, sièges sociaux, locaux commerciaux. Devis gratuit, assurance incluse, équipe experte." />
        <meta name="keywords" content="déménagement entreprise Tunisie, déménagement bureaux, transfert siège social, déménagement professionnel Tunis" />
        <meta property="og:title" content="Déménagement d'entreprise - Service Professionnel en Tunisie" />
        <meta property="og:description" content="Confiez le déménagement de votre entreprise à des experts. Service sur toute la Tunisie, devis personnalisé." />
        <meta property="og:image" content="/images/og-demenagement-entreprise.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
        {/* Hero Section - Version simplifiée */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Fond simplifié - juste un dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800"></div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-sm border border-white/30">
                EXPERTISE PROFESSIONNELLE
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Déménagement <br />
              <span className="text-indigo-200 drop-shadow-lg">d'Entreprise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95"
            >
              Transfert de bureaux, sièges sociaux et locaux commerciaux — Solution clé en main, sans interruption
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
                className="group px-8 py-4 rounded-full font-bold text-lg shadow-2xl bg-white text-indigo-700 hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2"
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
              className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/q0wmgFvTXdQ?si=1o2XcFakusE6_nW2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
                  whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
                  className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-all"
                >
                  <feature.icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Service Description */}
            <motion.div variants={itemVariants} className="space-y-8 text-gray-700">
              {/* Introduction */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
                  <Building2 className="w-8 h-8" />
                  Votre Partenaire de Confiance
                </h2>
                <p className="text-lg leading-relaxed text-gray-600 mb-4">
                  Chez <strong className="text-indigo-600">{companyName}</strong>, nous comprenons qu'un déménagement d'entreprise est une opération
                  stratégique qui ne peut pas laisser place à l'improvisation. Chaque minute d'arrêt peut avoir un impact
                  financier significatif. C'est pourquoi nous mettons notre expertise à votre service pour garantir une
                  transition fluide et sans interruption de votre activité.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  Spécialistes du déménagement professionnel, nous accompagnons les entreprises de toutes tailles dans
                  leurs projets de transfert de bureaux, de sièges sociaux ou de locaux commerciaux à travers toute la Tunisie.
                </p>
              </div>

              {/* Processus Professionnel */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
                  <ClipboardCheck className="w-8 h-8" />
                  Notre Processus en 5 Étapes
                </h2>

                <div className="space-y-6">
                  {[
                    { num: 1, title: "Audit et Analyse", icon: ClipboardList, desc: "Visite sur site gratuite, analyse de vos besoins, inventaire détaillé du mobilier et des équipements." },
                    { num: 2, title: "Devis Détaillé", icon: FileSignature, desc: "Proposition écrite avec planning précis, devis transparent, aucune surprise sur la facture finale." },
                    { num: 3, title: "Planification", icon: Calendar, desc: "Établissement d'un calendrier détaillé, planification hors heures ouvrables si nécessaire." },
                    { num: 4, title: "Exécution", icon: Truck, desc: "Emballage professionnel, transport sécurisé, installation dans vos nouveaux locaux." },
                    { num: 5, title: "Facturation & Suivi", icon: Receipt, desc: "Facture détaillée conforme à la législation, suivi post-déménagement." },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 p-4 bg-indigo-50/30 rounded-xl border border-indigo-100">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                        {step.num}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <step.icon className="w-5 h-5 text-indigo-600" />
                          <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devis et Facturation */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
                  <Calculator className="w-8 h-8" />
                  Devis et Facturation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <FileText className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Devis Gratuit</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">✓ Détail des prestations</li>
                      <li className="flex items-center gap-2">✓ Planning prévisionnel</li>
                      <li className="flex items-center gap-2">✓ Sans engagement</li>
                      <li className="flex items-center gap-2">✓ Validité 30 jours</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <Receipt className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Facturation Conforme</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">✓ Facture avec TVA</li>
                      <li className="flex items-center gap-2">✓ Acompte 30% possible</li>
                      <li className="flex items-center gap-2">✓ Paiement sécurisé</li>
                      <li className="flex items-center gap-2">✓ Devis = contrat</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Équipements Professionnels */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
                  <Briefcase className="w-8 h-8" />
                  Équipements Déménagés
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Laptop, label: "Postes de travail" },
                    { icon: Printer, label: "Périphériques" },
                    { icon: Server, label: "Serveurs IT" },
                    { icon: HardDrive, label: "Archives" },
                    { icon: Building, label: "Mobilier bureau" },
                    { icon: Archive, label: "Stockage" },
                    { icon: Phone, label: "Téléphonie" },
                    { icon: Package, label: "Fournitures" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg text-center hover:bg-indigo-50 transition border border-gray-100">
                      <item.icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avantages */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
                  <Sparkles className="w-8 h-8" />
                  Pourquoi Nous Choisir ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Timer className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Intervention Hors Horaires</h3>
                        <p className="text-sm text-gray-600">Soir, week-ends ou jours fériés sans surcoût majeur.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Assurance Tous Risques</h3>
                        <p className="text-sm text-gray-600">Couverture complète de vos biens, attestation fournie.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Équipe Dédiée</h3>
                        <p className="text-sm text-gray-600">Un chef de projet unique de A à Z.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Matériel Premium</h3>
                        <p className="text-sm text-gray-600">Cartons renforcés, caisses bois, film professionnel.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form - Thème clair */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
            id="contact"
          >
            <div className="sticky top-20 bg-white border border-gray-100 rounded-2xl p-8 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">Demander un devis</h3>

              {loadingContact && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                  <span className="ml-2 text-gray-600">Chargement...</span>
                </div>
              )}

              {contactError && (
                <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{contactError}</AlertDescription>
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
                <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <QuoteForm/>

              {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">Prénom *</label>
                    <Input
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">Nom *</label>
                    <Input
                      name="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Nom de l'entreprise</label>
                  <Input
                    name="companyName"
                    placeholder="Raison sociale"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Poste / Fonction</label>
                  <Input
                    name="position"
                    placeholder="Votre poste"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Email professionnel *</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="contact@entreprise.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Téléphone *</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+216 XX XXX XXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Nombre d'employés</label>
                  <Select value={formData.employeeCount} onValueChange={(value) => handleSelectChange("employeeCount", value)}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-800">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employés</SelectItem>
                      <SelectItem value="11-50">11-50 employés</SelectItem>
                      <SelectItem value="51-200">51-200 employés</SelectItem>
                      <SelectItem value="201+">201+ employés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-indigo-600 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Adresse de départ
                  </h4>
                  <div className="space-y-3">
                    <Input
                      name="adresseDepart"
                      placeholder="Adresse complète"
                      value={formData.adresseDepart}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        name="etagesDepart"
                        placeholder="Étages"
                        value={formData.etagesDepart}
                        onChange={handleInputChange}
                        className="w-2/3 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        min="0"
                      />
                      <Select value={formData.ascenseurDepart} onValueChange={(value) => handleSelectChange("ascenseurDepart", value)}>
                        <SelectTrigger className="w-1/3 bg-gray-50 border-gray-200 text-gray-800">
                          <SelectValue placeholder="Ascenseur ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oui">Oui</SelectItem>
                          <SelectItem value="non">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-indigo-600 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Adresse d'arrivée
                  </h4>
                  <div className="space-y-3">
                    <Input
                      name="adresseArrivee"
                      placeholder="Adresse complète"
                      value={formData.adresseArrivee}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        name="etagesArrivee"
                        placeholder="Étages"
                        value={formData.etagesArrivee}
                        onChange={handleInputChange}
                        className="w-2/3 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                        min="0"
                      />
                      <Select value={formData.ascenseurArrivee} onValueChange={(value) => handleSelectChange("ascenseurArrivee", value)}>
                        <SelectTrigger className="w-1/3 bg-gray-50 border-gray-200 text-gray-800">
                          <SelectValue placeholder="Ascenseur ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oui">Oui</SelectItem>
                          <SelectItem value="non">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-indigo-600 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Équipements à déménager
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Postes informatiques", "Serveurs", "Mobilier de bureau", "Archives", "Équipements de cuisine", "Matériel spécifique"].map((equip) => (
                      <label key={equip} className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={formData.equipmentType.includes(equip)}
                          onChange={() => handleEquipmentToggle(equip)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        {equip}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                  <div>
                    <label className="text-sm mb-1 block text-gray-700">Date du devis</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100">
                          <CalendarIcon className="mr-2 h-4 w-4 text-indigo-600" />
                          {formData.quoteDate ? formData.quoteDate.toLocaleDateString() : "Choisir"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border-gray-200">
                        <CalendarComponent
                          mode="single"
                          selected={formData.quoteDate || undefined}
                          onSelect={(date) => handleDateChange("quoteDate", date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm mb-1 block text-gray-700">Date déménagement</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100">
                          <CalendarIcon className="mr-2 h-4 w-4 text-indigo-600" />
                          {formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : "Choisir"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border-gray-200">
                        <CalendarComponent
                          mode="single"
                          selected={formData.moveStartDate || undefined}
                          onSelect={(date) => handleDateChange("moveStartDate", date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm mb-1 block text-gray-700">Stockage temporaire</label>
                    <Select value={formData.needsStorage} onValueChange={(value) => handleSelectChange("needsStorage", value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-800">
                        <SelectValue placeholder="Non" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oui">Oui</SelectItem>
                        <SelectItem value="non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm mb-1 block text-gray-700">Recyclage mobilier</label>
                    <Select value={formData.needsRecycling} onValueChange={(value) => handleSelectChange("needsRecycling", value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-800">
                        <SelectValue placeholder="Non" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oui">Oui</SelectItem>
                        <SelectItem value="non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block text-gray-700">Informations complémentaires</label>
                  <Textarea
                    name="message"
                    placeholder="Contraintes particulières, équipements sensibles..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" disabled={loading}>
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi...</> : "Envoyer ma demande"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Ou contactez-nous</span></div>
                  </div>

                  <Button type="button" onClick={handleWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" /> Devis par WhatsApp
                  </Button>

                  <Button type="button" onClick={handleEmail} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail className="w-4 h-4 mr-2" /> Devis par Email
                  </Button>
                </div>

                {!loadingContact && contactInfo && (
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Phone className="w-4 h-4 text-indigo-600" />
                      <div><p className="font-semibold text-gray-800">Téléphone</p><p className="text-gray-600">{contactInfo.phone}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Mail className="w-4 h-4 text-indigo-600" />
                      <div><p className="font-semibold text-gray-800">Email</p><p className="text-gray-600">{contactInfo.email}</p></div>
                    </div>
                    {contactInfo.socials && contactInfo.socials.length > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex-1"><p className="font-semibold text-gray-800 mb-2">Réseaux sociaux</p>
                          <div className="flex gap-3">
                            {contactInfo.socials.map((social, idx) => {
                              const Icon = getSocialIcon(social.title);
                              return <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer"><Icon className="w-5 h-5 text-indigo-600 hover:text-indigo-500" /></a>;
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <p className="text-xs text-gray-600">
                    ✓ Réponse sous 24h ouvrées<br />
                    ✓ Devis détaillé sans engagement<br />
                    ✓ Facturation conforme<br />
                    ✓ Intervention possible hors horaires<br />
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

// Composant manquant
function Recycle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
}