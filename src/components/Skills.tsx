import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  Code,
  Globe,
  GitBranch
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const skillCategories = [
  {
    key: 'all',
    label: 'All_Skills',
    icon: Code,
    skills: [
      { name: 'React.js', icon: Monitor },
      { name: 'Next.js', icon: Monitor },
      { name: 'JavaScript', icon: Code },
      { name: 'HTML5', icon: Globe },
      { name: 'CSS3', icon: Globe },
      { name: 'Tailwind CSS', icon: Monitor },
      { name: 'Java', icon: Code },
      { name: 'Python', icon: Code },
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Server },
      { name: 'REST APIs', icon: Server },
      { name: 'MongoDB', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Firebase', icon: Database },
      { name: 'AWS', icon: Cloud },
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitBranch },
      { name: 'VS Code', icon: Wrench },
      { name: 'Technical SEO', icon: Globe },
    ],
  },
  {
    key: 'languages',
    label: 'Languages',
    icon: Code,
    skills: [
      { name: 'JavaScript', icon: Code },
      { name: 'Java', icon: Code },
      { name: 'Python', icon: Code },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    icon: Monitor,
    skills: [
      { name: 'React.js', icon: Monitor },
      { name: 'Next.js', icon: Monitor },
      { name: 'HTML5', icon: Globe },
      { name: 'CSS3', icon: Globe },
      { name: 'Tailwind CSS', icon: Monitor },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Server },
      { name: 'REST APIs', icon: Server },
      { name: 'Authentication (JWT)', icon: Server },
    ],
  },
  {
    key: 'database',
    label: 'Database',
    icon: Database,
    skills: [
      { name: 'MongoDB', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Firebase', icon: Database },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitBranch },
      { name: 'VS Code', icon: Wrench },
      { name: 'AWS', icon: Cloud },
      { name: 'Technical SEO', icon: Globe },
    ],
  },
]

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { isDark } = useTheme()

  const activeCategory = skillCategories.find((c) => c.key === activeTab)!

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            My Expertise
          </span>

          <h2
            className={`text-5xl md:text-6xl font-bold mt-4 bg-clip-text text-transparent ${
              isDark
                ? 'bg-gradient-to-b from-white to-gray-500'
                : 'bg-gradient-to-b from-gray-900 to-gray-400'
            }`}
          >
            Skills & Technologies
          </h2>

          <div className={`w-20 h-0.5 mx-auto mt-6 ${isDark ? 'bg-white/20' : 'bg-black/15'}`} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mb-8 md:mb-16 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === cat.key
                  ? isDark
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white'
                  : isDark
                    ? 'text-gray-400 border border-white/10 hover:text-white hover:border-white/30'
                    : 'text-gray-500 border border-black/10 hover:text-black hover:border-black/25'
              }`}
            >
              <cat.icon size={14} />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {activeCategory.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${
                isDark
                  ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  : 'border-black/10 bg-white/60 hover:border-black/20 shadow-sm'
              }`}
            >
              <skill.icon
                size={28}
                className={`${isDark ? 'text-white' : 'text-gray-800'} mb-3`}
              />

              <span
                className={`text-sm font-medium text-center ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>


      {/* Add custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default Skills