"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"

interface TeamMember {
  name: string
  role: string
  image: string
  socials?: { icon: React.ReactNode; link: string }[]
}

export default function TeamSection() {
  const members: TeamMember[] = [
    {
      name: "Rachel Cavali",
      role: "Marketing Manager",
      image: "https://i.ibb.co/mCLFxMKm/2151100227.jpg",
      socials: [
        { icon: <FaFacebookF />, link: "https://facebook.com" },
        { icon: <FaInstagram />, link: "https://instagram.com" },
        { icon: <FaWhatsapp />, link: "https://wa.me/123456789" },
      ],
    },
    {
      name: "Kevin Martin",
      role: "Web Developer",
      image: "https://i.ibb.co/Y4qMKc1Y/2151100279.jpg",
      socials: [
        { icon: <FaFacebookF />, link: "https://facebook.com" },
        { icon: <FaInstagram />, link: "https://instagram.com" },
        { icon: <FaWhatsapp />, link: "https://wa.me/123456789" },
      ],
    },
    {
      name: "Cameron White",
      role: "Graphic Designer",
      image: "https://i.ibb.co/v4PZJKYn/2151100223.jpg",
      socials: [
        { icon: <FaFacebookF />, link: "https://facebook.com" },
        { icon: <FaInstagram />, link: "https://instagram.com" },
        { icon: <FaWhatsapp />, link: "https://wa.me/123456789" },
      ],
    },
  ]

  const stats = [
    { number: "25+", label: "Employés" },
    { number: "100%", label: "Formés" },
    { number: "15+", label: "Ans d'expérience moyenne" },
    { number: "24/7", label: "Disponibilité" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white/0 via-white/5 to-white/0">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre équipe</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des professionnels passionnés à votre service
          </p>
        </div>

        {/* Description + Stats */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-muted-foreground leading-relaxed mb-8">
            Notre équipe est composée de déménageurs expérimentés, formés aux meilleures pratiques du métier. Chaque
            membre est sélectionné pour son professionnalisme, sa fiabilité et son engagement à offrir un service de
            qualité exceptionnelle. Nous investissons continuellement dans la formation de notre personnel pour
            garantir votre satisfaction.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <motion.div
                className="info-box mt-[-60px] relative bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                <span className="text-gray-500 mb-3 block">{member.role}</span>

                {/* Social Icons */}
                <div className="flex justify-center space-x-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.socials?.map((social, i) => (
                    <a
                      key={i}
                      href={social.link}
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
