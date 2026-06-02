import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Footer = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!form.name.trim() || !form.message.trim()) {
      toast.error('Name and message are required')
      return
    }
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/messages/send`,
        null,
        { params: { name: form.name, email: form.email, message: form.message } }
      )
      toast.success('Message sent successfully!')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📄</span>
              <span className="text-xl font-bold text-white">
                ATS<span className="text-blue-400">Resume</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Free AI-powered ATS resume builder and score checker for students.
              Build ATS-optimized resumes and land your dream job.
            </p>
            <p className="text-sm text-gray-400">
              📧 sumitpandey7454@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: '🎯 ATS Score Checker', path: '/ats-checker' },
                { label: '✨ Build Resume', path: '/templates' },
                { label: '📄 My Resumes', path: '/my-resumes' },
                { label: '🎤 Interview Prep', path: '/interview-prep' },
                { label: '🔗 LinkedIn Optimizer', path: '/linkedin-optimizer' },
                { label: '🐙 GitHub README', path: '/github-readme' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Send Message */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Send a Message
            </h3>
            <div className="space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name *"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email (optional)"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message *"
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Sending...' : '✈️ Send Message'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2026 ATSResume. All rights reserved. Built free for students.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/ats-checker')}
              className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
            >
              Free ATS Checker
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer