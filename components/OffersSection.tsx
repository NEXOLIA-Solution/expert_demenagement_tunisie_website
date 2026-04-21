'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Zap, Gift, Sparkles } from 'lucide-react';
import axios from 'axios'


export const OffersSection = () => {
  const [animateElements, setAnimateElements] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE
      await axios.post(`${API_URL}/email-list/api/register`, { email })
      setSuccess('Merci ! Votre email a bien été enregistré.')
      setEmail('')
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }






  useEffect(() => {
    setAnimateElements(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 10,
        y: (e.clientY / window.innerHeight) * 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-red-100/10 to-pink-100/10 rounded-full blur-3xl animate-pulse"
          style={{
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-tl from-blue-100/20 to-transparent rounded-full blur-3xl"
          style={{
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        {/* Decorative lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A71930" />
              <stop offset="100%" stopColor="#E8D7DB" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,200 Q300,400 600,200 T1200,200"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Top label */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-pink-100 border border-red-200/50 shadow-sm">
            <Zap className="w-4 h-4 text-[#A71930]" />
            <span className="text-sm font-semibold text-[#A71930]">
              Offres Limitées & Actualités
            </span>
            <Sparkles className="w-4 h-4 text-[#A71930]" />
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div
            className={`transition-all duration-1000 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
          >
            <div className="space-y-6">
              {/* Main title with animated words */}
              <div className="space-y-2">
                <h2 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
                  Ne manquez pas nos{' '}
                  <span className="relative inline-block">
                    <span className="absolute -inset-1 bg-gradient-to-r from-[#A71930] to-pink-500 blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse rounded"></span>
                    <span className="relative px-3 py-1 bg-white rounded text-[#A71930] font-black">
                      offres exclusives
                    </span>
                  </span>
                </h2>
                <p className="text-xl font-bold text-gray-800">
                  Nos forfaits et promotions disparaissent rapidement !
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                Découvrez nos dernières actualités, promotions spéciales et forfaits innovants.
                Profitez de réductions exceptionnelles et d'offres tempérées avant qu'elles ne
                s'envolent. Nos clients réguliers bénéficient des meilleures opportunités du
                marché.
              </p>

              {/* Three benefit boxes */}
              <div className="space-y-3 pt-4">
                {[
                  { icon: '⚡', text: 'Réductions jusqu\'à 40% sur les forfaits' },
                  { icon: '🎁', text: 'Offres exclusives pour les membres' },
                  { icon: '📰', text: 'Nouvelles annonces chaque semaine' },
                ].map((benefit, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 transition-all duration-1000 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <span className="text-gray-700 font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-6 flex flex-col sm:flex-row gap-6 items-start">
                {/* Bouton Découvrir les actualités (inchangé) */}
               

                {/* Bloc newsletter sur fond blanc */}
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">Restez informé</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Abonnez-vous à notre newsletter pour les dernières offres et conseils
                  </p>
                  <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
                    <input
                      type="email"
                      placeholder="Votre email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A71930] focus:border-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-[#A71930] to-red-700 text-white font-bold rounded-lg hover:shadow-lg hover:from-[#A71930] hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {loading ? 'Envoi...' : "S'abonner"}
                    </button>
                  </form>
                  {success && <p className="mt-3 text-green-600 text-sm">{success}</p>}
                  {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Animated visual elements */}
          <div
            className={`relative h-80 lg:h-96 transition-all duration-1000 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            {/* Card 1 - Top */}
            <div
              className="absolute top-0 right-0 w-64 bg-white rounded-xl p-6 shadow-2xl border border-blue-100 hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                animation: 'float 4s ease-in-out infinite',
                transform: `translateY(${mousePosition.y * 0.5}px)`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Gift className="w-8 h-8 text-[#A71930]" />
                <span className="px-2 py-1 bg-red-100 text-[#A71930] text-xs font-bold rounded">
                  -30%
                </span>
              </div>
              <p className="text-sm text-gray-600">Forfait Confort</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">À partir de 249€</p>
            </div>

            {/* Card 2 - Middle */}
            <div
              className="absolute top-1/2 left-0 w-64 bg-gradient-to-br from-[#A71930] to-red-700 rounded-xl p-6 shadow-2xl text-white hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer -translate-y-1/2"
              style={{
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '0.5s',
                transform: `translateY(calc(-50% + ${mousePosition.y * 0.8}px))`,
              }}
            >
              <Sparkles className="w-8 h-8 mb-4" />
              <p className="text-sm opacity-90">Nouvelle offre</p>
              <p className="text-2xl font-bold mt-2">Forfait Premium</p>
              <p className="text-sm opacity-75 mt-1">Accès illimité + support 24/7</p>
            </div>

            {/* Card 3 - Bottom */}
            <div
              className="absolute bottom-0 right-12 w-64 bg-white rounded-xl p-6 shadow-2xl border border-pink-100 hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '1s',
                transform: `translateY(${-mousePosition.y * 0.5}px)`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Zap className="w-8 h-8 text-[#A71930]" />
                <span className="px-2 py-1 bg-pink-100 text-[#A71930] text-xs font-bold rounded">
                  NOUVEAU
                </span>
              </div>
              <p className="text-sm text-gray-600">Actualité</p>
              <p className="font-bold text-gray-900 mt-2">Nouvelles services lancés!</p>
              <p className="text-xs text-gray-500 mt-1">En ligne depuis 48h</p>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-16 flex justify-center">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#A71930] to-pink-500"
                style={{
                  animation: `pulse 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: animateElements ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
};
