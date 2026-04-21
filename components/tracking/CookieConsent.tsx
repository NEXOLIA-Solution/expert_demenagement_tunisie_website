"use client"
import { useEffect, useState } from "react"

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) setShow(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setShow(false)
    window.dispatchEvent(new Event("cookiesAccepted"))
  }

  if (!show) return null

  return (
    <div
      className="
        fixed bottom-6 left-6 z-50
        max-w-sm
        bg-white/90 backdrop-blur
        text-gray-800
        p-5 rounded-2xl shadow-2xl
        animate-slideUp
      "
    >
      <div className="flex items-start gap-4">
        {/* Cookie Icon */}
        <div className="text-4xl animate-bounceSlow">🍪</div>

        <div>
          <h3 className="font-semibold text-lg mb-1">
            Cookies & confidentialité
          </h3>
          <p className="text-sm text-gray-600">
            Nous utilisons des cookies pour analyser le trafic et améliorer
            votre expérience.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={acceptCookies}
              className="
                bg-green-600 text-white
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-300
                hover:bg-green-700 hover:scale-105
                active:scale-95
                shadow-md
              "
            >
              Accepter
            </button>

            <button
              onClick={() => setShow(false)}
              className="
                text-sm text-gray-500
                hover:text-gray-800
                transition-colors
              "
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}