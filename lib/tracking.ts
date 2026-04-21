// import { v4 as uuidv4 } from "uuid"

// export function getVisitorId() {
//   let id = localStorage.getItem("visitor_id")
//   if (!id) {
//     id = uuidv4()
//     localStorage.setItem("visitor_id", id)
//   }
//   return id
// }

// export function startSession() {
//   const sessionId = crypto.randomUUID()
//   localStorage.setItem("session_id", sessionId)
//   localStorage.setItem("session_start", new Date().toISOString())
//   localStorage.setItem("page_views", JSON.stringify([]))
//   return sessionId
// }

// // ⚡ Nouvelle fonction pour tracker la dernière page visitée
// export function trackCurrentPage() {
//   const pageViews = JSON.parse(localStorage.getItem("page_views") || "[]")
//   const lastPage = pageViews[pageViews.length - 1]
//   if (lastPage) {
//     const now = new Date().getTime()
//     lastPage.duration = now - new Date(lastPage.enteredAt).getTime()
//     localStorage.setItem("page_views", JSON.stringify(pageViews))
//   }
// }

// // Optionnel : fonction pour enregistrer chaque page visitée
// export function trackPageVisit(pathname:any) {
//   const pageViews = JSON.parse(localStorage.getItem("page_views") || "[]")
//   const now = new Date().toISOString()
//   pageViews.push({
//     page: pathname,
//     enteredAt: now,
//     duration: 0, // sera mis à jour par trackCurrentPage
//   })
//   localStorage.setItem("page_views", JSON.stringify(pageViews))
// }
































// "use client"
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";

// const API_BASE = "http://localhost:2000/visitorAnalytics/api";

// // Récupère ou crée un visitor_id
// export function getVisitorId() {
//   let id = localStorage.getItem("visitor_id");
//   if (!id) {
//     id = uuidv4();
//     localStorage.setItem("visitor_id", id);
//   }
//   return id;
// }

// // Démarre une nouvelle session
// export function startSession() {
//   const sessionId = crypto.randomUUID();
//   const now = new Date().toISOString();
//   localStorage.setItem("session_id", sessionId);
//   localStorage.setItem("session_start", now);
//   localStorage.setItem("page_views", JSON.stringify([]));

//   // Envoi au backend
//   const visitorId = getVisitorId();
//   createBackendSession(visitorId, sessionId, now);

//   return sessionId;
// }

// // ⚡ Met à jour la durée de la dernière page visitée
// export function trackCurrentPage() {
//   const pageViews = JSON.parse(localStorage.getItem("page_views") || "[]");
//   if (pageViews.length === 0) return;

//   const lastPage = pageViews[pageViews.length - 1];
//   const now = new Date().getTime();
//   lastPage.duration = now - new Date(lastPage.enteredAt).getTime();

//   localStorage.setItem("page_views", JSON.stringify(pageViews));

//   // ⚡ Met à jour le backend pour la dernière page
//   const visitorId = localStorage.getItem("visitor_id")!;
//   const sessionId = localStorage.getItem("session_id")!;
//   addPageBackend(visitorId, sessionId, lastPage.page, lastPage.enteredAt, lastPage.duration);
// }

// // Tracker chaque page visitée
// export function trackPageVisit(pathname: string) {
//   // ⚡ Met à jour la durée de la page précédente avant d’enregistrer la nouvelle
//   trackCurrentPage();

//   const pageViews = JSON.parse(localStorage.getItem("page_views") || "[]");
//   const now = new Date().toISOString();
//   const page = { page: pathname, enteredAt: now, duration: 0 };
//   pageViews.push(page);
//   localStorage.setItem("page_views", JSON.stringify(pageViews));

//   // ⚡ Envoi de la nouvelle page au backend (duration = 0 pour l’instant)
//   const visitorId = getVisitorId();
//   const sessionId = localStorage.getItem("session_id")!;
//   addPageBackend(visitorId, sessionId, page.page, page.enteredAt, page.duration);
// }

// // 🔴 Fin de session
// export function endSession() {
//   // ⚡ Met à jour la durée de la dernière page
//   trackCurrentPage();

