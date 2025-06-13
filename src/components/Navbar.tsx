import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Image } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  hideOnGallery?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate,
  hideOnGallery = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'illustration', label: 'Illustration', icon: Image }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar on gallery pages
      if (hideOnGallery) {
        setIsVisible(false);
        return;
      }
      
      // Show navbar on other pages
      setIsVisible(true);
      
      // Make navbar translucent when scrolled
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnGallery]);

  if (!isVisible) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 manga-panel px-4 py-3 rounded-b-lg shadow-sm transition-all duration-300 ${
        isScrolled 
          ? 'bg-manga-beige/80 backdrop-blur-sm' 
          : 'bg-manga-beige'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-screen-md mx-auto">
        {/* Logo */}
        <div className="font-manga font-bold text-lg text-manga-text whitespace-nowrap truncate max-w-[120px] md:max-w-none">
          マンガクラブ
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center p-3 md:px-3 md:py-2 rounded-full transition-colors ${
                  activeSection === item.id
                    ? 'bg-manga-red text-white'
                    : 'text-manga-text hover:bg-manga-yellow'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                <Icon size={24} className="md:mr-2" />
                <span className="hidden md:inline font-zen font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;