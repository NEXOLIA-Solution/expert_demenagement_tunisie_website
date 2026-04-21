"use client";

import { useEffect, useState, useRef } from "react";

const StatsSection = () => {
  const stats = [
    { end: 15, suffix: "+", label: "Années d'expérience", sublabel: "dans le déménagement" },
    { end: 5000, suffix: "+", label: "Déménagements réussis", sublabel: "et clients satisfaits" },
    { end: 98, suffix: "%", label: "Taux de satisfaction", sublabel: "clients recommandent" },
    { end: 24, suffix: "/7", label: "Support disponible", sublabel: "assistance continue" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  // ⚡ Typage correct du ref
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasAnimated.current) return;
      const rect = sectionRef.current.getBoundingClientRect(); // ✅ plus d'erreur
      if (rect.top < window.innerHeight * 0.8) {
        stats.forEach((stat, i) => {
          let start = 0;
          const duration = 2000; // 2s
          const increment = stat.end / (duration / 20);

          const interval = setInterval(() => {
            start += increment;
            if (start >= stat.end) {
              start = stat.end;
              clearInterval(interval);
            }
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[i] = Math.floor(start);
              return newCounts;
            });
          }, 20);
        });
        hasAnimated.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos chiffres parlent d'eux-mêmes
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Des années d'expérience au service de milliers de clients satisfaits
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transition-transform hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-3">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-base md:text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm opacity-80">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;