"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, MapPin } from "lucide-react"

export function TestimonialsGrid({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="relative py-24 md:py-32 from-muted/30 to-background overflow-hidden">

      {/* Decorative blur */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-muted-foreground/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Avis clients
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ils nous ont fait confiance
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Découvrez les témoignages authentiques de nos clients
            qui ont vécu une expérience de déménagement sereine
            et professionnelle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-8">

                {/* Quote icon */}
                <Quote className="h-14 w-14 text-primary/10 absolute top-6 right-6" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                  “{testimonial.text}”
                </p>

                {/* Footer */}
                <div className="pt-6 border-t border-border/60 space-y-4">

                  {/* Client */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold leading-none">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="px-3 py-1 rounded-full bg-muted">
                      {testimonial.service}
                    </span>
                    <span>{testimonial.date}</span>
                  </div>

                </div>
              </CardContent>

              {/* Hover accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-primary/30 transition-all duration-500" />
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
