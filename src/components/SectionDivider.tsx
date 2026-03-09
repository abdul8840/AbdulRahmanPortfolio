import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDark } = useTheme();

  return (
    <div ref={ref} className="flex items-center justify-center py-4">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className={`w-32 h-px bg-gradient-to-r from-transparent to-transparent ${
          isDark ? 'via-white/20' : 'via-black/15'
        }`}
      />
    </div>
  );
};

export default SectionDivider;
