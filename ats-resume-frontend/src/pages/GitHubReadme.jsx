import { useState } from 'react'
import { generateGithubReadme } from '../api/resumeAPI'
import Navbar from '../components/common/Navbar'
import toast from 'react-hot-toast'
import Footer from '../components/common/Footer'

// Wrap page div with flex flex-col min-h-screen
// Add <Footer /> at the bottom before closing div
const GitHubReadme = () => {
  const [form, setForm] = useState({ name: '', skills: '', projects: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!form.name || !form.skills || !form.projects) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const response = await generateGithubReadme(
        form.name, form.skills, form.projects)
      setResult(response.data)
      toast.success('README generated!')
    } catch (error) {
      toast.error('Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    toast.success('Copied!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            GitHub README Generator
          </h1>
          <p className="text-gray-500">
            Generate an impressive GitHub profile README
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Sumit Pandey"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skills
            </label>
            <input
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="e.g. Java, Spring Boot, React, MySQL"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Projects
            </label>
            <textarea
              value={form.projects}
              onChange={(e) => setForm({ ...form, projects: e.target.value })}
              placeholder="e.g. Jobsea - job portal, ATS Resume - resume builder"
              className="w-full h-32 border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating...' : 'Generate GitHub README'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">
                Your GitHub README
              </h3>
              <button
                onClick={handleCopy}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium"
              >
                Copy Markdown
              </button>
            </div>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl overflow-auto max-h-96">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default GitHubReadme