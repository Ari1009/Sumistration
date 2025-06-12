import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Github, Palette } from 'lucide-react'

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#', color: 'bg-manga-red' },
    { icon: Github, label: 'GitHub', href: '#', color: 'bg-manga-text' },
    { icon: Palette, label: 'ArtStation', href: '#', color: 'bg-manga-purple' }
  ]

  return (
    <footer className="bg-manga-dark py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 halftone-bg opacity-20"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="manga-panel bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto text-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <motion.h2
            className="font-manga font-bold text-3xl text-manga-text mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
          >
            マンガクラブ
          </motion.h2>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center text-white manga-panel group`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    bounce: 0.6
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360
                  }}
                  viewport={{ once: true }}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </div>

          {/* Speech Bubble Message */}
          <motion.div
            className="speech-bubble inline-block mb-6"
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-zen text-manga-text">
              Thank you for visiting my manga world! ✨
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="font-zen text-manga-text/80 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
          >
            Made with ❤️ by Manga Artist • © 2024 All rights reserved
          </motion.p>

          {/* Floating Decorations */}
          <motion.div
            className="absolute -top-4 -left-4 text-2xl"
            animate={{ rotate: 360, y: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            🎨
          </motion.div>
          
          <motion.div
            className="absolute -top-4 -right-4 text-2xl"
            animate={{ rotate: -360, y: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer