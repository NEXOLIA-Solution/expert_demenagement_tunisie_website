// components/QuoteForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Mail,
  MessageCircle,
  Phone,
  CheckCircle2,
  MapPin,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

interface CompanyContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description?: string;
  website?: string;
  socials?: Array<{ title: string; url: string; _id: string }>;
  isAvailable24h?: boolean;
  logo?: string;
}

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressClient: string;
  matriculeFiscaleClient: string;
  moveType: string;
  pickupAddress: string;
  pickupFloors: string;
  pickupElevator: string;
  deliveryAddress: string;
  deliveryFloors: string;
  deliveryElevator: string;
  quoteDate: Date | null;
  moveStartDate: Date | null;
  additionalInfo: string;
}

interface QuoteFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function QuoteForm({ onSuccess, onError, className = '' }: QuoteFormProps) {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<CompanyContact | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [contactError, setContactError] = useState('');

  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressClient: '',
    matriculeFiscaleClient: '',
    moveType: 'residential',
    pickupAddress: '',
    pickupFloors: '',
    pickupElevator: '',
    deliveryAddress: '',
    deliveryFloors: '',
    deliveryElevator: '',
    quoteDate: null,
    moveStartDate: null,
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Récupération des infos de contact
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoadingContact(true);
        const response = await axios.get('http://localhost:2000/company/api');
        if (response.data && response.data.length > 0) {
          setContactInfo(response.data[0]);
        } else {
          setContactError('Aucune information de contact trouvée');
        }
      } catch (err: any) {
        console.error('Erreur lors de la récupération des contacts:', err);
        setContactError('Impossible de charger les informations de contact');
      } finally {
        setLoadingContact(false);
      }
    };

    fetchContactInfo();
  }, []);

  const whatsappNumber = contactInfo?.phone?.replace('+', '') || '23267646';
  const emailAddress = contactInfo?.email || 'wahbisj@gmail.com';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date || null }));
  };

  const handleWhatsApp = () => {
    const message = `Bonjour, je souhaite demander un devis pour un déménagement.

*Informations personnelles*
Nom complet: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.phone}
Adresse client: ${formData.addressClient}
Matricule fiscale: ${formData.matriculeFiscaleClient}

*Adresse de départ*
Adresse: ${formData.pickupAddress}
Étages: ${formData.pickupFloors || 'Non précisé'}
Ascenseur: ${formData.pickupElevator === 'oui' ? 'Oui' : 'Non'}

*Adresse d'arrivée*
Adresse: ${formData.deliveryAddress}
Étages: ${formData.deliveryFloors || 'Non précisé'}
Ascenseur: ${formData.deliveryElevator === 'oui' ? 'Oui' : 'Non'}

*Détails du déménagement*
Type: ${formData.moveType === 'residential' ? 'Résidentiel' : 'Commercial'}
Date du devis: ${formData.quoteDate ? formData.quoteDate.toLocaleDateString() : 'Non précisée'}
Date du déménagement: ${formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : 'Non précisée'}

*Message complémentaire*
${formData.additionalInfo || 'Aucun message'}

Merci de me contacter rapidement.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Demande de devis - Déménagement - ${formData.firstName} ${formData.lastName}`;
    const body = `Bonjour,

Je souhaite demander un devis pour un déménagement.

**Informations personnelles**
- Nom complet: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Téléphone: ${formData.phone}
- Adresse client: ${formData.addressClient}
- Matricule fiscale: ${formData.matriculeFiscaleClient}

**Adresse de départ**
- Adresse: ${formData.pickupAddress}
- Étages: ${formData.pickupFloors || 'Non précisé'}
- Ascenseur: ${formData.pickupElevator === 'oui' ? 'Oui' : 'Non'}

**Adresse d'arrivée**
- Adresse: ${formData.deliveryAddress}
- Étages: ${formData.deliveryFloors || 'Non précisé'}
- Ascenseur: ${formData.deliveryElevator === 'oui' ? 'Oui' : 'Non'}

**Détails du déménagement**
- Type: ${formData.moveType === 'residential' ? 'Résidentiel' : 'Commercial'}
- Date du devis: ${formData.quoteDate ? formData.quoteDate.toLocaleDateString() : 'Non précisée'}
- Date du déménagement: ${formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : 'Non précisée'}

**Message complémentaire**
${formData.additionalInfo || 'Aucun message'}

Merci de me contacter rapidement.

Cordialement,
${formData.firstName} ${formData.lastName}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation des champs obligatoires
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.addressClient ||
      !formData.matriculeFiscaleClient ||
      !formData.pickupAddress ||
      !formData.deliveryAddress
    ) {
      const errorMsg = 'Veuillez remplir tous les champs obligatoires.';
      setError(errorMsg);
      onError?.(errorMsg);
      setLoading(false);
      return;
    }

    try {
      // Construction du payload exactement comme attendu par le backend
      const payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        moveType: formData.moveType,
        addressClient: formData.addressClient,
        matriculeFiscaleClient: formData.matriculeFiscaleClient,
        pickupAddress: formData.pickupAddress,
        pickupFloors: formData.pickupFloors ? Number(formData.pickupFloors) : null,
        pickupElevator: formData.pickupElevator,
        deliveryAddress: formData.deliveryAddress,
        deliveryFloors: formData.deliveryFloors ? Number(formData.deliveryFloors) : null,
        deliveryElevator: formData.deliveryElevator,
        additionalInfo: formData.additionalInfo,
      };

      if (formData.quoteDate) payload.quoteDate = formData.quoteDate;
      if (formData.moveStartDate) payload.moveStartDate = formData.moveStartDate;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/quote/api`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(true);
      onSuccess?.();

      setTimeout(() => {
        router.push("/merci");
      }, 2000);
    } catch (err: any) {
      console.error("Erreur détaillée :", err.response?.data);
      const errorMsg = err.response?.data?.message || "Une erreur est survenue lors de l'envoi du devis.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      addressClient: '',
      matriculeFiscaleClient: '',
      moveType: 'residential',
      pickupAddress: '',
      pickupFloors: '',
      pickupElevator: '',
      deliveryAddress: '',
      deliveryFloors: '',
      deliveryElevator: '',
      quoteDate: null,
      moveStartDate: null,
      additionalInfo: '',
    });
    setSuccess(false);
    setError('');
  };

  return (
    <div className={`${className}`}>
      {loadingContact && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Chargement...</span>
        </div>
      )}

      {contactError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{contactError}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Votre demande a été envoyée avec succès ! Redirection...
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Prénom *</label>
            <Input
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Nom *</label>
            <Input
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Email *</label>
          <Input
            type="email"
            name="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Téléphone *</label>
          <Input
            type="tel"
            name="phone"
            placeholder="+216 XX XXX XXX"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Adresse de l’entreprise cliente *</label>
          <Input
            name="addressClient"
            placeholder="Adresse complète"
            value={formData.addressClient}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Matricule fiscale *</label>
          <Input
            name="matriculeFiscaleClient"
            placeholder="Ex: 1857856Z/N/N/000"
            value={formData.matriculeFiscaleClient}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Type de déménagement *</label>
          <Select
            value={formData.moveType}
            onValueChange={(value) => handleSelectChange("moveType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Résidentiel</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Adresse de départ *
          </h4>
          <div className="space-y-3">
            <Input
              name="pickupAddress"
              placeholder="Adresse complète"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2">
              <Input
                type="number"
                name="pickupFloors"
                placeholder="Étages"
                value={formData.pickupFloors}
                onChange={handleInputChange}
                className="w-2/3"
                min="0"
              />
              <Select
                value={formData.pickupElevator}
                onValueChange={(value) => handleSelectChange("pickupElevator", value)}
              >
                <SelectTrigger className="w-1/3">
                  <SelectValue placeholder="Ascenseur ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oui">Oui</SelectItem>
                  <SelectItem value="non">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Adresse d'arrivée *
          </h4>
          <div className="space-y-3">
            <Input
              name="deliveryAddress"
              placeholder="Adresse complète"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2">
              <Input
                type="number"
                name="deliveryFloors"
                placeholder="Étages"
                value={formData.deliveryFloors}
                onChange={handleInputChange}
                className="w-2/3"
                min="0"
              />
              <Select
                value={formData.deliveryElevator}
                onValueChange={(value) => handleSelectChange("deliveryElevator", value)}
              >
                <SelectTrigger className="w-1/3">
                  <SelectValue placeholder="Ascenseur ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oui">Oui</SelectItem>
                  <SelectItem value="non">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-4">
          <div>
            <label className="text-sm mb-1 block">Date du devis</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.quoteDate ? formData.quoteDate.toLocaleDateString() : "Choisir"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.quoteDate || undefined}
                  onSelect={(date) => handleDateChange("quoteDate", date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-sm mb-1 block">Date du déménagement</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.moveStartDate ? formData.moveStartDate.toLocaleDateString() : "Choisir"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.moveStartDate || undefined}
                  onSelect={(date) => handleDateChange("moveStartDate", date)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <label className="text-sm mb-2 block">Détails complémentaires</label>
          <Textarea
            name="additionalInfo"
            placeholder="Informations supplémentaires (objets fragiles, contraintes particulières...)"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="space-y-3 pt-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi...</> : "Envoyer ma demande"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Ou contactez-nous</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> Devis par WhatsApp
          </Button>

          <Button
            type="button"
            onClick={handleEmail}
            className="w-full bg-secondary hover:bg-secondary/90"
          >
            <Mail className="w-4 h-4 mr-2" /> Devis par Email
          </Button>
        </div>

        {!loadingContact && contactInfo && (
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="w-4 h-4 text-primary" />
              <div>
                <p className="font-semibold">Téléphone</p>
                <p className="opacity-75">{contactInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Mail className="w-4 h-4 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="opacity-75">{contactInfo.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-secondary/10 border border-secondary rounded-lg">
          <p className="text-xs opacity-75">
            ✓ Réponse rapide garantie<br />
            ✓ Devis sans engagement<br />
            {contactInfo?.isAvailable24h && "✓ Disponible 24h/24, 7j/7"}
          </p>
        </div>
      </form>
    </div>
  );
}