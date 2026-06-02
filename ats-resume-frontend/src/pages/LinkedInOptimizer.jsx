import { useState } from 'react'
import { generateLinkedIn } from '../api/resumeAPI'
import Navbar from '../components/common/Navbar'
import toast from 'react-hot-toast'
import Footer from '../components/common/Footer'

// Wrap page div with flex flex-col min-h-screen
// Add <Footer /> at the bottom before closing div
const LinkedInOptimizer = () => {
  const [resumeText, setResumeText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      toast.error('Please paste your resume')
      return
    }
    setLoading(true)
    try {
      const response = await generateLinkedIn(resumeText)
      setResult(response.data)
      toast.success('LinkedIn About generated!')
    } catch (error) {
      toast.error('Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            LinkedIn Optimizer
          </h1>
          <p className="text-gray-500">
            Generate a strong LinkedIn About section from your resume
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Your Resume
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-48 border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400 mb-4"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating...' : 'Generate LinkedIn About'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">
                Your LinkedIn About Section
              </h3>
              <button
                onClick={handleCopy}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium"
              >
                Copy
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LinkedInOptimizer