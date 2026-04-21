"use client"

import { useState } from "react"
import { Phone, Mail, MessageCircle, Sun, Moon, Globe } from "lucide-react"
import styles from "./FloatingContact.module.css"
import { useLanguage } from "@/context/LanguageContext"

export default function FloatingContact() {
  const { language, setLanguage, messages } = useLanguage()
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : language === "en" ? "ar" : "fr")
  }

  return (
    <div className={styles.floatingContactContainer}>







      <div className={styles.phoneIcon}>
        <Phone size={24} />
      </div>

      <div className={styles.contactPanel}>

        <li className={styles.quickControls}>
          <p className={styles.contactTitle}>{messages.controleRapide}</p>

          <div className={styles.controlIcon} onClick={toggleDarkMode}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <div className={styles.controlIcon} onClick={toggleLanguage}>
            <Globe size={20} />
            <span className={styles.langLabel}>{language.toUpperCase()}</span>
          </div>
        </li>



        <p className={styles.contactTitle}>{messages.contactTitle}</p>
        <ul className={styles.contactList}>

          <li>
            <Phone className={styles.icon} />
            <span>{messages.phone}</span>
          </li>
          <li>
            <Mail className={styles.icon} />
            <span>{messages.email}</span>
          </li>
          <li>
            <MessageCircle className={styles.icon} />
            <span>{messages.whatsapp}</span>
          </li>


        </ul>


      </div>
    </div>
  )
}
