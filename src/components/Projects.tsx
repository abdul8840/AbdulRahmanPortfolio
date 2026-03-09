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
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className={`text-sm font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
          >
            My Work
          </span>

          <h2
            className={`text-5xl md:text-6xl font-bold mt-4 bg-clip-text text-transparent ${isDark
                ? 'bg-gradient-to-b from-white to-gray-500'
                : 'bg-gradient-to-b from-gray-900 to-gray-400'
              }`}
          >
            Featured Projects
          </h2>

          <div
            className={`w-20 h-0.5 mx-auto mt-6 ${isDark ? 'bg-white/20' : 'bg-black/15'
              }`}
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === cat.key
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

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className={`rounded-2xl border overflow-hidden transition-all h-full flex flex-col ${isDark
                      ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      : 'border-black/8 bg-white/60 hover:border-black/15 shadow-sm'
                    }`}
                >

                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 ${isDark ? 'bg-black/60' : 'bg-white/70 backdrop-blur-sm'
                        }`}
                    >
                      <button
                        onClick={() => setSelectedProject(project)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer ${isDark
                            ? 'bg-white/20 text-white border-white/20'
                            : 'bg-black/10 text-gray-800 border-black/15'
                          }`}
                      >
                        <Eye size={16} />
                      </button>

                      <a
                        href={project.github}
                        target="_blank"
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${isDark
                            ? 'bg-white/20 text-white border-white/20'
                            : 'bg-black/10 text-gray-800 border-black/15'
                          }`}
                      >
                        <Github size={16} />
                      </a>

                      <a
                        href={project.live}
                        target="_blank"
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${isDark
                            ? 'bg-white/20 text-white border-white/20'
                            : 'bg-black/10 text-gray-800 border-black/15'
                          }`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mb-4 flex-1 ${isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
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
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${isDark ? 'bg-black/80' : 'bg-white/80'
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={`rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden ${isDark
                  ? 'bg-black border border-white/20'
                  : 'bg-white border border-black/10'
                }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between mb-4">
                  <h3
                    className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                      }`}
                  >
                    {selectedProject.title}
                  </h3>

                  <button
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Image */}
                <img
                  src={selectedProject.image}
                  className="rounded-xl mb-6 w-full object-cover"
                />

                {/* Description */}
                <p
                  className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  {selectedProject.longDescription}
                </p>

                {/* Features */}
                {selectedProject.features && (
                  <>
                    <h4
                      className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                      Key Features
                    </h4>

                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {selectedProject.features.map((feat: string) => (
                        <li
                          key={feat}
                          className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                        >
                          • {feat}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string) => (
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

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 border rounded-full"
                  >
                    <Github size={16} />
                    Code
                  </a>

                  <a
                    href={selectedProject.live}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default Projects