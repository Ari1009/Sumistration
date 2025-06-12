import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import JourneySection from './components/JourneySection'
import IllustrationSection from './components/IllustrationSection'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

type Section = 'home' | 'about' | 'illustration'
type Category = 'phone' | 'laptop' | 'profile'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Smooth scroll to section
  const handleNavigate = (section: Section) => {
    setActiveSection(section)
    setSelectedCategory(null)
    
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle category selection
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
  }

  // Handle back from gallery
  const handleBackFromGallery = () => {
    setSelectedCategory(null)
    setActiveSection('illustration')
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (selectedCategory) return // Don't update when in gallery view

      const sections = ['home', 'about', 'illustration']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section as Section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-manga-beige">
      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Gallery 
              category={selectedCategory} 
              onBack={handleBackFromGallery}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection />
            <JourneySection />
            <IllustrationSection onCategorySelect={handleCategorySelect} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App