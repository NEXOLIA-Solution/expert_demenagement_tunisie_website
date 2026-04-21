"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle, MessageSquare, Star } from "lucide-react"

// Exemple de services
const services = [
  "Déménagement résidentiel",
  "Déménagement commercial",
  "Transport de piano et objets lourds",
  "Service d'emballage",
  "Entreposage sécurisé",
  "Déménagement longue distance",
]

export function ReviewFormSection({ onAddReview }: { onAddReview?: (review: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    service: "",
    rating: 5,
    testimonial: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddReview?.({ ...formData, date: new Date().toLocaleDateString() }) // si on passe la fonction onAddReview
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", location: "", service: "", rating: 5, testimonial: "" })
    }, 3000)
  }

  return (
    <section className="py-20 md:py-10  from-primary/5 to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partagez votre expérience</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vous avez fait appel à nos services ? Nous serions ravis de connaître votre avis ! Votre témoignage aide d'autres personnes à faire le bon choix.
            </p>
          </div>

          <Card className="border-2 shadow-xl">
            <CardContent className="pt-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Merci pour votre témoignage !</h3>
                  <p className="text-muted-foreground">
                    Votre avis a été envoyé avec succès. Il sera publié après vérification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Votre nom *</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Marie Dubois"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Votre ville *</Label>
                      <Input
                        id="location"
                        placeholder="Ex: Paris"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Nouveau : sélection du service */}
                  <div className="space-y-2">
                    <Label htmlFor="service">Service utilisé *</Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="w-full border rounded px-3 py-2 bg-background"
                    >
                      <option value="" disabled>
                        Sélectionnez un service
                      </option>
                      {services.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Votre évaluation *</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-10 w-10 ${
                              rating <= formData.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="testimonial">Votre témoignage *</Label>
                    <Textarea
                      id="testimonial"
                      placeholder="Partagez votre expérience avec DéménagePro. Comment s'est passé votre déménagement ? Qu'avez-vous particulièrement apprécié ?"
                      rows={6}
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      required
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">Minimum 50 caractères</p>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg py-6">
                    Envoyer mon témoignage
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez que votre témoignage soit publié sur notre site
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
