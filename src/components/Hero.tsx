import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { isDark } = useTheme();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((x - centerX) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] ${
          isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`} />
      </div>

      <motion.div
        style={{
          transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className={`inline-block px-4 py-2 rounded-full border text-sm font-mono ${
            isDark
              ? 'border-white/20 bg-white/5 text-gray-300'
              : 'border-black/10 bg-black/[0.03] text-gray-600'
          }`}>
            👋 Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter mb-6"
        >
          <span className={`block bg-clip-text text-transparent ${
            isDark
              ? 'bg-gradient-to-b from-white via-white to-gray-500'
              : 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-400'
          }`}>
            Abdul Rahman Naseer
          </span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className={`text-xl md:text-3xl font-light ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Full Stack Developer & UI/UX Designer
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
        >
          Full Stack Web Developer specializing in the MERN stack with experience building scalable, responsive web applications. Proficient in frontend development, backend APIs, database management, and technical SEO optimization for improved performance and search visibility.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 font-semibold rounded-full transition-colors ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 border font-semibold rounded-full transition-colors ${
              isDark
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-black/15 text-gray-800 hover:bg-black/5'
            }`}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-4 justify-center"
        >
          {[
            { icon: Github, href: 'https://github.com/abdul8840' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-rahman-naseer?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
            { icon: X, href: 'https://x.com/Abdul1748Rahman' },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                isDark
                  ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                  : 'border-black/10 text-gray-500 hover:text-black hover:border-black/25'
              }`}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`flex flex-col items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        >
          <span className="text-xs font-mono">SCROLL DOWN</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
