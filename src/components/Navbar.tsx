import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Image } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'illustration', label: 'Illustration', icon: Image }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 manga-panel bg-manga-beige shadow-sm md:top-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2 md:rounded-lg md:px-6 md:py-3"
    >
      <div className="mx-auto flex max-w-screen-md items-center justify-between px-2 py-1 md:w-full md:max-w-none md:justify-center md:gap-8 md:px-0 md:py-0">
        {/* Logo - Same on both */}
        <div className="font-manga text-base font-bold text-manga-text whitespace-nowrap md:text-xl">
          
スミストレーション
        </div>

        {/* Navigation - Different mobile/desktop */}
        <div className="flex items-center gap-0.5 md:gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`rounded-full p-1 transition-colors md:flex md:items-center md:gap-2 md:px-4 md:py-2 ${
                  activeSection === item.id
                    ? 'bg-manga-red text-white'
                    : 'text-manga-text hover:bg-manga-yellow'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden font-zen font-medium md:inline">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;