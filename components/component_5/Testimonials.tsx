"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Testimonials.css';
import { Button } from '../ui/button';
import { ReviewFormSection } from './ReviewFormSection';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
// Type pour un avis validé
type Review = {
  _id: string;
  userName: string;
  email: string;
  profileImage?: string;
  service: string;
  reviewText: string;
  rating: number;
  city: string;
  createdAt: string;
};

const ITEMS_PER_PAGE = 4;
const AUTO_PLAY_DELAY = 4500;

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  // Récupération des avis validés
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000';
        const { data } = await axios.get(`${baseUrl}/review/api/validated`);
        setReviews(data);
      } catch (err) {
        setError('Impossible de charger les avis');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Auto-play du carrousel
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, AUTO_PLAY_DELAY);
    return () => clearInterval(interval);
  }, [totalPages, reviews.length]);

  const visibleItems = reviews.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const handleAddReview = (newReview: Review) => {
    // On ne l'ajoute pas directement car il doit être validé par l'admin
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <section className="tm-section">
        <div className="tm-container">
          <div className="tm-content text-center py-20">Chargement des avis...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tm-section">
        <div className="tm-container">
          <div className="tm-content text-center py-20 text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="tm-section">
      <div className="tm-shape-bg top-right-gradient"></div>
      <div className="tm-shape-bg bottom-left-gradient"></div>
      <div className="tm-shape-accent-square"></div>

      <div className="tm-container">
        <div className="tm-content">
          {/* Header */}
          <div className="tm-header">
            <h2 className="tm-main-title">
              Témoignages <br />
              <span className="tm-bold-title">de nos clients</span>
            </h2>
            <p className="tm-description">
              Découvrez ce que nos clients pensent de nos services et de notre professionnalisme.
            </p>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" onClick={() => setIsModalOpen(true)}>
                Laissez votre avis
              </Button>
            </div>
          </div>

          {/* Carousel */}
          {reviews.length > 0 ? (
            <div className="tm-carousel">
              <div key={page} className="tm-grid tm-grid-animate">
                {visibleItems.map((review) => (
                  <div key={review._id} className="tm-card-wrapper">
                    <div className="tm-card">
                      <div className="tm-quote-icon tm-quote-top">“</div>

                      <div className="tm-card-content">
                        <div className="tm-profile-section">
                          <div className="tm-avatar">
                            <img
                              src={review.profileImage || '/default-avatar.png'}
                              alt={review.userName}
                            />
                          </div>
                          <div className="tm-meta">
                            <div className="tm-stars">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                            <p className="tm-user-info">
                              <strong>{review.userName}</strong> | {review.city}
                            </p>
                            <p className="tm-service">Service : {review.service}</p>
                          </div>
                        </div>

                        <h4 className="tm-card-heading">Avis client</h4>
                        <p className="tm-card-text">{review.reviewText}</p>
                      </div>

                      <div className="tm-quote-icon tm-quote-bottom">”</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              {totalPages > 1 && (
                <div className="tm-dots">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <span
                      key={i}
                      className={`tm-dot ${i === page ? 'active' : ''}`}
                      onClick={() => setPage(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Aucun avis pour le moment. Soyez le premier à donner votre avis !
            </div>
          )}
        </div>
      </div>

      {/* Modale avec le formulaire */}
      {/* Modale avec le formulaire */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">

          <DialogTitle className="text-xl font-semibold mb-4">
            Laisser un avis
          </DialogTitle>

          <ReviewFormSection onAddReview={handleAddReview} isModal />

        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;