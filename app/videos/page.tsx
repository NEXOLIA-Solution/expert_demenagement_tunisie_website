'use client';

import { useEffect, useState } from 'react';

export default function Videos() {
  const [visiteurInfo, setVisiteurInfo] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    async function collecterDonnees() {
      try {
        // 1. Récupération de l'adresse IP brute via ipify (Le service le plus stable et autorisé partout)
        const resIp = await fetch('https://api.ipify.org?format=json');
        if (!resIp.ok) throw new Error("Impossible de récupérer l'IP publique.");
        const dataIp = await resIp.json();
        const ipPublique = dataIp.ip;

        // 2. Récupération de la géolocalisation par IP en utilisant une API alternative très permissive
        // On passe directement l'IP dans l'URL pour éviter toute redirection DNS locale
        let donneesGeo = {};
        try {
          const resGeo = await fetch(`https://ipapi.co/${ipPublique}/json/`);
          if (resGeo.ok) {
            donneesGeo = await resGeo.json();
          }
        } catch (e) {
          console.warn("ipapi.co bloqué, tentative avec le service de secours...");
          // Service de secours mondial (sans clé, hautement tolérant)
          const resBackup = await fetch(`https://ip-api.io/api/json?ip=${ipPublique}`);
          if (resBackup.ok) {
            donneesGeo = await resBackup.json();
          }
        }

        // 3. Structurer les données récoltées
        let infosCompletes = {
          ip: ipPublique,
          pays: donneesGeo.country_name || donneesGeo.country,
          codePays: donneesGeo.country_code || donneesGeo.country_code,
          region: donneesGeo.region || donneesGeo.region_name,
          ville: donneesGeo.city,
          codePostal: donneesGeo.postal,
          fuseauHoraire: donneesGeo.timezone,
          navigateur: typeof navigator !== 'undefined' ? navigator.userAgent : 'Inconnu',
          langueNavigateur: typeof navigator !== 'undefined' ? navigator.language : 'Inconnu',
          dateAcces: new Date().toISOString(),
          precisionGps: "En attente d'autorisation...",
          latitude: donneesGeo.latitude || 36.8065, // Coordonnées approximatives par défaut
          longitude: donneesGeo.longitude || 10.1815
        };

        // 4. Demander la précision GPS absolue (Idéal pour cibler précisément Kalâat el-Andalous)
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              infosCompletes.latitude = position.coords.latitude;
              infosCompletes.longitude = position.coords.longitude;
              infosCompletes.precisionGps = `Précis à ${Math.round(position.coords.accuracy)} mètres (GPS réel)`;
              
              console.log("=== GEOLOCALISATION GPS ET IP REUSSIE ===");
              console.dir(infosCompletes);
              setVisiteurInfo({ ...infosCompletes });
            },
            (erreurGps) => {
              console.warn("GPS refusé. Utilisation des coordonnées réseau.", erreurGps.message);
              infosCompletes.precisionGps = "Refusé par l'utilisateur (Approximation réseau)";
              
              console.log("=== GEOLOCALISATION IP SEULEMENT ===");
              console.dir(infosCompletes);
              setVisiteurInfo(infosCompletes);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } else {
          infosCompletes.precisionGps = "GPS non supporté";
          setVisiteurInfo(infosCompletes);
        }

      } catch (err) {
        console.error("Erreur générale lors de la collecte :", err);
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    }

    collecterDonnees();
  }, []);

  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      <h1 style={{ color: '#1a1a1a', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>
        Analyse de Connexion Visiteur
      </h1>
      <p style={{ color: '#666' }}>
        Cette version utilise un double système de détection (IP brute + GPS) ultra-robuste contre les restrictions réseau.
      </p>

      {chargement && (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
          <p>⏳ Détection réseau et demande de précision GPS en cours...</p>
        </div>
      )}

      {erreur && (
        <div style={{ padding: '20px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '8px', border: '1px solid #feb2b2' }}>
          <p><strong>Erreur de chargement :</strong> {erreur}</p>
          <p style={{ fontSize: '13px', color: '#742a2a', marginTop: '10px' }}>
            Si vous utilisez un VPN ou un bloqueur de script agressif, désactivez-le temporairement pour le test local.
          </p>
        </div>
      )}

      {visiteurInfo && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ padding: '15px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '8px', marginBottom: '20px', border: '1px solid #c6f6d5' }}>
            ✔️ <strong>Succès :</strong> Votre adresse IP et vos données de navigation ont été détectées.
          </div>

          <h2 style={{ fontSize: '18px', color: '#2d3748' }}>Données récupérées :</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#4a5568' }}>Adresse IP réelle</td>
                <td style={{ padding: '10px 0', color: '#1a202c', textAlign: 'right', fontWeight: '600' }}>{visiteurInfo.ip}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#4a5568' }}>Pays détecté</td>
                <td style={{ padding: '10px 0', color: '#1a202c', textAlign: 'right' }}>{visiteurInfo.pays} ({visiteurInfo.codePays})</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#4a5568' }}>Région IP</td>
                <td style={{ padding: '10px 0', color: '#1a202c', textAlign: 'right' }}>{visiteurInfo.ville}, {visiteurInfo.region}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#4a5568' }}>Latitude, Longitude</td>
                <td style={{ padding: '10px 0', color: '#2b6cb0', textAlign: 'right', fontWeight: '500' }}>
                  {visiteurInfo.latitude ? visiteurInfo.latitude.toFixed(5) : 'N/A'}, {visiteurInfo.longitude ? visiteurInfo.longitude.toFixed(5) : 'N/A'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#4a5568' }}>Source / Statut GPS</td>
                <td style={{ padding: '10px 0', color: '#718096', textAlign: 'right', fontSize: '13px' }}>{visiteurInfo.precisionGps}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}