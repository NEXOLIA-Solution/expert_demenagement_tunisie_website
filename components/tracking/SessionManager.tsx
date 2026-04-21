// "use client"
// import { useEffect } from "react"
// import { getVisitorId, startSession } from "../../lib/tracking"

// export default function SessionManager() {

//   // 🟡 1. Vérification au chargement (nouvelle visite)
//   useEffect(() => {
//     const consent = localStorage.getItem("cookie_consent")
//     const sessionId = localStorage.getItem("session_id")
//     const sessionEnd = localStorage.getItem("session_end")

//     // 🔁 Nouvelle visite → nouvelle session
//     if (consent === "accepted" && (!sessionId || sessionEnd)) {
//       const visitorId = getVisitorId()
//       const newSessionId = startSession()

//       localStorage.removeItem("session_end")

//       console.log("🆕 Nouvelle session créée :", {
//         visitorId,
//         newSessionId,
//       })
//     }
//   }, [])

//   // 🟢 2. Gestion acceptation cookies + fermeture session
//   useEffect(() => {
//     const onAccept = () => {
//       const visitorId = getVisitorId()
//       const sessionId = startSession()

//       console.log("🟢 Session démarrée :", {
//         visitorId,
//         sessionId,
//         session_start: localStorage.getItem("session_start"),
//       })
//     }

//     const onBeforeUnload = () => {
//       const sessionId = localStorage.getItem("session_id")
//       if (!sessionId) return

//       const sessionEnd = new Date().toISOString()
//       localStorage.setItem("session_end", sessionEnd)

//       console.log("🔴 Session terminée :", {
//         visitorId: localStorage.getItem("visitor_id"),
//         sessionId,
//         session_start: localStorage.getItem("session_start"),
//         session_end: sessionEnd,
//         pages: JSON.parse(localStorage.getItem("page_views") || "[]"),
//       })
//     }

//     window.addEventListener("cookiesAccepted", onAccept)
//     window.addEventListener("beforeunload", onBeforeUnload)

//     return () => {
//       window.removeEventListener("cookiesAccepted", onAccept)
//       window.removeEventListener("beforeunload", onBeforeUnload)
//     }
//   }, [])

//   return null
// }



























"use client"
import { useEffect, useRef } from "react"
import { getVisitorId, startSession, trackCurrentPage, trackPageVisit } from "../../lib/tracking"
import { usePathname } from "next/navigation"

export default function SessionManager() {
    const pathname = usePathname()
    const initialized = useRef(false)

    // 🚀 Initialisation UNIQUE
    // ✅ Démarrage dès acceptation cookies
    useEffect(() => {
        const startIfAccepted = () => {
            if (initialized.current) return

            const consent = localStorage.getItem("cookie_consent")
            if (consent !== "accepted") return

            startSession()
            trackPageVisit(window.location.pathname)

            initialized.current = true
        }

        // 🔥 Cas 1 : cookies déjà acceptés
        startIfAccepted()

        // 🔥 Cas 2 : clic sur "Accepter"
        window.addEventListener("cookiesAccepted", startIfAccepted)

        return () => {
            window.removeEventListener("cookiesAccepted", startIfAccepted)
        }
    }, [])

    // 🔁 Changement de page
    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent")
        if (consent === "accepted" && initialized.current) {
            trackPageVisit(pathname)
        }
    }, [pathname])

    // 🔚 Fermeture navigateur
    useEffect(() => {
        const onBeforeUnload = () => {
            trackCurrentPage()
        }

        window.addEventListener("beforeunload", onBeforeUnload)
        return () => window.removeEventListener("beforeunload", onBeforeUnload)
    }, [])

    return null
}









































// "use client"
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { getVisitorId, startSession, trackPageVisit, trackCurrentPage, endSession } from "../../lib/tracking";

// export default function SessionManager() {
//   const pathname = usePathname();

//   // Tracker chaque page visitée
//   useEffect(() => {
//     const consent = localStorage.getItem("cookie_consent");
//     if (consent === "accepted") {
//       trackPageVisit(pathname);
//     }
//   }, [pathname]);

//   // Créer session si nécessaire
//   useEffect(() => {
//     const consent = localStorage.getItem("cookie_consent");
//     const sessionId = localStorage.getItem("session_id");
//     const sessionEnd = localStorage.getItem("session_end");

//     if (consent === "accepted" && (!sessionId || sessionEnd)) {
//       const visitorId = getVisitorId();
//       const newSessionId = startSession();
//       localStorage.removeItem("session_end");

//       console.log("🆕 Nouvelle session créée :", {
//         visitorId,
//         session_id: newSessionId,
//         session_start: localStorage.getItem("session_start"),
//       });
//     }
//   }, []);

//   // Gestion fin de session avant fermeture
//   useEffect(() => {
//     const onBeforeUnload = () => {
//       const sessionId = localStorage.getItem("session_id");
//       if (!sessionId) return;
//       endSession();
//     };

//     window.addEventListener("beforeunload", onBeforeUnload);
//     return () => window.removeEventListener("beforeunload", onBeforeUnload);
//   }, []);

//   return null;
// }