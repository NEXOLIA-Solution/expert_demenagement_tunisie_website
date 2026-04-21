'use client';

import React, { useState } from 'react';
import './WhyChooseUs.css';

interface FeatureItem {
  icon: 'diamond' | 'clock' | 'hand' | 'heart';
  title: string;
  description: string;
  color: string;
}

const WhyChooseUs: React.FC<{
  mainTitle?: string;
  features?: FeatureItem[];
  centerText?: string[];
}> = ({
  mainTitle = 'POURQUOI\nNOUS\nCHOISIR',
  features = [
    {
      icon: 'diamond',
      title: 'Déménagement professionnel',
      description:
        'Équipe expérimentée et équipement moderne pour un déménagement en toute sécurité.',
      color: '#8B5CF6',
    },
    {
      icon: 'clock',
      title: 'Ponctualité garantie',
      description:
        'Respect strict des délais et planification précise de chaque étape du déménagement.',
      color: '#6366F1',
    },
    {
      icon: 'hand',
      title: 'Emballage soigné',
      description:
        'Service d’emballage complet avec des matériaux professionnels pour protéger vos biens.',
      color: '#06B6D4',
    },
    {
      icon: 'heart',
      title: 'Assurance complète',
      description:
        'Protection totale de vos meubles et objets durant tout le processus de déménagement.',
      color: '#EF4444',
    },
  ],
  centerText = [
    'Une expertise reconnue dans le domaine du déménagement.',
    'Sécurité, confiance et satisfaction client au cœur de nos priorités.',
  ],
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderIcon = (iconType: string) => {
    const iconProps = {
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'white',
      strokeWidth: '2',
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    };

    switch (iconType) {
      case 'diamond':
        return (
          <svg {...iconProps}>
            <path d="M6 9l6-6 6 6-6 6-6-6z" />
            <path d="M6 9l3 6-3 6m6 0l3-6 3 6m-6-12v6m0 6v-6" />
          </svg>
        );
      case 'clock':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'hand':
        return (
          <svg {...iconProps}>
            <path d="M8 5v10c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-6" />
            <path d="M10 10h4" />
            <path d="M10 19l-2 3M14 19l-2 3" />
          </svg>
        );
      case 'heart':
        return (
          <svg {...iconProps}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="why-choose-us-container">
      <div className="why-choose-us-content">
        {/* Background circle */}
        <div className="background-circle"></div>

        {/* Main circle */}
        <div className="main-circle">
          <div className="main-text">
            {mainTitle.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>

        {/* Feature circles */}
        <div className="features-circles">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`feature-circle feature-${idx}`}
              style={{ backgroundColor: feature.color }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-hovered={hoveredIndex === idx}
            >
              {renderIcon(feature.icon)}
            </div>
          ))}
        </div>

        {/* Center text */}
        <div className="center-content">
          {centerText.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>

      {/* Right side descriptions */}
      <div className="descriptions">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="description-item"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-hovered={hoveredIndex === idx}
          >
            <div
              className="description-line"
              style={{ backgroundColor: feature.color }}
            />
            <div className="description-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
