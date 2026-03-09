import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => {
        const el = document.getElementById(item.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          return { name: item, top: rect.top };
        }
        return { name: item, top: Infinity };
      });

      const current = sections.reduce((closest, section) => {
        return Math.abs(section.top) < Math.abs(closest.top) ? section : closest;
      });

      setActiveSection(current.name);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDark
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          className="text-2xl font-bold font-mono tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          <span className={isDark ? 'text-white' : 'text-black'}>&lt;</span>
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>ARN</span>
          <span className={isDark ? 'text-white' : 'text-black'}>/&gt;</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full cursor-pointer ${
                activeSection === item
                  ? isDark ? 'text-white' : 'text-black'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === item && (
                <motion.div
                  layoutId="activeNav"
                  className={`absolute inset-0 rounded-full border ${
                    isDark
                      ? 'bg-white/10 border-white/20'
                      : 'bg-black/5 border-black/15'
                  }`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </motion.button>
          ))}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className={`ml-3 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
              isDark
                ? 'border-white/20 text-yellow-400 hover:bg-white/10 hover:border-white/30'
                : 'border-black/15 text-gray-700 hover:bg-black/5 hover:border-black/25'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
              isDark
                ? 'border-white/20 text-yellow-400'
                : 'border-black/15 text-gray-700'
            }`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-xl border-b ${
              isDark
                ? 'bg-black/95 border-white/10'
                : 'bg-white/95 border-black/10'
            }`}
          >
            <nav className="flex flex-col px-6 py-4 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item
                      ? isDark
                        ? 'text-white bg-white/10'
                        : 'text-black bg-black/5'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
