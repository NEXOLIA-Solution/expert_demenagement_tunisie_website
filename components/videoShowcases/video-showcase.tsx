'use client'

import { useState, useEffect } from 'react'
import { Play, X } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

// Type correspondant au modèle backend (avec _id)
interface VideoItem {
  _id: string
  title: string
  description: string
  youtubeLink: string
}

// Fonction pour extraire l'ID YouTube d'une URL (ou retourner l'ID si c'est déjà un ID)
const extractYouTubeId = (url: string): string | null => {
  // Si c'est déjà un ID simple (11 caractères)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper pour obtenir l'URL de la miniature YouTube
const getYouTubeThumbnail = (youtubeId: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'hqdefault') => {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`
}

export default function VideoShowcase() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Récupération des vidéos depuis l'API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        // Utiliser une variable d'environnement pour l'URL de base
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE
        const { data } = await axios.get(`${baseUrl}/video/api/all`)
        setVideos(data)
      } catch (err) {
        console.error('Erreur lors du chargement des vidéos:', err)
        setError('Impossible de charger les vidéos. Veuillez réessayer plus tard.')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Affichage pendant le chargement
  if (loading) {
    return (
      <section className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Chargement des vidéos...</div>
        </div>
      </section>
    )
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <section className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex items-center justify-center h-full">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </section>
    )
  }

  // Si aucune vidéo n'est disponible
  if (videos.length === 0) {
    return (
      <section className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Aucune vidéo disponible pour le moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 25%, #0d1428 50%, #1a1f3a 75%, #0f172a 100%)'
    }}>
      {/* ... (le reste du code avec les animations et le fond reste inchangé) ... */}

      {/* Le contenu principal : on utilise la variable `videos` dynamique */}
      <div className="relative max-w-7xl mx-auto z-10">
        {/* HEADER (inchangé) */}
        <div className="text-center mb-20 space-y-6 animate-fadeInDown">
          <div className="inline-block">
            <span className="px-6 py-3 rounded-full text-sm font-semibold border backdrop-blur-md transition-all duration-300 hover:scale-105" style={{
              background: 'rgba(191, 236, 244, 0.15)',
              borderColor: 'rgba(191, 236, 244, 0.5)',
              color: '#bfecf4'
            }}>
              ✨ Nos Activités Professionnelles
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Découvrez nos
            <span className="block mt-2 drop-shadow-lg" style={{
              background: 'linear-gradient(135deg, #bfecf4 0%, #7dd3c0 50%, #5fc9b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              services en action
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Observez comment notre équipe d'experts gère chaque détail de votre déménagement avec professionnalisme, précision et excellence.
          </p>
        </div>

        {/* VIDEO GRID - DYNAMIQUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {videos.map((video, index) => {
            const youtubeId = extractYouTubeId(video.youtubeLink) || ''
            return (
              <div
                key={video._id}
                onClick={() => {
                  setSelectedVideo(video)
                  setIsPlaying(false)
                }}
                className="group cursor-pointer"
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Premium Video Card (identique mais avec youtubeId extrait) */}
                <div className="relative h-full rounded-3xl overflow-hidden border transition-all duration-500 backdrop-blur-md group hover:shadow-2xl hover:-translate-y-2" style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 30, 50, 0.8) 100%)',
                  borderColor: 'rgba(191, 236, 244, 0.2)',
                  boxShadow: 'group-hover:0 20px 50px rgba(191, 236, 244, 0.2)'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(191, 236, 244, 0.6)'
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(191, 236, 244, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(191, 236, 244, 0.2)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Card background glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'radial-gradient(circle at center, rgba(191, 236, 244, 0.1) 0%, transparent 70%)'
                  }}></div>

                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    {youtubeId && (
                      <img
                        src={getYouTubeThumbnail(youtubeId, 'hqdefault')}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                      />
                    )}

                    {/* Multi-layer overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500"></div>

                    {/* Animated border glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      borderRadius: 'inherit',
                      boxShadow: 'inset 0 0 30px rgba(59, 130, 246, 0.5)'
                    }}></div>

                    {/* Premium Play button with animation */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div className="relative w-20 h-20">
                        {/* Pulsing background circles */}
                        <div className="absolute inset-0 rounded-full animate-pulse opacity-50" style={{
                          background: '#bfecf4'
                        }}></div>
                        <div className="absolute inset-2 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{
                          background: '#bfecf4',
                          boxShadow: '0 0 30px rgba(191, 236, 244, 0.6)'
                        }}>
                          <Play className="w-8 h-8 text-slate-950 fill-slate-950 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Duration badge - on peut afficher un placeholder ou le retirer */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 backdrop-blur-md rounded-full text-sm font-bold border flex items-center gap-2 transition-all" style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      borderColor: 'rgba(191, 236, 244, 0.5)',
                      color: '#bfecf4'
                    }}>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff4444' }}></div>
                      {/* Optionnel : afficher la durée si disponible (nécessite API YouTube) */}
                      <span>▶</span>
                    </div>

                    {/* Video counter badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 text-white text-xs font-bold rounded-full" style={{
                      background: 'linear-gradient(135deg, #bfecf4 0%, #7dd3c0 100%)',
                      color: '#0f172a'
                    }}>
                      {index + 1}/{videos.length}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-7 space-y-4 relative">
                    {/* Animated top border */}
                    <div className="absolute top-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                      background: 'linear-gradient(90deg, transparent, #bfecf4, transparent)'
                    }}></div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:transition-colors duration-300 line-clamp-2 leading-tight" style={{
                        color: 'white'
                      }} onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#bfecf4'
                      }} onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'white'
                      }}>
                        {video.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed transition-colors group-hover:text-slate-100">
                      {video.description}
                    </p>

                    {/* Enhanced CTA Button */}
                    <div className="pt-4 flex items-center gap-3 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{
                      color: '#bfecf4'
                    }}>
                      <span className="flex items-center gap-2">
                        Regarder la vidéo
                        <Play className="w-4 h-4 fill-current" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(191, 236, 244, 0.5), transparent)'
                  }}></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* PREMIUM CTA SECTION (inchangé) */}
        <div className="mt-10 relative">
          <div className="flex justify-center mt-12">
            <Link href="/galerie">
              <button
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #bfecf4 0%, #7dd3c0 100%)",
                  color: "#0f172a",
                  boxShadow: "0 10px 30px rgba(191,236,244,0.3)",cursor:"pointer"
                }}
              >
                Voir plus dans notre galerie
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MODALE VIDÉO YOUTUBE - adaptée pour utiliser youtubeLink */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => {
            setSelectedVideo(null)
            setIsPlaying(false)
          }}
        >
          {/* Conteneur interne */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto animate-scaleIn my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-3xl overflow-hidden border shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(20, 28, 50) 100%)',
                borderColor: 'rgba(191, 236, 244, 0.3)',
                boxShadow: '0 0 60px rgba(191, 236, 244, 0.2)',
              }}
            >
              {/* Bouton fermer */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedVideo(null)
                  setIsPlaying(false)
                }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #ff5555 0%, #dd3333 100%)',
                  boxShadow: '0 0 20px rgba(255, 85, 85, 0.5)',
                }}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Lecteur YouTube */}
              <div className="relative w-full aspect-video bg-slate-950">
                {!isPlaying ? (
                  <>
                    <img
                      src={getYouTubeThumbnail(extractYouTubeId(selectedVideo.youtubeLink) || '', 'maxresdefault')}
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsPlaying(true)
                      }}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <div
                          className="absolute w-28 h-28 border-2 rounded-full animate-ping opacity-75"
                          style={{ borderColor: '#bfecf4' }}
                        ></div>
                        <div
                          className="absolute w-24 h-24 border-2 rounded-full animate-pulse opacity-50"
                          style={{ borderColor: '#7dd3c0' }}
                        ></div>
                        <div
                          className="relative w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, #bfecf4 0%, #7dd3c0 100%)',
                            boxShadow: '0 0 40px rgba(191, 236, 244, 0.7)',
                          }}
                        >
                          <Play className="w-10 h-10 fill-slate-950 ml-1" style={{ color: '#0f172a' }} />
                        </div>
                      </div>
                    </button>
                  </>
                ) : (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(selectedVideo.youtubeLink)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STYLES (inchangés) */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(50px, -80px) scale(1.15); }
          66% { transform: translate(-30px, 40px) scale(0.95); }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 20px rgba(59,130,246,0.3), 0 0 40px rgba(34,197,94,0); }
          50% { box-shadow: 0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(34,197,94,0.2); }
        }
        .animate-blob {
          animation: blob 8s infinite cubic-bezier(0.4,0.0,0.2,1);
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
        }
        .animate-gradientShift {
          animation: gradientShift 6s ease infinite;
          background-size: 200% 200%;
        }
        .group:hover {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}