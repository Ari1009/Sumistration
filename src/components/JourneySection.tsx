import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Tablet, Coffee, Sparkles, Pen, Monitor, Heart, Book, PenTool, Users, Layout } from 'lucide-react'

const JourneySection: React.FC = () => {
  const journeySteps = [
    {
      title: "The Beginning",
      description: "Started doodling as a kid!",
      icon: Pen,
      bgColor: "bg-gradient-to-br from-manga-blue/30 to-manga-blue/10",
      emoji: "🎨"
    },
    {
      title: "The Growth", 
      description: "Stared sketching and learned anatomy",
      icon: Tablet,
      bgColor: "bg-gradient-to-br from-manga-purple/30 to-manga-purple/10",
      emoji: "💻"
    },
    {
      title: "The Present",
      description: "Now fan of stylized and digital art!",
      icon: Sparkles,
      bgColor: "bg-gradient-to-br from-manga-green/30 to-manga-green/10",
      emoji: "✨"
    }
  ]

  const tools = [
    { name: "Digital Drawing", icon: Palette, color: "bg-manga-red" },
    { name: "Manga Style", icon: Heart, color: "bg-manga-purple" },
    { name: "Coffee Fuel", icon: Coffee, color: "bg-manga-yellow" },
    { name: "Sketch book", icon: Book, color: "bg-manga-green" },
    { name: "Creative Vision", icon: Monitor, color: "bg-manga-blue" },
    { name: "Inking Mastery", icon: PenTool, color: "bg-manga-green" },
    { name: "Character Design", icon: Users, color: "bg-manga-purple" },
    { name: "Panel Layouts", icon: Layout, color: "bg-manga-red" }
  ]

  return (
    <section id="about" className="min-h-screen bg-manga-beige py-20 relative overflow-hidden">
      <div className="absolute inset-0 halftone-bg"></div>

      <motion.div
        className="absolute top-20 left-10 text-3xl"
        animate={{ rotate: [0, 360], y: [-10, 10, -10], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >🌟</motion.div>

      <motion.div
        className="absolute top-40 right-20 text-2xl"
        animate={{ rotate: [360, 0], y: [10, -10, 10], x: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >✏️</motion.div>

      <motion.div
        className="absolute bottom-40 left-20 text-2xl"
        animate={{ rotate: [0, -360], scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >💫</motion.div>

      <div className="container mx-auto px-4">
        <motion.div className="max-w-7xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
          
          <motion.div className="text-center mb-16" initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="font-manga font-bold text-5xl text-manga-text mb-6">My Journey</h2>
            <div className="speech-bubble inline-block">
              <p className="font-zen text-lg text-manga-text">From scribbles to somewhat illustraions</p>
            </div>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-8 mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className={`manga-panel ${step.bgColor} rounded-2xl p-8 relative overflow-hidden`}
                  initial={{ x: index === 0 ? -100 : index === 2 ? 100 : 0, y: index === 1 ? -100 : 0, opacity: 0, rotate: -10 }}
                  whileInView={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.05, rotate: 2, y: -10 }}
                  viewport={{ once: true }}
                >
                  <motion.div className="absolute top-4 right-4 text-6xl opacity-20" animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                    {step.emoji}
                  </motion.div>

                  <div className="relative z-10 text-center">
                    <motion.div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 manga-panel" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                      <Icon className="text-manga-text" size={32} />
                    </motion.div>

                    <h3 className="font-manga font-bold text-2xl text-manga-text mb-4">{step.title}</h3>

                    <motion.div className="speech-bubble inline-block bg-white/90" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }} viewport={{ once: true }}>
                      <p className="font-zen text-manga-text">{step.description}</p>
                    </motion.div>
                  </div>

                  <motion.div className="absolute top-2 left-2 text-xl" animate={{ rotate: [0, 360], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}>
                    ✨
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div className="manga-panel bg-white/95 backdrop-blur-sm rounded-2xl p-8" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} viewport={{ once: true }}>
            <h3 className="font-manga font-bold text-3xl text-manga-text text-center mb-8">My Creative Arsenal</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div key={tool.name} className="text-center group" initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 1 + index * 0.1, type: "spring", bounce: 0.6 }} whileHover={{ scale: 1.1, y: -5 }} viewport={{ once: true }}>
                    <motion.div className={`${tool.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 manga-panel group-hover:shadow-lg`} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                      <Icon className="text-manga-text" size={24} />
                    </motion.div>
                    <p className="font-zen font-medium text-manga-text group-hover:text-manga-red transition-colors">{tool.name}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default JourneySection
