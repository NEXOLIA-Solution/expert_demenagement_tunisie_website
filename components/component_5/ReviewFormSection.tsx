"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquare, Star, Upload, X } from "lucide-react";

// Exemple de services (à récupérer depuis l'API plus tard)
const services = [
  "Déménagement résidentiel",
  "Déménagement commercial",
  "Transport de piano et objets lourds",
  "Service d'emballage",
  "Entreposage sécurisé",
  "Déménagement longue distance",
];

export function ReviewFormSection({ onAddReview, isModal = false }: { onAddReview?: (review: any) => void; isModal?: boolean }) {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    city: "",
    service: "",
    rating: 5,
    reviewText: "",
  });
  const [profileImage, setProfileImage] = useState<string>(""); // base64
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
    setImageFile(null);
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation simple
    if (!formData.userName || !formData.email || !formData.city || !formData.service || !formData.reviewText) {
      alert("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    const payload = {
      userName: formData.userName,
      email: formData.email,
      city: formData.city,
      service: formData.service,
      rating: formData.rating,
      reviewText: formData.reviewText,
      profileImage: profileImage || "", // Si pas d'image, on envoie une chaîne vide (backend mettra une image par défaut)
    };

    try {
     
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
      await axios.post(`${baseUrl}/review/api/register`, payload);
      setSubmitted(true);
      onAddReview?.(payload); // pour notifier le parent
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          userName: "",
          email: "",
          city: "",
          service: "",
          rating: 5,
          reviewText: "",
        });
        setProfileImage("");
        setImageFile(null);
      }, 3000);
    } catch (error: any) {
      alert(error.response?.data?.message || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${isModal ? 'py-6' : 'py-20 md:py-10'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partagez votre expérience</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Votre avis nous aide à nous améliorer et guide d'autres clients.
            </p>
          </div>

          <Card className="border-2 shadow-xl">
            <CardContent className="pt-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Merci pour votre avis !</h3>
                  <p className="text-muted-foreground">
                    Il sera publié après validation par notre équipe.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div className="space-y-2">
                    <Label htmlFor="userName">Votre nom *</Label>
                    <Input
                      id="userName"
                      placeholder="Ex: Marie Dubois"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* Ville */}
                  <div className="space-y-2">
                    <Label htmlFor="city">Votre ville *</Label>
                    <Input
                      id="city"
                      placeholder="Ex: Paris"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>

                  {/* Image (optionnelle) */}
                  <div className="space-y-4">
                    <Label>Photo de profil (optionnelle)</Label>
                    <div className="flex items-center gap-4">
                      {profileImage && (
                        <div className="relative">
                          <img src={profileImage} alt="Prévisualisation" className="w-16 h-16 rounded-full object-cover" />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      <div>
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('avatar-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {profileImage ? "Changer" : "Télécharger une photo"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <Label htmlFor="service">Service utilisé *</Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                      className="w-full border rounded-md px-3 py-2 bg-background"
                    >
                      <option value="" disabled>Sélectionnez un service</option>
                      {services.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Étoiles */}
                  <div className="space-y-2">
                    <Label>Note *</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${rating <= formData.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Témoignage */}
                  <div className="space-y-2">
                    <Label htmlFor="reviewText">Votre témoignage *</Label>
                    <Textarea
                      id="reviewText"
                      placeholder="Partagez votre expérience..."
                      rows={5}
                      value={formData.reviewText}
                      onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                      required
                      minLength={10}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer mon avis"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En soumettant, vous acceptez que votre avis soit publié après validation.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}