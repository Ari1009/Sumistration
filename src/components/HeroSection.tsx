import React from 'react'
import { motion } from 'framer-motion'

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-manga-beige via-manga-blue/20 to-manga-purple/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Halftone Background */}
        <div className="absolute inset-0 halftone-bg"></div>
        
        {/* Manga Speed Lines */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              #1C1C1C 2px,
              #1C1C1C 4px
            )`
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '100px 100px'],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Floating Decorations with Anime-style Movement */}
      <motion.div
        className="absolute top-20 left-10 text-4xl z-10"
        animate={{ 
          rotate: [0, 360],
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-20 text-3xl z-10"
        animate={{ 
          rotate: [-360, 0],
          y: [30, -30, 30],
          scale: [0.8, 1.2, 0.8],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        🖊️
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 text-2xl z-10"
        animate={{ 
          rotate: [0, 180, 360],
          y: [-15, 15, -15],
          x: [0, 20, 0],
          scale: [1, 1.4, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        🎨
      </motion.div>

      <motion.div
        className="absolute top-60 left-1/3 text-xl z-10"
        animate={{ 
          rotate: [360, 0],
          y: [0, -25, 0],
          opacity: [0.5, 1, 0.5],
          scale: [0.9, 1.3, 0.9]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        💫
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-1/4 text-2xl z-10"
        animate={{ 
          rotate: [0, -360],
          y: [20, -20, 20],
          x: [-10, 10, -10],
          scale: [1.1, 0.9, 1.1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        🌟
      </motion.div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-20">
        <motion.div
          className="manga-panel bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-6xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Panel Border Animation */}
          <motion.div
            className="absolute inset-0 border-4 border-manga-border rounded-2xl"
            initial={{ 
              clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
            }}
            animate={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />

          <div className="grid md:grid-cols-2 gap-12 items-center relative">
            {/* Left Side - Character Illustration */}
            <motion.div
              className="relative"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Character with Enhanced Animation */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  y: [-8, 8, -8],
                  rotate: [-1, 1, -1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <img
                  src="/self2.png"
                  alt="Manga Artist Character"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>
              
              {/* Enhanced Floating Shadow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-manga-blue/30 to-manga-purple/30 rounded-full blur-3xl transform scale-75"
                animate={{ 
                  scale: [0.75, 0.9, 0.75],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />

              {/* Action Lines */}
              <motion.div
                className="absolute -inset-4 opacity-20"
                style={{
                  background: `radial-gradient(circle, transparent 40%, #1C1C1C 41%, #1C1C1C 42%, transparent 43%)`
                }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Right Side - Title and Speech Bubble */}
            <motion.div
              className="space-y-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {/* Japanese Title with Enhanced Animation */}
              <motion.h1
                className="font-manga font-black text-6xl md:text-8xl text-manga-text leading-none relative"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.9, 
                  type: "spring", 
                  bounce: 0.6 
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "4px 4px 8px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0px 0px 0px rgba(217, 122, 122, 0)",
                      "2px 2px 4px rgba(217, 122, 122, 0.3)",
                      "0px 0px 0px rgba(217, 122, 122, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  マンガ
                </motion.span>
                <br />
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0px 0px 0px rgba(168, 208, 219, 0)",
                      "2px 2px 4px rgba(168, 208, 219, 0.3)",
                      "0px 0px 0px rgba(168, 208, 219, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  クラブ
                </motion.span>
              </motion.h1>

              {/* Enhanced Speech Bubble */}
              <motion.div
                className="speech-bubble inline-block relative"
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2, 
                  type: "spring", 
                  bounce: 0.8 
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.p 
                  className="font-zen font-bold text-2xl text-manga-text"
                  animate={{
                    color: [
                      "#333333",
                      "#D97A7A", 
                      "#A8D0DB",
                      "#333333"
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  I am an Artist
                </motion.p>
                
                {/* Sparkle Effect */}
                <motion.div
                  className="absolute -top-2 -right-2 text-lg"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </motion.div>

              {/* Enhanced Subtitle */}
              <motion.p
                className="font-zen text-lg text-manga-text/80 max-w-md relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.span
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Creating beautiful manga-style illustrations and bringing characters to life through digital art.
                </motion.span>
              </motion.p>

              {/* Floating Mini Elements */}
              <motion.div
                className="absolute top-0 right-0 text-sm opacity-60"
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 180, 360],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                🎭
              </motion.div>
            </motion.div>
          </div>

          {/* Panel Corner Decorations */}
          <motion.div
            className="absolute top-4 left-4 text-xl opacity-30"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.div>
          
          <motion.div
            className="absolute bottom-4 right-4 text-xl opacity-30"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            🎨
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection