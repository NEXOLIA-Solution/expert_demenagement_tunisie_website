"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setShow(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
    window.dispatchEvent(new Event("cookiesAccepted"));
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded">
      <p>Nous utilisons des cookies pour analyser le trafic.</p>
      <button onClick={acceptCookies} className="mt-2 bg-green-500 px-4 py-1">
        Accepter
      </button>
    </div>
  );
}