//   const visitorId = localStorage.getItem("visitor_id")!;
//   const sessionId = localStorage.getItem("session_id")!;
//   const sessionEnd = new Date().toISOString();
//   localStorage.setItem("session_end", sessionEnd);

//   // Historique local (optionnel)
//   const history = JSON.parse(localStorage.getItem("sessions_history") || "[]");
//   history.push({
//     visitor_id: visitorId,
//     session_id: sessionId,
//     session_start: localStorage.getItem("session_start"),
//     session_end: sessionEnd,
//     page_views: JSON.parse(localStorage.getItem("page_views") || "[]"),
//   });
//   localStorage.setItem("sessions_history", JSON.stringify(history));

//   // Envoi au backend
//   endBackendSession(visitorId, sessionId, sessionEnd);
// }

// // ------------------- BACKEND API -------------------

// // Création session backend
// async function createBackendSession(visitorId: string, sessionId: string, sessionStart: string) {
//   try {
//     await axios.post(`${API_BASE}/sessions`, {
//       visitor_id: visitorId,
//       session_id: sessionId,
//       session_start: sessionStart,
//     });
//     console.log("✅ Session créée côté backend");
//   } catch (err) {
//     console.error("❌ Erreur création session backend :", err);
//   }
// }

// // Ajout page visitée backend
// async function addPageBackend(visitorId: string, sessionId: string, page: string, enteredAt: string, duration: number) {
//   try {
//     await axios.post(`${API_BASE}/sessions/page`, {
//       visitor_id: visitorId,
//       session_id: sessionId,
//       page,
//       enteredAt,
//       duration,
//     });
//     console.log("✅ Page envoyée au backend :", page, "durée:", duration);
//   } catch (err) {
//     console.error("❌ Erreur ajout page :", err);
//   }
// }

// // Clôture session backend
// async function endBackendSession(visitorId: string, sessionId: string, sessionEnd: string) {
//   try {
//     await axios.put(`${API_BASE}/sessions/end`, {
//       visitor_id: visitorId,
//       session_id: sessionId,
//       session_end: sessionEnd,
//     });
//     console.log("✅ Session clôturée côté backend");
//   } catch (err) {
//     console.error("❌ Erreur clôture session :", err);
//   }
// }











































"use client"
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE

// 1️⃣ Récupère ou crée un visitor_id
export function getVisitorId() {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
        id = uuidv4();
        localStorage.setItem("visitor_id", id);
    }
    return id;
}

// 2️⃣ Démarre une nouvelle session
export async function startSession() {
    const sessionId = crypto.randomUUID();
    const sessionStart = new Date().toISOString();
    //   localStorage.setItem("session_id", sessionId);
    //   localStorage.setItem("session_start", sessionStart);
    sessionStorage.setItem("session_id", sessionId)
    sessionStorage.setItem("session_start", sessionStart)
    localStorage.removeItem("page_views") // 🔥 reset pages
    localStorage.setItem("page_views", JSON.stringify([]));
    localStorage.removeItem("session_end");

    const visitorId = getVisitorId();
    // createBackendSession(visitorId, sessionId, sessionStart);

      // ⚡ On attend la création de session côté backend
    await createBackendSession(visitorId, sessionId, sessionStart);

    return sessionId;
}

// 3️⃣ Met à jour la durée de la dernière page visitée
export function trackCurrentPage() {
    const pageViews = JSON.parse(localStorage.getItem("page_views") || "[]");
    if (pageViews.length === 0) return;

    const lastPage = pageViews[pageViews.length - 1];
    const now = Date.now();
    lastPage.duration = now - new Date(lastPage.enteredAt).getTime();

    localStorage.setItem("page_views", JSON.stringify(pageViews));

    // Envoie la page avec la durée correcte
    const visitorId = getVisitorId();
    const sessionId = sessionStorage.getItem("session_id")!;
    addPageBackend(visitorId, sessionId, lastPage.page, lastPage.enteredAt, lastPage.duration);
}











