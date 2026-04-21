'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Home, Clock, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ThankYouQuotePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl text-center"
      >

        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Merci pour votre confiance !
        </motion.h1>

      

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg mb-6"
        >
          Votre demande de devis a bien été reçue.  
          Notre équipe analyse actuellement votre demande et vous répondra
          dans les plus brefs délais.
        </motion.p>


          {/* Green Informational Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-green-600 text-lg mb-6"
        >
          Vous recevrez notre réponse sur WhatsApp ou par email.  
          Pour plus d’informations sur votre besoin ou un devis gratuit sur place, contactez-nous !
        </motion.p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl border bg-gray-50 flex flex-col items-center gap-3"
          >
            <Clock className="text-blue-500 w-12 h-12" />
            <span className="text-gray-700 font-medium text-center">
              Réponse rapide
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl border bg-gray-50 flex flex-col items-center gap-3"
          >
            <Mail className="text-purple-500 w-12 h-12" />
            <span className="text-gray-700 font-medium text-center">
              Réponse par email
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl border bg-gray-50 flex flex-col items-center gap-3"
          >
            <MessageCircle className="text-green-500 w-12 h-12" />
            <span className="text-gray-700 font-medium text-center">
              Réponse par WhatsApp
            </span>
          </motion.div>

        </div>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Button className="flex items-center gap-2">
              <Home size={18} />
              Retour à l'accueil
            </Button>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}