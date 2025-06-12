import React from 'react'
import { motion } from 'framer-motion'
import { Home, User, Image } from 'lucide-react'

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Journey', icon: User },
    { id: 'illustration', label: 'Illustration', icon: Image }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 manga-panel bg-manga-beige px-6 py-3 rounded-lg"
    >
      <div className="flex items-center space-x-8">
        <div className="font-manga font-bold text-xl text-manga-text">
          マンガクラブ
        </div>
        
        <div className="flex space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-manga-red text-white' 
                    : 'text-manga-text hover:bg-manga-yellow'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
                <span className="font-zen font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar