'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Mail,
  MessageCircle,
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
  Calendar,
  User,
  ArrowRight,
  Package,
  Thermometer,
  Key,
  Lock,
  Truck,
  Scale,
  DollarSign,
  Warehouse,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';
import Head from 'next/head';

export function SecureStoragePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    adresse: '', // adresse du client ou lieu de prise en charge
    typeBien: 'meubles', // meubles, cartons, véhicules, archives
    duree: '3', // mois
    volume: '',
    acces: 'libre', // libre, horaires, sur rdv
    dateDevis: '',
    dateDebut: '',
  });

  const whatsappNumber = '23267646';
  const emailAddress = 'wahbisj@gmail.com';
  const youtubeId = '_D0uOmC86Ek'; // À remplacer par une vidéo présentant l'entrepôt

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = () => {
    const message = `Bonjour, je souhaite obtenir un devis pour un entreposage sécurisé.

*Informations de contact*
Nom / Société: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

*Localisation de prise en charge*
Adresse: ${formData.adresse || 'Non précisée'}

*Détails de l'entreposage*
Type de bien: ${formData.typeBien}
Durée estimée: ${formData.duree} mois
Volume approximatif: ${formData.volume || 'Non précisé'} m³
Accès souhaité: ${formData.acces === 'libre' ? 'Libre 24/7' : formData.acces === 'horaires' ? 'Horaires ouvrés' : 'Sur rendez-vous'}

*Dates*
Date du devis: ${formData.dateDevis || 'Non précisée'}
Date de début souhaitée: ${formData.dateDebut || 'Non précisée'}

*Message complémentaire*
${formData.message || 'Aucun message'}

Merci de me contacter rapidement.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Demande de devis - Entreposage sécurisé - ${formData.name}`;
    const body = `Bonjour,

Je souhaite obtenir un devis pour un entreposage sécurisé.

**Informations de contact**
- Nom / Société: ${formData.name}
- Email: ${formData.email}
- Téléphone: ${formData.phone}

**Localisation de prise en charge**
- Adresse: ${formData.adresse || 'Non précisée'}

**Détails de l'entreposage**
- Type de bien: ${formData.typeBien}
- Durée estimée: ${formData.duree} mois
- Volume approximatif: ${formData.volume || 'Non précisé'} m³
- Accès souhaité: ${formData.acces === 'libre' ? 'Libre 24/7' : formData.acces === 'horaires' ? 'Horaires ouvrés' : 'Sur rendez-vous'}

**Dates**
- Date du devis: ${formData.dateDevis || 'Non précisée'}
- Date de début souhaitée: ${formData.dateDebut || 'Non précisée'}

**Message complémentaire**
${formData.message || 'Aucun message'}

Merci de me contacter rapidement.

Cordialement,
${formData.name}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const features = [
    { icon: Shield, label: 'Surveillance 24h/24' },
    { icon: Lock, label: 'Accès sécurisé par badge' },
    { icon: Thermometer, label: 'Climatisation et hygrométrie' },
    { icon: Package, label: 'Emballage et fournitures' },
    { icon: Truck, label: 'Transport possible' },
    { icon: Scale, label: 'Tarifs dégressifs' },
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
        <title>Entreposage sécurisé | StockPro Tunisie</title>
        <meta
          name="description"
          content="Solutions d'entreposage sécurisé en Tunisie : garde-meubles, archives, stockage professionnel. Accès contrôlé, climatisation, assurance."
        />
        <meta
          name="keywords"
          content="entreposage Tunisie, garde-meubles, stockage sécurisé, entrepôt sécurisé, location espace stockage Tunis"
        />
        <meta property="og:title" content="Entreposage sécurisé - StockPro" />
        <meta
          property="og:description"
          content="Stockez vos biens en toute tranquillité dans nos entrepôts climatisés et surveillés."
        />
        <meta property="og:image" content="/images/og-stockage.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/20 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950/10">
        {/* Hero Section - couleurs bleu profond / or */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-20 left-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"
            />
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                }}
                animate={{
                  y: [null, -100, 100],
                  x: [null, 50, -50],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Entreposage <br />
              <span className="text-amber-400 drop-shadow-lg">sécurisé</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95"
            >
              Des espaces adaptés à vos besoins, surveillés et accessibles en toute simplicité.
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
                className="group px-8 py-4 rounded-full font-bold text-lg shadow-2xl bg-white text-slate-900 hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <span>Demander un devis</span>
                <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#video"
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm transition"
              >
                Visite virtuelle
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

        {/* Main Content - Two Column Layout */}
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
              className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-slate-800/50"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/9L6uCA0gbkU?si=WHyM5vKQqdqzQxnq`}
                  title="Visite de nos entrepôts sécurisés"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
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
                  className="bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center hover:shadow-lg transition-shadow backdrop-blur-sm"
                >
                  <feature.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-white">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description Text */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-white"
            >
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 text-amber-400">
                  Notre Service d'Entreposage Sécurisé
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      Qui sommes-nous ?
                    </h3>
                    <p className="text-base leading-relaxed opacity-90">
                      Nous gérons des entrepôts climatisés et sécurisés depuis plus de 15 ans. Particuliers en transition, professionnels ayant besoin d'archives ou de stockage supplémentaire : nous offrons des solutions flexibles et adaptées à chaque besoin.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      Ce que nous offrons
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'Box de différentes tailles (1 à 50 m²)',
                        'Surveillance vidéo et alarmes 24h/24',
                        'Contrôle d’accès par badge',
                        'Température et hygrométrie régulées',
                        'Fournitures d’emballage et transport possible',
                        'Assurance incluse'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                          <span className="text-sm opacity-90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      Nos avantages
                    </h3>
                    <p className="text-base leading-relaxed opacity-90 mb-3">
                      Pas de période d’engagement : vous louez au mois et résiliez quand vous voulez. Accès à vos biens selon vos disponibilités (libre 24/7, horaires ouvrés ou sur rendez-vous). Nos entrepôts sont nettoyés et entretenus régulièrement.
                    </p>
                    <p className="text-base leading-relaxed opacity-90">
                      Nous proposons aussi un service de transport et de manutention pour vous aider à installer vos affaires. Devis personnalisé en fonction du volume et de la durée.
                    </p>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-amber-400">Processus simple et transparent</h3>
                    <ol className="space-y-3">
                      {[
                        'Estimation de vos besoins (volume, durée)',
                        'Proposition d’un box adapté et devis',
                        'Signature du contrat et remise des badges',
                        'Dépôt de vos biens (par nos soins ou par vous-même)',
                        'Accès et suivi en temps réel'
                      ].map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white text-sm font-semibold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-sm opacity-90 pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
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
            <div className="sticky top-20 bg-slate-800/70 border border-white/10 rounded-2xl p-8 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-6 text-amber-400">Demander un devis</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Nom / Société *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Votre nom ou raison sociale"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="contact@exemple.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Téléphone *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+216 XX XXX XXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Adresse de prise en charge (optionnel) */}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Adresse de prise en charge (si transport)
                  </h4>
                  <Input
                    type="text"
                    name="adresse"
                    placeholder="Adresse complète"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Type de bien */}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <label className="text-sm font-medium text-white mb-2 block">
                    Type de bien à entreposer
                  </label>
                  <select
                    name="typeBien"
                    value={formData.typeBien}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-slate-700/50 border-white/10 text-white px-3 py-2 text-sm"
                  >
                    <option value="meubles">Meubles / Décoration</option>
                    <option value="cartons">Cartons / Affaires personnelles</option>
                    <option value="archives">Archives / Documents</option>
                    <option value="vehicules">Véhicules / Engins</option>
                    <option value="marchandises">Marchandises / Stocks</option>
                  </select>
                </div>

                {/* Durée et volume */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-white mb-1 block">
                      Durée (mois)
                    </label>
                    <Input
                      type="number"
                      name="duree"
                      value={formData.duree}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-1 block">
                      Volume (m³)
                    </label>
                    <Input
                      type="number"
                      name="volume"
                      placeholder="Ex: 10"
                      value={formData.volume}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                {/* Type d'accès */}
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Accès souhaité
                  </label>
                  <select
                    name="acces"
                    value={formData.acces}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-slate-700/50 border-white/10 text-white px-3 py-2 text-sm"
                  >
                    <option value="libre">Libre 24h/24</option>
                    <option value="horaires">Horaires ouvrés (8h-18h)</option>
                    <option value="rdv">Sur rendez-vous</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 mt-2">
                  <div>
                    <label className="text-sm font-medium text-white mb-1 block">
                      Date du devis
                    </label>
                    <Input
                      type="date"
                      name="dateDevis"
                      value={formData.dateDevis}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-1 block">
                      Début souhaité
                    </label>
                    <Input
                      type="date"
                      name="dateDebut"
                      value={formData.dateDebut}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <label className="text-sm font-medium text-white mb-2 block">
                    Informations complémentaires
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Exigez-vous des conditions particulières ?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border-white/10 text-white placeholder:text-white/50 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Devis par WhatsApp
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmail}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Devis par Email
                </motion.button>
              </div>

              <div className="mt-8 space-y-4 text-sm text-white">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">WhatsApp</p>
                    <p className="opacity-75">{whatsappNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="opacity-75">{emailAddress}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-xs text-white/90">
                  ✓ Réponse sous 24h
                  <br />
                  ✓ Devis personnalisé
                  <br />
                  ✓ Accès sécurisé et assurance incluse
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}