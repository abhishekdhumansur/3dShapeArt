'use client';

import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { promoCodes } from '../data/products';

export default function ChristmasPromo() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/20 via-christmas-green/20 to-christmas-red/20 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Gift size={48} className="text-christmas-red" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Holiday Special Offers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Use these exclusive promo codes to save big this Christmas season!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoCodes.map((promo, index) => (
            <motion.div
              key={promo.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-christmas-red/20 to-christmas-green/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Promo Badge */}
                <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {promo.type === 'percentage' 
                    ? `${promo.discount}% OFF` 
                    : `$${promo.discount} OFF`}
                </div>

                {/* Code Display */}
                <div className="glass-effect border-2 border-dashed border-purple-500 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text tracking-wider">
                      {promo.code}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(promo.code)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {copiedCode === promo.code ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-3">{promo.description}</p>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-400">
                  {promo.minAmount && promo.minAmount > 0 && (
                    <p>• Minimum order: ${promo.minAmount}</p>
                  )}
                  <p>• Valid until: {new Date(promo.expiryDate).toLocaleDateString()}</p>
                </div>

                {/* Apply Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 btn-primary"
                  onClick={() => copyToClipboard(promo.code)}
                >
                  {copiedCode === promo.code ? 'Copied!' : 'Copy Code'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center glass-effect rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4">⏰ Hurry! Offer Ends In:</h3>
          <div className="flex items-center justify-center gap-4">
            {[
              { value: '23', label: 'Days' },
              { value: '15', label: 'Hours' },
              { value: '42', label: 'Minutes' },
              { value: '08', label: 'Seconds' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 min-w-[80px]">
                  <span className="text-3xl font-bold">{item.value}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}