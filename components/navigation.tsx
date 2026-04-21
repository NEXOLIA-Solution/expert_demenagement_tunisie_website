"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Truck,FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import logoAla from "@/public/logoSite/logo1-removebg-preview.png"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/a-propos", label: "À propos" },
    { href: "/galerie", label: "Galerie" },
    { href: "/actualites", label: "Actualités" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoAla}
              alt="Logo DéménagePro"
              width={90}
              height={30}
              className="object-contain"
              priority
            />
        
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild>

              <Link href="/devis">
              <FileText className="h-5 w-5" />
              Demander un devis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full">
              <Link href="/devis" onClick={() => setIsOpen(false)}>
              <FileText className="h-5 w-5" />
                Demander un devis
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
