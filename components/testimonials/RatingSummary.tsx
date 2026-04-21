"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function RatingSummary() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-primary shadow-xl">
            <CardContent className="pt-10 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="text-6xl font-bold text-primary">4.9</span>
                    <span className="text-2xl text-muted-foreground">/5</span>
                  </div>
                  <div className="flex gap-1 mb-3 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-base text-muted-foreground">Basé sur 500+ avis vérifiés</p>
                </div>
                <div className="grid grid-cols-3 gap-12 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">
                      Satisfaction
                      <br />
                      client
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">
                      Clients
                      <br />
                      recommandent
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                    <div className="text-sm text-muted-foreground">
                      Déménagements
                      <br />
                      réalisés
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
