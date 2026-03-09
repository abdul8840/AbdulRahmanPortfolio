import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  Eye,
  X,
  Layers,
  Globe,
  Smartphone,
  Brain,
  Server
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface Project {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  category: string
  github: string
  live: string
  features: string[]
}

interface ProjectsProps {
  projects: Project[]
}

const categories = [
  { key: 'all', label: 'All Projects', icon: Layers },
  { key: 'freelance', label: 'Freelance', icon: Layers },
  { key: 'frontend', label: 'Frontend', icon: Globe },
  { key: 'react', label: 'React Apps', icon: Globe },
  { key: 'fullstack', label: 'Full Stack', icon: Server },
  { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { key: 'ai', label: 'AI / ML', icon: Brain }
]

const Projects = ({ projects }: ProjectsProps) => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { isDark } = useTheme()

  const filtered =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => p.category === activeTab)

  return (
    <section id="projects" className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span
            className={`text-xs md:text-sm font-mono tracking-widest uppercase ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            My Work
          </span>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 bg-clip-text text-transparent ${
              isDark
                ? 'bg-gradient-to-b from-white to-gray-500'
                : 'bg-gradient-to-b from-gray-900 to-gray-400'
            }`}
          >
            Featured Projects
          </h2>

          <div
            className={`w-16 md:w-20 h-0.5 mx-auto mt-4 md:mt-6 ${
              isDark ? 'bg-white/20' : 'bg-black/15'
            }`}
          />
        </motion.div>

        {/* Category Tabs - Horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mb-8 md:mb-16 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === cat.key
                  ? isDark
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white'
                  : isDark
                    ? 'text-gray-400 border border-white/10 hover:text-white hover:border-white/30'
                    : 'text-gray-500 border border-black/10 hover:text-black hover:border-black/25'
              }`}
            >
              <cat.icon size={14} className="md:w-4 md:h-4" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <div
                  className={`rounded-xl md:rounded-2xl border overflow-hidden transition-all h-full flex flex-col ${
                    isDark
                      ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      : 'border-black/8 bg-white/60 hover:border-black/15 shadow-sm'
                  }`}
                >

                  {/* Project Image */}
                  <div className="h-40 sm:h-44 md:h-48 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay for better text visibility if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3
                        className={`text-base md:text-lg font-bold line-clamp-1 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {project.title}
                      </h3>
                      
                      {/* Icons moved here from image overlay */}
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className={`p-1.5 md:p-2 rounded-full transition-all hover:scale-110 ${
                            isDark
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-black/5 text-gray-700 hover:bg-black/10'
                          }`}
                          aria-label="View project details"
                        >
                          <Eye size={14} className="md:w-4 md:h-4 cursor-pointer" />
                        </button>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 md:p-2 rounded-full transition-all hover:scale-110 ${
                            isDark
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-black/5 text-gray-700 hover:bg-black/10'
                          }`}
                          aria-label="View source code"
                        >
                          <Github size={14} className="md:w-4 md:h-4" />
                        </a>

                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 md:p-2 rounded-full transition-all hover:scale-110 ${
                            isDark
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-black/5 text-gray-700 hover:bg-black/10'
                          }`}
                          aria-label="View live demo"
                        >
                          <ExternalLink size={14} className="md:w-4 md:h-4" />
                        </a>
                      </div>
                    </div>

                    <p
                      className={`text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tags - Horizontal scroll on mobile if needed */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full border whitespace-nowrap ${
                            isDark
                              ? 'bg-white/5 text-gray-400 border-white/10'
                              : 'bg-black/[0.03] text-gray-500 border-black/8'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span
                          className={`px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full border ${
                            isDark
                              ? 'bg-white/5 text-gray-400 border-white/10'
                              : 'bg-black/[0.03] text-gray-500 border-black/8'
                          }`}
                        >
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal - Fully responsive */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 ${
              isDark ? 'bg-black/80' : 'bg-white/80'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={`rounded-xl md:rounded-2xl max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden ${
                isDark
                  ? 'bg-black border border-white/20'
                  : 'bg-white border border-black/10'
              }`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Scrollable Content */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[95vh] md:max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-start mb-3 md:mb-4 gap-4">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedProject.title}
                  </h3>

                  <button
                    className="cursor-pointer p-1 hover:opacity-70 transition-opacity"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close modal"
                  >
                    <X size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>

                {/* Image */}
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="rounded-lg md:rounded-xl mb-4 md:mb-6 w-full object-cover max-h-48 sm:max-h-64 md:max-h-80"
                  loading="lazy"
                />

                {/* Description */}
                <p
                  className={`text-sm md:text-base mb-4 md:mb-6 leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {selectedProject.longDescription}
                </p>

                {/* Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <>
                    <h4
                      className={`text-sm md:text-base font-semibold mb-2 md:mb-3 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Key Features
                    </h4>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-2 mb-4 md:mb-6">
                      {selectedProject.features.map((feat: string) => (
                        <li
                          key={feat}
                          className={`text-xs md:text-sm flex items-start gap-1.5 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span className="flex-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Tech Stack */}
                <div className="mb-4 md:mb-6">
                  <h4
                    className={`text-sm md:text-base font-semibold mb-2 md:mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded-full border ${
                          isDark
                            ? 'bg-white/5 text-gray-400 border-white/10'
                            : 'bg-black/[0.03] text-gray-500 border-black/8'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 border rounded-full text-sm md:text-base transition-all hover:scale-105 ${
                      isDark
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-black/10 text-gray-900 hover:bg-black/5'
                    }`}
                  >
                    <Github size={16} className="md:w-5 md:h-5" />
                    View Code
                  </a>

                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-gray-900 text-white rounded-full text-sm md:text-base transition-all hover:scale-105 hover:bg-gray-800"
                  >
                    <ExternalLink size={16} className="md:w-5 md:h-5" />
                    Live Demo
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Projects