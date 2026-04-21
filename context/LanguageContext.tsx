"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import frMessages from "@/locales/fr.json"
import enMessages from "@/locales/en.json"
import arMessages from "@/locales/ar.json"

type Lang = "fr" | "en" | "ar"

interface LanguageContextProps {
  language: Lang
  messages: Record<string, string>
  setLanguage: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "fr",
  messages: frMessages,
  setLanguage: () => {},
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Lang>("fr")

  const messages = language === "fr" ? frMessages : language === "en" ? enMessages : arMessages

  return (
    <LanguageContext.Provider value={{ language, messages, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook pratique
export const useLanguage = () => useContext(LanguageContext)
