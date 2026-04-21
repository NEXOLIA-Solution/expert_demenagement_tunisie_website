"use client" // 🔑 Important : tout ce fichier doit être côté client

import { motion } from "framer-motion"
import { HelpCircle, FileText, Eye, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FAQ {
  question: string
  answer: string
}

interface DocumentItem {
  title: string
  type: string
  file: string
}

interface Props {
  faqs: FAQ[]
  documents: DocumentItem[]
}

export default function FAQDocuments({ faqs, documents }: Props) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background">

      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-[380px] h-[380px] bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            Centre d’aide
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            FAQ & Documents essentiels
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mt-5">
            Toutes les réponses à vos questions et les documents nécessaires pour un déménagement sans stress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* FAQ – LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6 max-h-[580px] overflow-y-auto pr-3">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  className="group bg-background/80 backdrop-blur-xl rounded-3xl border border-border shadow-md hover:shadow-xl transition-all"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-7 font-semibold text-lg">
                    <span>{faq.question}</span>
                    <ChevronDown className="text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-7 pb-7">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>

          {/* Documents – RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-28 h-fit"
          >
            <div className="bg-background/80 backdrop-blur-xl rounded-3xl border border-border p-9 shadow-lg">

              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <FileText className="text-primary w-6 h-6" />
                Documents utiles
              </h3>

              <div className="space-y-5">
                {documents.map((doc, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-background hover:bg-muted/40 transition-all"
                  >
                    <div>
                      <p className="font-semibold">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.type}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" asChild>
                        <a href={doc.file} target="_blank">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="icon" asChild>
                        <a href={doc.file} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
