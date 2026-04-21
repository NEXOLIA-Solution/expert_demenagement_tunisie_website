import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Heart, Users } from "lucide-react"
import AboutIntro from "@/components/AboutIntro"
import ValuesSection from "@/components/ValuesSection"
import TeamSection from "@/components/TeamSection"
import ContactCtaProfessionalEnhancedProps from "@/components/ContactCtaProfessionalEnhancedProps"
import { PremiumFooter } from "@/components/premium-footer"

export default function AboutPage() {


  return (
    <>
      <Navigation />
      <main>
        <AboutIntro/>

      

       

        {/* Team Section */}
        {/* <TeamSection/> */}

         {/* Values Section */}
        <ValuesSection />


        <ContactCtaProfessionalEnhancedProps/>
       
      </main>
    <PremiumFooter/>
    </>
  )
}
