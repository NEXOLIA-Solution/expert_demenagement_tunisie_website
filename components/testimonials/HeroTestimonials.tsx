"use client"

export function HeroTestimonials() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-secondary via-muted/30 to-background">
      
      {/* Decorative background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-muted-foreground/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 text-center relative z-10">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full text-sm font-semibold uppercase tracking-wider bg-primary/10 text-primary">
          Témoignages clients
        </span>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-balance">
          Ce que disent
          <span className="block text-primary">nos clients</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          Découvrez les retours d’expérience authentiques de nos clients satisfaits.
          Leur confiance et leur satisfaction sont au cœur de notre engagement
          et témoignent de la qualité de nos services.
        </p>

      </div>
    </section>
  )
}
