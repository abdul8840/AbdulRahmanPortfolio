import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t py-12 px-6 ${isDark ? 'border-white/10' : 'border-black/8'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
              &lt;ARN/&gt;
            </span>
            <span className={`text-sm hidden md:inline ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>|</span>
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Full Stack Developer</span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm transition-colors ${
                  isDark
                    ? 'text-gray-500 hover:text-white'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
              isDark
                ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                : 'border-black/10 text-gray-500 hover:text-black hover:border-black/25'
            }`}
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className={`mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-white/5' : 'border-black/5'
        }`}>
          <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} Abdul Rahman Naseer. Made with
            <Heart size={12} className={`inline ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
