"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./Services.css";

const OurServices = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const servicesData = [
    {
      id: 1,
      title: "Déménagement résidentiel",
      smalText: "Un accompagnement complet pour un déménagement sans stress.",
      bigText:
        "Notre service de déménagement résidentiel est conçu pour accompagner les particuliers à chaque étape de leur projet. Nous prenons en charge : • L'évaluation préalable de vos besoins • L'emballage sécurisé de vos biens • Le démontage et remontage du mobilier • Le transport avec des véhicules adaptés • L'installation dans votre nouveau logement. Notre priorité est la sécurité de vos biens et votre tranquillité d'esprit.",
      icon: "users",
      images: [
        "/residentiel/image1.png",
        "/residentiel/image2.png",
        "/residentiel/image3.png",
      ],
    },
    {
      id: 2,
      title: "Service d'emballage",
      smalText: "Protection optimale de vos biens avant le transport.",
      bigText:
        "Notre service d'emballage garantit la protection maximale de vos biens. Nous utilisons : • Des cartons renforcés • Des matériaux de protection adaptés • Un emballage spécifique pour les objets fragiles • Un étiquetage clair pour un déballage facile • Une organisation efficace pour éviter toute casse.",
      icon: "tools",
      images: ["/emballage/image1.png", "/emballage/image2.png", "/emballage/image3.png"],
    },
    {
      id: 3,
      title: "Déménagement commercial",
      smalText: "Transfert rapide et sécurisé de vos locaux professionnels.",
      bigText:
        "Notre service de déménagement commercial s'adresse aux entreprises, bureaux et commerces. Nous assurons : • La planification détaillée du déménagement • La protection du matériel informatique et des documents • Le démontage et remontage du mobilier professionnel • Le transport sécurisé • Une reprise d'activité rapide avec un minimum d'interruption.",
      icon: "settings",
      images: [
        "/commerciale/image1.png",
        "/commerciale/image2.png",
        "/commerciale/image3.png",
        "/commerciale/image4.png",
      ],
    },
    {
      id: 4,
      title: "Déménagement longue distance",
      smalText: "Transport fiable sur de longues distances.",
      bigText:
        "Notre service de déménagement longue distance est idéal pour les déplacements inter-villes ou internationaux. Nous assurons : • Une planification logistique complète • Un emballage renforcé • Un transport sécurisé sur de longues distances • Le respect des délais • Une livraison fiable à destination.",
      icon: "money",
      images: ["/trage/image1.png", "/trage/image2.png", "/trage/image3.png"],
    },
  ];

  const renderIcon = (type) => {
    switch (type) {
      case "users":
        return (
          <svg viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        );
      case "tools":
        return (
          <svg viewBox="0 0 24 24">
            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
          </svg>
        );
      case "settings":
        return (
          <svg viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.15 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        );
      case "money":
        return (
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.33 0 2.26-.87 2.26-1.94 0-1.51-1.58-1.9-2.72-2.12-2.32-.44-4.81-1.06-4.81-3.63 0-1.8 1.4-3.15 3.3-3.51V3.66h2.67v1.98c1.5.33 2.65 1.23 2.91 3h-1.98c-.14-.87-.84-1.63-2.15-1.63-1.12 0-2.06.67-2.06 1.65 0 1.19 1.42 1.63 2.61 1.87 2.49.5 4.96 1.13 4.96 3.84.02 1.94-1.46 3.26-3.54 3.67z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Carrousel automatique du panneau gauche
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const currentService = servicesData[activeServiceIndex];
        return (prevIndex + 1) % currentService.images.length;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeServiceIndex]);

  // Empêcher le scroll de la page quand le modal est ouvert
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleServiceHover = (index) => {
    setActiveServiceIndex(index);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    const currentService = servicesData[activeServiceIndex];
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentService.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    const currentService = servicesData[activeServiceIndex];
    setCurrentImageIndex((prev) =>
      prev === currentService.images.length - 1 ? 0 : prev + 1
    );
  };

  // Gestion du modal
  const openModal = (index) => {
    setSelectedService(servicesData[index]);
    setModalImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleModalPrev = () => {
    if (selectedService) {
      setModalImageIndex((prev) =>
        prev === 0 ? selectedService.images.length - 1 : prev - 1
      );
    }
  };

  const handleModalNext = () => {
    if (selectedService) {
      setModalImageIndex((prev) =>
        prev === selectedService.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const currentService = servicesData[activeServiceIndex];

  return (
    <>
      <div className="text-center mb-16 mt-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">
          Ce que nous offrons
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-3">Nos services</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Des solutions complètes et personnalisées adaptées à tous vos besoins
        </p>
      </div>

      <div className="services-container">
        {/* Panneau Gauche avec Carrousel */}
        <div className="left-panel">
          <div
            className="left-bg-image"
            style={{
              backgroundImage: `url('${currentService.images[currentImageIndex]}')`,
            }}
          >
            <div className="carousel-controls">
              <button className="carousel-btn prev" onClick={handlePrevImage}>
                ‹
              </button>
              <button className="carousel-btn next" onClick={handleNextImage}>
                ›
              </button>
            </div>

            <div className="carousel-indicators">
              {currentService.images.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="overlay"></div>

          <div className="left-content">
            <h3>Ce que nous offrons</h3>
            <h1>{currentService.title}</h1>
            <p>{currentService.smalText}</p>
            <a href="/services" className="animated-cta-button morphing">
              Voir tous nos services en détails
            </a>
          </div>
        </div>

        {/* Panneau Droit */}
        <div className="right-panel">
          <div className="service-list">
            {servicesData.map((item, index) => (
              <div
                key={item.id}
                className={`service-item ${index === activeServiceIndex ? "active" : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => handleServiceHover(index)}
                onClick={() => openModal(index)} // Ouvre le modal au clic
              >
                <div className="icon-box">{renderIcon(item.icon)}</div>
                <div className="text-box">
                  <h3 style={{ fontWeight: "bolder" }}>{item.title}</h3>
                  <p>{item.smalText}</p>
                </div>
                <div className="service-image-count">
                  <span>{item.images.length} photos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-image-container">
              <img
                src={selectedService.images[modalImageIndex]}
                alt={selectedService.title}
              />
              {selectedService.images.length > 1 && (
                <>
                  <button className="modal-prev" onClick={handleModalPrev}>
                    ‹
                  </button>
                  <button className="modal-next" onClick={handleModalNext}>
                    ›
                  </button>
                </>
              )}
              <div className="modal-indicators">
                {selectedService.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`modal-indicator ${idx === modalImageIndex ? "active" : ""}`}
                    onClick={() => setModalImageIndex(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="modal-info">
              <h2>{selectedService.title}</h2>
              <p className="modal-description">{selectedService.bigText}</p>
              <div className="modal-footer">
                <Link href="/services" className="modal-button">
                  Voir tous les services
                </Link>
                <span className="photo-count">
                  {selectedService.images.length} photos
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OurServices;