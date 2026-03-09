import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import MyCv from '../assets/resume_abdul.pdf';

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '5+' },
  { label: 'Happy Clients', value: '5+' },
  { label: 'Technologies', value: '10+' },
];

const highlights = [
  { icon: Code2, title: 'MERN Stack Development', desc: 'Building full-stack web applications using MongoDB, Express, React, and Node.js' },

  { icon: Palette, title: 'Responsive UI Development', desc: 'Creating modern, responsive interfaces with React.js and Tailwind CSS' },

  { icon: Rocket, title: 'API & Backend Systems', desc: 'Designing secure REST APIs, authentication systems, and scalable backend services' },

  { icon: Zap, title: 'Performance & SEO', desc: 'Optimizing applications for speed, scalability, and technical SEO improvements' },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isDark } = useTheme();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className={`text-sm font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>About Me</span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 bg-clip-text text-transparent ${isDark
            ? 'bg-gradient-to-b from-white to-gray-500'
            : 'bg-gradient-to-b from-gray-900 to-gray-400'
            }`}>
            Who I Am
          </h2>
          <div className={`w-20 h-0.5 mx-auto mt-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Web Developer specializing in the MERN stack with experience building scalable and responsive web applications. Proficient in frontend development, backend API design, and database management to deliver efficient and reliable solutions.
            </p>
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Experienced in integrating modern web technologies and implementing technical SEO practices to improve performance and search visibility. Focused on creating optimized, user-friendly applications with clean and maintainable code.
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-block px-8 py-3 rounded-full border font-medium transition-colors ${isDark
                ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                : 'bg-black/5 text-gray-800 border-black/15 hover:bg-black/10'
                }`}
            >
              Let's Connect
            </motion.a>
            <motion.a
              href={MyCv}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-block ml-2 px-8 py-3 rounded-full font-medium transition-colors ${isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className={`p-6 rounded-2xl border text-center transition-colors group ${isDark
                  ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  : 'border-black/8 bg-white/60 hover:border-black/15 shadow-sm'
                  }`}
              >
                <div className={`text-4xl font-bold mb-2 group-hover:scale-110 transition-transform ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border text-center transition-all group ${isDark
                ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                : 'border-black/8 bg-white/60 hover:border-black/15 shadow-sm'
                }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${isDark
                ? 'bg-white/5 group-hover:bg-white/10'
                : 'bg-black/5 group-hover:bg-black/10'
                }`}>
                <item.icon size={24} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
