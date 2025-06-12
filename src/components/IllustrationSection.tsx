import React from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Laptop, User } from 'lucide-react'

interface IllustrationSectionProps {
  onCategorySelect: (category: 'phone' | 'laptop' | 'profile') => void
}

const IllustrationSection: React.FC<IllustrationSectionProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'phone' as const,
      title: 'Phone Illustrations',
      icon: Smartphone,
      description: 'Perfect wallpapers for your mobile device',
      bgColor: 'bg-manga-green',
      emoji: '📱'
    },
    {
      id: 'laptop' as const,
      title: 'Laptop Illustrations',
      icon: Laptop,
      description: 'Beautiful backgrounds for your desktop',
      bgColor: 'bg-manga-blue',
      emoji: '💻'
    },
    {
      id: 'profile' as const,
      title: 'Profile Illustrations',
      icon: User,
      description: 'Custom character portraits and avatars',
      bgColor: 'bg-manga-red',
      emoji: '🖼️'
    }
  ]

  return (
    <section id="illustration" className="min-h-screen bg-gradient-to-br from-manga-beige to-manga-yellow/30 py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 halftone-bg"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-manga font-bold text-5xl text-manga-text mb-4">
              Illustration Gallery
            </h2>
            <div className="speech-bubble inline-block">
              <p className="font-zen text-lg text-manga-text">
                Choose your favorite category!
              </p>
            </div>
          </motion.div>

          {/* Category Panels */}
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  className="manga-panel bg-white/95 backdrop-blur-sm rounded-2xl p-8 cursor-pointer group"
                  initial={{ 
                    x: index === 0 ? -100 : index === 2 ? 100 : 0,
                    y: index === 1 ? -100 : 0,
                    opacity: 0,
                    rotate: -5
                  }}
                  whileInView={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 2,
                    boxShadow: "12px 12px 0px rgba(28, 28, 28, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCategorySelect(category.id)}
                  viewport={{ once: true }}
                >
                  {/* Category Icon Panel */}
                  <motion.div
                    className={`${category.bgColor} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 manga-panel`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-4xl">{category.emoji}</span>
                  </motion.div>

                  {/* Category Info */}
                  <div className="text-center space-y-4">
                    <h3 className="font-manga font-bold text-2xl text-manga-text">
                      {category.title}
                    </h3>
                    
                    <p className="font-zen text-manga-text/80">
                      {category.description}
                    </p>

                    {/* Hover Button */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="speech-bubble inline-block bg-manga-text text-white">
                        <span className="font-zen font-medium">
                          View Gallery
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Floating Decorations */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default IllustrationSection