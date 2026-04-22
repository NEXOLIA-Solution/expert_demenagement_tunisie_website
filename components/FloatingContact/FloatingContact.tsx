"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MessageCircle, Sun, Moon } from "lucide-react"
import styles from "./FloatingContact.module.css"
import { useLanguage } from "@/context/LanguageContext"

interface ContactData {
  phone: string
  email: string
  whatsapp?: string
}

export default function FloatingContact() {
  const { language, setLanguage, messages } = useLanguage()
  const [isDark, setIsDark] = useState(false)
  const [contact, setContact] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          "https://expert-demenagement-tunisie-backend.onrender.com/company/api"
        )

        if (!response.ok) throw new Error("Erreur réseau")

        const data = await response.json()

        if (data && data.length > 0) {
          const company = data[0]

          setContact({
            phone: company.phone || "",
            email: company.email || "",
            whatsapp: company.whatsapp || company.phone || "",
          })
        }
      } catch (error) {
        console.error("Erreur lors du chargement des contacts :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContact()
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const formatWhatsapp = (number: string) => {
    return number.replace(/\D/g, "")
  }

  if (loading) {
    return (
      <div className={styles.floatingContactContainer}>
        <div className={styles.phoneIcon}>
          <Phone size={24} />
        </div>
        <div className={styles.contactPanel}>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.floatingContactContainer}>
      <div className={styles.phoneIcon}>
        <Phone size={24} />
      </div>

      <div className={styles.contactPanel}>
        {/* Controls */}
        <li className={styles.quickControls}>
          <p className={styles.contactTitle}>
            {messages?.controleRapide || "Contrôle"}
          </p>

          <div className={styles.controlIcon} onClick={toggleDarkMode}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </li>

        <p className={styles.contactTitle}>
          {messages?.contactTitle || "Contact"}
        </p>

        <ul className={styles.contactList}>
          {/* 📞 PHONE */}
          <li className={styles.contactItem}>
            <p className={styles.label}>Téléphone</p>
            <Phone className={styles.icon} />
            <a href={`tel:${contact?.phone}`} className={styles.link}>
              {contact?.phone || "N/A"}
            </a>
          </li>

          {/* 📧 EMAIL */}
          <li className={styles.contactItem}>
            <p className={styles.label}>Email</p>
            <Mail className={styles.icon} />
            <a href={`mailto:${contact?.email}`} className={styles.link}>
              {contact?.email || "N/A"}
            </a>
          </li>

          {/* 💬 WHATSAPP */}
          <li className={styles.contactItem}>
            <p className={styles.label}>WhatsApp</p>
            <MessageCircle className={styles.icon} />
            <a
              href={`https://wa.me/${formatWhatsapp(contact?.whatsapp || "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {contact?.whatsapp || "N/A"}
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}