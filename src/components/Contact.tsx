import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  X
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { isDark } = useTheme()

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    setStatus('sending')

    try {
      const response = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', response)
      setStatus('sent')

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'abdul14941naseer@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Prayagraj, India'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8840351748'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      link: 'https://github.com/abdul8840'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/abdul-rahman-naseer?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    {
      icon: X,
      name: 'X',
      link: 'https://x.com/Abdul1748Rahman'
    }
  ]

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>

        {/* Title */}
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
            Get In Touch
          </span>

          <h2
            className={`text-5xl md:text-6xl font-bold mt-4 bg-clip-text text-transparent ${isDark
                ? 'bg-gradient-to-b from-white to-gray-500'
                : 'bg-gradient-to-b from-gray-900 to-gray-400'
              }`}
          >
            Contact Me
          </h2>

          <div
            className={`w-20 h-0.5 mx-auto mt-6 ${isDark ? 'bg-white/20' : 'bg-black/15'
              }`}
          />

          <p
            className={`mt-6 max-w-lg mx-auto ${isDark ? 'text-gray-500' : 'text-gray-500'
              }`}
          >
            Have a project in mind? Let's work together to build something amazing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >

            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center ${isDark
                      ? 'border-white/10 bg-white/[0.02]'
                      : 'border-black/10 bg-white/60'
                    }`}
                >
                  <info.icon
                    size={20}
                    className={isDark ? 'text-gray-400' : 'text-gray-500'}
                  />
                </div>

                <div>
                  <p
                    className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                  >
                    {info.label}
                  </p>

                  <p
                    className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    {info.value}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'
                }`}
            >
              <p
                className={`text-sm mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
              >
                Follow me
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full border transition-all ${isDark
                        ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        : 'border-black/10 text-gray-500 hover:text-black hover:border-black/20'
                      }`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${isDark
                      ? 'bg-white/[0.03] border-white/10 text-white'
                      : 'bg-white border-black/10'
                    }`}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${isDark
                      ? 'bg-white/[0.03] border-white/10 text-white'
                      : 'bg-white border-black/10'
                    }`}
                />

              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-xl border ${isDark
                    ? 'bg-white/[0.03] border-white/10 text-white'
                    : 'bg-white border-black/10'
                  }`}
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-xl border ${isDark
                    ? 'bg-white/[0.03] border-white/10 text-white'
                    : 'bg-white border-black/10'
                  }`}
              />

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer ${isDark
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white'
                  }`}
              >

                {status === 'idle' && (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}

                {status === 'sending' && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                )}

                {status === 'sent' && (
                  <>
                    <CheckCircle size={16} />
                    Message Sent
                  </>
                )}

                {status === 'error' && (
                  <>
                    <AlertCircle size={16} />
                    Failed
                  </>
                )}

              </motion.button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact