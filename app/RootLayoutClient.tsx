"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import PageLoader from "@/components/PageLoader/PageLoader"
import FloatingContact from "@/components/FloatingContact/FloatingContact"
import { LanguageProvider } from "@/context/LanguageContext"



export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   const timer = setTimeout(() => setLoading(false), 100)
  //   return () => clearTimeout(timer)
  // }, [pathname])

  return (
    <LanguageProvider>
      <html lang="fr">
        <body className="font-sans antialiased">
          <PageLoader visible={loading} />
          <FloatingContact />

     
          {children}

        
        </body>
      </html>
    </LanguageProvider>
  )
}




































// "use client"

// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import { usePathname } from "next/navigation"
// import { useEffect, useState } from "react"

// import PageLoader from "@/components/PageLoader/PageLoader"
// import FloatingContact from "@/components/FloatingContact/FloatingContact"
// import { LanguageProvider } from "@/context/LanguageContext"

// // 🔥 TRACKING
// import CookieConsent from "@/components/tracking/CookieConsent"
// import SessionManager from "@/components/tracking/SessionManager"
// import PageTracker from "@/components/tracking/PageTracker"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname()
//   const [loading, setLoading] = useState(false)

//   // Page loader à chaque changement de route
//   useEffect(() => {
//     setLoading(true)
//     const timer = setTimeout(() => setLoading(false), 600)
//     return () => clearTimeout(timer)
//   }, [pathname])

//   return (
//     <LanguageProvider>
//       <html lang="fr">
//         <body className="font-sans antialiased">
//           {/* Loader + contact flottant */}
//           <PageLoader visible={loading} />
//           <FloatingContact />

//           {/* 🔐 RGPD + TRACKING */}
//           <CookieConsent />      {/* Affichage du consentement cookies */}
//           <SessionManager />     {/* Gestion complète des sessions frontend-backend */}
//           <PageTracker />        {/* Tracking des pages et durée de visite */}

//           {children}

//           {/* Analytics Vercel */}
//           <Analytics />
//         </body>
//       </html>
//     </LanguageProvider>
//   )
// }