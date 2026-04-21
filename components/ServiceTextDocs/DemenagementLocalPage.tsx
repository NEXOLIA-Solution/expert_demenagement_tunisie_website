'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Phone, Mail, MessageCircle, Calculator, MapPin,
  Shield, Truck, Clock, Users, Star, CheckCircle,
  Package, Heart, ThumbsUp, Award, ChevronDown
} from 'lucide-react';
import Head from 'next/head';

const DemenagementLocalPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation de la section hero en fonction du scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Variantes d'animation
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Fonction pour compter les chiffres (utilisée dans la section stats)
  const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const [count, setCount] = React.useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    React.useEffect(() => {
      if (!inView) return;
      let start = 0;
      const increment = value / (duration * 60); // 60 fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [inView, value, duration]);

    return <span ref={ref}>{count}+</span>;
  };

  // Images de la galerie (remplacez par vos propres URLs)
  const galleryImages = [
    { src: '/images/demenagement-1.jpg', alt: 'Équipe de déménagement en action' },
    { src: '/images/demenagement-2.jpg', alt: 'Camion de déménagement moderne' },
    { src: '/images/demenagement-3.jpg', alt: 'Matériel de protection et cartons' },
    { src: '/images/demenagement-4.jpg', alt: 'Client satisfait' },
    { src: '/images/demenagement-5.jpg', alt: 'Déménagement de bureau' },
    { src: '/images/demenagement-6.jpg', alt: 'Emballage soigné' },
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: 'Karim Ben Ali',
      role: 'Client particulier',
      content: 'Une équipe professionnelle et très réactive. Mon déménagement s\'est déroulé sans aucune casse. Je recommande vivement !',
      rating: 5,
    },
    {
      name: 'Sonia Trabelsi',
      role: 'Chef d\'entreprise',
      content: 'Nous avons confié le déménagement de nos bureaux à cette équipe. Tout a été parfait, du début à la fin.',
      rating: 5,
    },
    {
      name: 'Mehdi Ghozzi',
      role: 'Propriétaire',
      content: 'Service rapide, soigneux et prix compétitifs. Merci pour votre aide précieuse !',
      rating: 5,
    },
  ];

  // Questions fréquentes
  const faqs = [
    {
      question: 'Quels sont vos délais d\'intervention ?',
      answer: 'Nous intervenons généralement sous 24 à 48 heures après validation du devis. Pour les urgences, contactez-nous directement.',
    },
    {
      question: 'Proposez-vous l\'emballage des affaires ?',
      answer: 'Oui, nous proposons un service complet d\'emballage et déballage avec du matériel de qualité (cartons, papier bulle, couvertures).',
    },
    {
      question: 'Quelles zones couvrez-vous ?',
      answer: 'Nous intervenons dans toute la Tunisie : Tunis, Sousse, Sfax, Nabeul, Bizerte, et toutes les autres villes.',
    },
    {
      question: 'Mon déménagement est-il assuré ?',
      answer: 'Tous nos déménagements incluent une assurance responsabilité civile. Une extension d\'assurance est possible pour les biens de valeur.',
    },
  ];

  // Couleurs de la palette
  const colors = {
    primary: '#a10128',
    secondary: '#bfecf4',
    accent: '#cfceda',
    black: '#000000',
    white: '#ffffff',
  };

  return (
    <>
      <Head>
        <title>Déménagement local à domicile | DéménagePro Tunisie</title>
        <meta name="description" content="Déménagement local en Tunisie : professionnel, rapide et sécurisé. Devis gratuit, équipe expérimentée, intervention dans tout le pays." />
        <meta name="keywords" content="déménagement Tunisie, déménagement local, déménagement domicile, entreprise déménagement Tunis" />
        <meta property="og:title" content="Déménagement local à domicile - DéménagePro" />
        <meta property="og:description" content="Déménagez en toute sérénité avec notre équipe experte. Service sur toute la Tunisie." />
        <meta property="og:image" content="/images/og-demenagement.jpg" />
      </Head>

      <div ref={containerRef} className="min-h-screen bg-white" style={{ color: colors.black }}>
        {/* Section Hero avec vidéo et titre animé au scroll */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Fond avec dégradé et formes animées */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #500014 100%)` }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#bfecf4] rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>
            {/* Particules animées (cercles) */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                animate={{
                  y: [null, -100, 100],
                  x: [null, 50, -50],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
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
              Déménagement local <br />
              <span style={{ color: colors.secondary }}>à domicile</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90"
            >
              Un service premium, rapide et sans stress, partout en Tunisie.
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
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                Demander un devis
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#video"
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white/10 transition"
              >
                Voir la vidéo
              </motion.a>
            </motion.div>
          </div>

          {/* Indicateur de scroll */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.section>

        {/* Section vidéo */}
        <section id="video" className="py-20 bg-[#bfecf4] bg-opacity-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12"
              style={{ color: colors.primary }}
            >
              Regardez notre équipe en action
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto border-4"
              style={{ borderColor: colors.primary }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=0&mute=1&loop=1&playlist=VIDEO_ID&controls=1"
                  title="Vidéo de présentation du déménagement"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Pourquoi nous choisir - statistiques animées */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
              style={{ color: colors.primary }}
            >
              Pourquoi nous choisir ?
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                { icon: Users, stat: <Counter value={1500} />, label: 'Clients satisfaits' },
                { icon: Truck, stat: <Counter value={3200} />, label: 'Déménagements réalisés' },
                { icon: Shield, stat: '100%', label: 'Sécurité garantie' },
                { icon: Award, stat: <Counter value={10} />, label: 'Années d\'expérience' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: '#f8f9fa', borderBottom: `4px solid ${colors.primary}` }}
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{item.stat}</div>
                  <p className="text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section avantages détaillés */}
        <section className="py-20" style={{ backgroundColor: colors.secondary }}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>Un service complet sur mesure</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Nous prenons en charge chaque étape de votre déménagement pour vous offrir une expérience sans souci.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary }}>
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Emballage professionnel</h3>
                    <p className="text-gray-600">Nous utilisons du matériel de qualité (cartons renforcés, papier bulle, couvertures) pour protéger vos biens les plus fragiles.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary }}>
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Transport sécurisé</h3>
                    <p className="text-gray-600">Nos camions sont équipés de systèmes de arrimage et de suivi GPS. Votre déménagement est suivi en temps réel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary }}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Service attentionné</h3>
                    <p className="text-gray-600">Nos équipes sont formées pour manipuler vos objets avec soin et respecter vos horaires. Votre satisfaction est notre priorité.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primary }}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Assurance tous risques</h3>
                    <p className="text-gray-600">Chaque déménagement est couvert par une assurance responsabilité civile. Option pour une extension sur les biens de valeur.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="/images/equipe-demenagement.jpg"
                  alt="Équipe de déménagement"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: colors.primary }}>
                  +15 ans
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section processus en 4 étapes */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
              style={{ color: colors.primary }}
            >
              Notre processus en 4 étapes simples
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Ligne de connexion (cachée sur mobile) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-[#cfceda] -translate-y-1/2 z-0"></div>

              {[
                { icon: Phone, title: 'Contact', desc: 'Appelez-nous ou remplissez notre formulaire pour un devis gratuit.' },
                { icon: Calculator, title: 'Devis', desc: 'Nous évaluons vos besoins et vous proposons un devis transparent.' },
                { icon: Package, title: 'Préparation', desc: 'Nous emballons vos affaires avec soin et préparons le transport.' },
                { icon: Truck, title: 'Déménagement', desc: 'Jour J : transport et installation à votre nouveau domicile.' },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="relative z-10 bg-white p-8 rounded-xl shadow-lg text-center border-t-4"
                  style={{ borderColor: colors.primary }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
                    style={{ backgroundColor: colors.primary }}>
                    {index + 1}
                  </div>
                  <step.icon className="w-10 h-10 mx-auto mb-3" style={{ color: colors.primary }} />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Galerie d'images */}
        <section className="py-20" style={{ backgroundColor: colors.secondary }}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12"
              style={{ color: colors.primary }}
            >
              Notre travail en images
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Témoignages clients */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
              style={{ color: colors.primary }}
            >
              Ce que nos clients disent
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="p-6 rounded-xl shadow-lg relative"
                  style={{ backgroundColor: '#f9f9f9', border: `1px solid ${colors.accent}` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: i < testimonial.rating ? colors.primary : colors.accent }} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm" style={{ color: colors.primary }}>{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" style={{ backgroundColor: colors.secondary }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12"
              style={{ color: colors.primary }}
            >
              Questions fréquentes
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const [isOpen, setIsOpen] = React.useState(false);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg focus:outline-none"
                      style={{ color: colors.primary }}
                    >
                      {faq.question}
                      <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-gray-600"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section Contact améliorée */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-12 text-white relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #500014 100%)` }}
            >
              {/* Formes décoratives */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#bfecf4]/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Prêt à déménager ?</h2>
                  <p className="text-xl opacity-90 mb-8">
                    Contactez-nous dès maintenant pour un devis gratuit et personnalisé. Nous sommes disponibles dans toute la Tunisie.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/216XXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                      <MessageCircle size={20} />
                      WhatsApp
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:contact@demenagepro.tn"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                      <Mail size={20} />
                      Email
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="/devis"
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                      <Calculator size={20} />
                      Devis gratuit
                    </motion.a>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Phone size={20} />
                    <span className="text-lg">+216 XX XXX XXX</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <MapPin size={20} />
                    <span>Disponible dans toute la Tunisie</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <MapPin size={80} className="text-white/80" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
};

export default DemenagementLocalPage;