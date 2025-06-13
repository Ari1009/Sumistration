import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowLeft, X } from 'lucide-react'
import { supabase, type Illustration } from '../lib/supabase'
import CropModal from './CropModal'

interface GalleryProps {
  category: 'phone' | 'laptop' | 'profile'
  onBack: () => void
}

const Gallery: React.FC<GalleryProps> = ({ category, onBack }) => {
  const [illustrations, setIllustrations] = useState<Illustration[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)

  const categoryInfo = {
    phone: { title: 'Phone Illustrations', bg: 'from-manga-green/20 to-manga-blue/20', emoji: '📱' },
    laptop: { title: 'Laptop Illustrations', bg: 'from-manga-blue/20 to-manga-purple/20', emoji: '💻' },
    profile: { title: 'Profile Illustrations', bg: 'from-manga-red/20 to-manga-yellow/20', emoji: '🖼️' }
  }

  useEffect(() => {
    fetchIllustrations()
  }, [category])

  const fetchIllustrations = async () => {
    try {
      const { data, error } = await supabase
        .from('illustrations')
        .select('*')
        .eq('category', category)
        .order('uploaded_at', { ascending: false })

      if (error) throw error
      setIllustrations(data || [])
    } catch (error) {
      console.error('Error fetching illustrations:', error)
      // For demo purposes, show sample data
      setIllustrations([
        {
          id: '1',
          name: 'Sample Illustration 1',
          category,
          image_url: '/self2.png',
          uploaded_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Sample Illustration 2',
          category,
          image_url: '/self2.png',
          uploaded_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Sample Illustration 3',
          category,
          image_url: '/self2.png',
          uploaded_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowCropModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-manga-beige flex items-center justify-center">
        <motion.div
          className="manga-panel bg-white p-8 rounded-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <p className="font-zen text-xl text-manga-text">Loading illustrations...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${categoryInfo[category].bg} pt-24 pb-8 relative`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 halftone-bg"></div>
      
      {/* Sticky Back Button */}
      <motion.div
        className="fixed top-20 left-4 z-40"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          onClick={onBack}
          className="manga-panel bg-white/95 backdrop-blur-sm px-4 md:px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-manga-beige transition-colors shadow-lg"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline font-zen font-medium">Back</span>
        </motion.button>
      </motion.div>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-manga font-bold text-3xl md:text-4xl text-manga-text mb-2">
            {categoryInfo[category].title}
          </h1>
          <span className="text-4xl">{categoryInfo[category].emoji}</span>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {illustrations.map((illustration, index) => (
            <motion.div
              key={illustration.id}
              className="manga-panel bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer relative"
              initial={{ 
                scale: 0,
                rotate: -10
              }}
              animate={{ 
                scale: 1,
                rotate: 0
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 2
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={illustration.image_url}
                  alt={illustration.name}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Desktop Hover Overlay */}
                <motion.div
                  className="hidden md:flex absolute inset-0 bg-manga-text/80 flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <h3 className="font-zen font-bold text-white text-xl mb-4 text-center px-4">
                    {illustration.name}
                  </h3>
                  
                  <motion.button
                    onClick={() => handleDownload(illustration.image_url)}
                    className="speech-bubble bg-white text-manga-text px-6 py-3 flex items-center space-x-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download size={20} />
                    <span className="font-zen font-medium">Download</span>
                  </motion.button>
                </motion.div>

                {/* Mobile Download Button - Always Visible */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="font-zen font-bold text-white text-lg mb-2 text-center">
                    {illustration.name}
                  </h3>
                  <motion.button
                    onClick={() => handleDownload(illustration.image_url)}
                    className="w-full bg-manga-red text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 font-zen font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={18} />
                    <span>Download</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {illustrations.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="manga-panel bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-md mx-auto">
              <span className="text-4xl md:text-6xl mb-4 block">{categoryInfo[category].emoji}</span>
              <h3 className="font-manga font-bold text-xl md:text-2xl text-manga-text mb-4">
                No illustrations yet
              </h3>
              <p className="font-zen text-manga-text/80">
                Check back soon for new {category} illustrations!
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Crop Modal */}
      <AnimatePresence>
        {showCropModal && selectedImage && (
          <CropModal
            imageUrl={selectedImage}
            onClose={() => {
              setShowCropModal(false)
              setSelectedImage(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery