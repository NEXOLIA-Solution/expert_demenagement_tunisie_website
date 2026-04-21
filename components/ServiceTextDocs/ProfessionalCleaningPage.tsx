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
  Calendar,
  Briefcase,
  User,
  ArrowRight,
  Sparkles,
  Droplets,
  Wind,
  Brush,
  SprayCan,
  Trash2,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';
import Head from 'next/head';

export function ProfessionalCleaningPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    adresse: '',
    etages: '',
    ascenseur: false,
    typeNettoyage: 'residentiel', // residentiel, bureau, industriel
    surface: '',
    dateDevis: '',
    dateIntervention: '',
  });

  const whatsappNumber = '23267646'; // À remplacer
  const emailAddress = 'wahbisj@gmail.com';
  const youtubeId = '_D0uOmC86Ek'; // À remplacer par une vidéo de nettoyage si possible

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleWhatsApp = () => {
    const message = `Bonjour, je souhaite demander un devis pour un nettoyage professionnel.

*Informations de contact*
Nom / Société: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

*Lieu d'intervention*
Adresse: ${formData.adresse}
Étages: ${formData.etages || 'Non précisé'}
Ascenseur: ${formData.ascenseur ? 'Oui' : 'Non'}

*Détails de la prestation*
Type de nettoyage: ${formData.typeNettoyage === 'residentiel' ? 'Résidentiel' : formData.typeNettoyage === 'bureau' ? 'Bureaux' : 'Industriel'}
Surface approximative: ${formData.surface || 'Non précisée'} m²
Date du devis: ${formData.dateDevis || 'Non précisée'}
Date d'intervention souhaitée: ${formData.dateIntervention || 'Non précisée'}

*Message complémentaire*
${formData.message || 'Aucun message'}

Merci de me contacter rapidement.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Demande de devis - Nettoyage professionnel - ${formData.name}`;
    const body = `Bonjour,

Je souhaite demander un devis pour un nettoyage professionnel.

**Informations de contact**
- Nom / Société: ${formData.name}
- Email: ${formData.email}
- Téléphone: ${formData.phone}

**Lieu d'intervention**
- Adresse: ${formData.adresse}
- Étages: ${formData.etages || 'Non précisé'}
- Ascenseur: ${formData.ascenseur ? 'Oui' : 'Non'}

**Détails de la prestation**
- Type de nettoyage: ${formData.typeNettoyage === 'residentiel' ? 'Résidentiel' : formData.typeNettoyage === 'bureau' ? 'Bureaux' : 'Industriel'}
- Surface approximative: ${formData.surface || 'Non précisée'} m²
- Date du devis: ${formData.dateDevis || 'Non précisée'}
- Date d'intervention souhaitée: ${formData.dateIntervention || 'Non précisée'}

**Message complémentaire**
${formData.message || 'Aucun message'}

Merci de me contacter rapidement.

Cordialement,
${formData.name}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const features = [
    { icon: Sparkles, label: 'Nettoyage en profondeur' },
    { icon: Droplets, label: 'Produits écologiques' },
    { icon: Wind, label: 'Assainissement' },
    { icon: Brush, label: 'Équipement professionnel' },
    { icon: Shield, label: 'Personnel formé' },
    { icon: Leaf, label: 'Respect de l’environnement' },
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
        <title>Nettoyage professionnel | CleanPro Tunisie</title>
        <meta
          name="description"
          content="Services de nettoyage professionnel en Tunisie : résidentiel, bureaux, industriel. Devis gratuit, équipe qualifiée et produits écologiques."
        />
        <meta
          name="keywords"
          content="nettoyage professionnel Tunisie, nettoyage bureaux, nettoyage industriel, entretien locaux, société de nettoyage Tunis"
        />
        <meta property="og:title" content="Nettoyage professionnel - CleanPro" />
        <meta
          property="og:description"
          content="Confiez l’entretien de vos locaux à des experts. Intervention rapide et respectueuse de l’environnement."
        />
        <meta property="og:image" content="/images/og-nettoyage.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20">
        {/* Hero Section - couleurs teal / orange */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-orange-400">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"
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
              Nettoyage <br />
              <span className="text-orange-200 drop-shadow-lg">professionnel</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95"
            >
              Pour un environnement sain et impeccable, confiez-nous l’entretien de vos espaces.
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
                className="group px-8 py-4 rounded-full font-bold text-lg shadow-2xl bg-white text-teal-700 hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2"
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
                Voir la vidéo
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
              className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-border bg-card"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/Ethh6y7AH9M?si=CfZoxnz6yLqR5BiS`}
                  title="Nettoyage professionnel"
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
                  className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <feature.icon className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description Text */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-foreground"
            >
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-600">
                  Notre Service de Nettoyage Professionnel
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      Qui sommes-nous ?
                    </h3>
                    <p className="text-base leading-relaxed opacity-90">
                      Spécialistes du nettoyage depuis plus de 10 ans, nous intervenons chez les particuliers, les entreprises et les sites industriels. Notre équipe qualifiée utilise des produits respectueux de l’environnement et des techniques de pointe pour un résultat irréprochable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      Ce que nous offrons
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'Nettoyage régulier ou ponctuel (bureaux, commerces, copropriétés)',
                        'Remise en état après travaux',
                        'Nettoyage industriel et de surfaces spéciales',
                        'Désinfection et assainissement',
                        'Vitrerie et façades',
                        'Traitement des sols (moquette, parquet, carrelage)'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
                          <span className="text-sm opacity-90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      Nos avantages
                    </h3>
                    <p className="text-base leading-relaxed opacity-90 mb-3">
                      Nous nous adaptons à vos horaires pour minimiser les perturbations. Nos produits sont certifiés écologiques et sans danger pour les personnes et les animaux. Nous assurons une traçabilité complète des interventions.
                    </p>
                    <p className="text-base leading-relaxed opacity-90">
                      Tous nos agents sont formés aux normes d’hygiène et de sécurité en vigueur. Nous proposons également des contrats sur mesure avec passages réguliers.
                    </p>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-teal-600">Notre processus</h3>
                    <ol className="space-y-3">
                      {[
                        'Prise de contact et analyse de vos besoins',
                        'Devis personnalisé et sans engagement',
                        'Planification de l’intervention',
                        'Réalisation du nettoyage avec contrôle qualité',
                        'Suivi client et ajustements si nécessaire'
                      ].map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm font-semibold flex items-center justify-center">
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
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-8 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6 text-teal-600">Demander un devis</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nom / Société *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Votre nom ou raison sociale"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="contact@exemple.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Téléphone *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+216 XX XXX XXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Lieu d'intervention */}
                <div className="border-t border-border pt-4 mt-4">
                  <h4 className="font-semibold text-teal-600 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Lieu d'intervention
                  </h4>
                  <div className="space-y-3">
                    <Input
                      type="text"
                      name="adresse"
                      placeholder="Adresse complète"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        name="etages"
                        placeholder="Nombre d'étages"
                        value={formData.etages}
                        onChange={handleInputChange}
                        className="w-2/3"
                        min="0"
                      />
                      <label className="flex items-center gap-2 text-sm w-1/3">
                        <input
                          type="checkbox"
                          name="ascenseur"
                          checked={formData.ascenseur}
                          onChange={handleInputChange}
                          className="rounded border-border"
                        />
                        Ascenseur
                      </label>
                    </div>
                  </div>
                </div>

                {/* Type de nettoyage et surface */}
                <div className="border-t border-border pt-4 mt-2">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Type de nettoyage
                  </label>
                  <select
                    name="typeNettoyage"
                    value={formData.typeNettoyage}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="residentiel">Résidentiel</option>
                    <option value="bureau">Bureaux / Commerces</option>
                    <option value="industriel">Industriel / Entrepôt</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Surface approximative (m²)
                  </label>
                  <Input
                    type="number"
                    name="surface"
                    placeholder="Ex: 100"
                    value={formData.surface}
                    onChange={handleInputChange}
                    className="w-full"
                    min="0"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 mt-2">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Date du devis
                    </label>
                    <Input
                      type="date"
                      name="dateDevis"
                      value={formData.dateDevis}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Date d'intervention
                    </label>
                    <Input
                      type="date"
                      name="dateIntervention"
                      value={formData.dateIntervention}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Message complémentaire */}
                <div className="border-t border-border pt-4 mt-2">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Informations complémentaires
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Précisez vos besoins (type de surfaces, contraintes horaires, etc.)"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Devis par WhatsApp
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmail}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Devis par Email
                </motion.button>
              </div>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <MessageCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">WhatsApp</p>
                    <p className="opacity-75">{whatsappNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <p className="opacity-75">{emailAddress}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg">
                <p className="text-xs text-foreground opacity-75">
                  ✓ Réponse sous 24h
                  <br/>
                  ✓ Devis gratuit et personnalisé
                  <br/>
                  ✓ Produits écologiques certifiés
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}