// 4️⃣ Tracker une page visitée
export async function trackPageVisit(pathname: string) {
    const pageViews = JSON.parse(localStorage.getItem("page_views") || "[]");

    const lastPage = pageViews[pageViews.length - 1];

    // 🚫 Éviter les doublons immédiats (ex: "/" → "/")
    if (lastPage?.page === pathname) return;

    // ⚡ Mettre à jour la durée de la page précédente
    trackCurrentPage();

    const enteredAt = new Date().toISOString();

    const page = {
        page: pathname,
        enteredAt,
        duration: 0
    };

    pageViews.push(page);
    
    localStorage.setItem("page_views", JSON.stringify(pageViews));

    // 📡 Envoi initial au backend (duration = 0)
    const visitorId = getVisitorId();
    const sessionId = sessionStorage.getItem("session_id");

    if (!sessionId) return; // sécurité
    addPageBackend(
        visitorId,
        sessionId,
        page.page,
        page.enteredAt,
        page.duration
    );
}











// 5️⃣ Fin de session
export function endSession() {
    trackCurrentPage(); // ⚡ Met à jour la durée de la dernière page

    const visitorId = getVisitorId();
    const sessionId = sessionStorage.getItem("session_id")!;
    const sessionEnd = new Date().toISOString();
    localStorage.setItem("session_end", sessionEnd);

    // Historique local
    const history = JSON.parse(localStorage.getItem("sessions_history") || "[]");
    history.push({
        visitor_id: visitorId,
        session_id: sessionId,
        session_start: localStorage.getItem("session_start"),
        session_end: sessionEnd,
        page_views: JSON.parse(localStorage.getItem("page_views") || "[]"),
    });
    localStorage.setItem("sessions_history", JSON.stringify(history));

    // Envoi au backend
    endBackendSession(visitorId, sessionId, sessionEnd);
}

// ------------------- BACKEND API -------------------

// Création session backend
async function createBackendSession(visitorId: string, sessionId: string, sessionStart: string) {
    try {
        await axios.post(`${API_BASE}/visitorAnalytics/api/sessions`, {
            visitor_id: visitorId,
            session_id: sessionId,
            session_start: sessionStart,
        });
        console.log("✅ Session créée côté backend");
    } catch (err) {
        console.error("❌ Erreur création session backend :", err);
    }
}







// Ajouter page visitée
async function addPageBackend(
    visitorId: string,
    sessionId: string,
    page: string,
    enteredAt: string,
    duration: number
) {
    try {
        await axios.post(
            `${API_BASE}/visitorAnalytics/api/sessions/page`,
            {
                visitor_id: visitorId,
                session_id: sessionId,
                page,
                enteredAt,
                duration,
            }
        )

        console.log("✅ Page envoyée au backend :", page, "duration:", duration)
    } catch (err: any) {
        // 🔇 Ignore les 404 (backend pas encore prêt / route pas dispo au chargement)
        if (err.response?.status !== 404) {
            console.error("❌ Erreur ajout page :", err.message)
        }
    }
}









// Clôture session backend
async function endBackendSession(visitorId: string, sessionId: string, sessionEnd: string) {
    try {
        await axios.put(`${API_BASE}/visitorAnalytics/api/sessions/end`, {
            visitor_id: visitorId,
            session_id: sessionId,
            session_end: sessionEnd,
        });
        console.log("✅ Session clôturée côté backend");
    } catch (err) {
        console.error("❌ Erreur clôture session :", err);
    }
}

// ⚡ Gestion automatique à l'arrivée et au départ de l'utilisateur
export async function initTracking() {
    const consent = localStorage.getItem("cookie_consent")
    if (consent !== "accepted") return

    let sessionId: string | null = sessionStorage.getItem("session_id")
    const sessionEnd = localStorage.getItem("session_end")

    if (!sessionId || sessionEnd) {
        sessionId = await startSession()

        // ✅ AJOUT IMMÉDIAT DE LA PAGE COURANTE
        trackPageVisit(window.location.pathname)
    }

    window.addEventListener("beforeunload", () => {
        endSession()
    })
}