// app/services/demenagement-local/page.tsx
import { Navigation } from '@/components/navigation';
import { PremiumFooter } from '@/components/premium-footer';
import DemenagementLocalPage from '@/components/ServiceTextDocs/DemenagementLocalPage'; // ajuste le chemin selon où tu as placé ton composant
import { ResidentialServicePage } from '@/components/ServiceTextDocs/residential-service-page';

export const metadata = {
  title: 'Déménagement local à domicile | VotreEntreprise Tunisie',
  description: 'Service de déménagement local en Tunisie : professionnel, rapide et sécurisé. Devis gratuit, équipe expérimentée, intervention dans tout le pays.',
};

export default function Page() {
  return (<>
  <Navigation />
  
  <ResidentialServicePage />
  
      <PremiumFooter/>
  
  </>) 
}