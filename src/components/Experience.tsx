import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const experienceData = [
  {
    title: 'Freelance Full Stack Web Developer & SEO Specialist',
    company: 'Self Employed',
    location: 'Remote',
    period: '2024 - Present',
    description: 'Developing full-stack web applications using the MERN stack for client projects. Focused on responsive UI development, backend API integration, performance optimization, and technical SEO to improve website visibility and user experience.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'SEO'],
  },
  {
    title: 'Web Development Intern',
    company: 'Weboin Company',
    location: 'Remote',
    period: 'Aug 2023 - Sep 2023',
    description: 'Worked on real-world web development projects using React.js, Node.js, HTML, and CSS. Collaborated with developers to build responsive interfaces and integrate frontend with backend systems.',
    tags: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'HTML', 'CSS'],
  },
];

const educationData = [
  {
    title: 'Master of Computer Applications (MCA)',
    company: 'Sam Higginbottom University of Agriculture, Technology and Sciences',
    location: 'Prayagraj, India',
    period: '2024 - 2026',
    description: 'Currently pursuing MCA with focus on advanced software development, cloud computing, and modern web technologies.',
    tags: ['Software Development', 'Cloud Computing', 'Web Technologies'],
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    company: 'DY Patil International University',
    location: 'Pune, India',
    period: '2021 - 2024',
    description: 'Studied computer science fundamentals including programming, databases, networking, and software engineering while building full-stack web projects.',
    tags: ['Programming', 'Databases', 'Software Engineering'],
  },
  {
    title: 'Web Development Certification',
    company: 'Teachnook',
    location: 'Online',
    period: '2023',
    description: 'Completed certification focused on full-stack web development including frontend frameworks, backend development, and modern web technologies.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    company: 'DY Patil International University',
    location: 'Pune, India',
    period: '2024',
    description: 'Certification covering cloud fundamentals, AWS services, cloud security, and deployment practices.',
    tags: ['AWS', 'Cloud Computing'],
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isDark } = useTheme();

  const data = activeTab === 'experience' ? experienceData : educationData;

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>My Journey</span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 bg-clip-text text-transparent ${isDark
            ? 'bg-gradient-to-b from-white to-gray-500'
            : 'bg-gradient-to-b from-gray-900 to-gray-400'
            }`}>
            Experience & Education
          </h2>
          <div className={`w-20 h-0.5 mx-auto mt-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-16"
        >
          {[
            { key: 'experience' as const, label: 'Experience', icon: Briefcase },
            { key: 'education' as const, label: 'Education', icon: GraduationCap },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === tab.key
                ? isDark
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white'
                : isDark
                  ? 'text-gray-400 border border-white/10 hover:text-white hover:border-white/30'
                  : 'text-gray-500 border border-black/10 hover:text-black hover:border-black/25'
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px ${isDark ? 'bg-white/10' : 'bg-black/10'
            }`} />

          {data.map((item, i) => (
            <TimelineItem key={`${activeTab}-${i}`} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({
  item,
  index,
  isInView,
}: {
  item: (typeof experienceData)[0];
  index: number;
  isInView: boolean;
}) => {
  const ref = useRef(null);
  const itemInView = useInView(ref, { once: true, margin: '-50px' });
  const { isDark } = useTheme();

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={itemInView && isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 mt-8 z-10 ring-4 ${isDark
          ? 'bg-white ring-black'
          : 'bg-gray-900 ring-[#f8f8f8]'
          }`}
      />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={itemInView && isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}
      >
        <div className={`p-6 rounded-2xl border transition-all group ${isDark
          ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
          : 'border-black/8 bg-white/60 hover:border-black/15 shadow-sm'
          }`}>
          <div className={`flex items-center gap-2 text-xs font-mono mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <Calendar size={12} />
            <span>{item.period}</span>
            <span className="mx-1">•</span>
            <MapPin size={12} />
            <span>{item.location}</span>
          </div>
          <h3 className={`text-xl font-bold mb-1 transition-colors ${isDark ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-gray-700'
            }`}>
            {item.title}
          </h3>
          <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.company}</p>
          <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs rounded-full border ${isDark
                  ? 'bg-white/5 text-gray-400 border-white/10'
                  : 'bg-black/[0.03] text-gray-500 border-black/8'
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
