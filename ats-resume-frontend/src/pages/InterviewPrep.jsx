import { useState } from 'react'
import { generateInterviewQuestions } from '../api/geminiAPI'
import Navbar from '../components/common/Navbar'
import toast from 'react-hot-toast'
import Footer from '../components/common/Footer'

// Wrap page div with flex flex-col min-h-screen
// Add <Footer /> at the bottom before closing div
const InterviewPrep = () => {
  const [resumeText, setResumeText] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const handleGenerate = async () => {
    if (!resumeText.trim() || !jobRole.trim()) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const response = await generateInterviewQuestions(resumeText, jobRole)
      setQuestions(response.data.questions)
      toast.success('Questions generated!')
    } catch (error) {
      toast.error('Failed to generate questions')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Interview Prep
          </h1>
          <p className="text-gray-500">
            Get interview questions based on YOUR resume
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Role
            </label>
            <input
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Java Developer, MERN Stack Developer"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Your Resume
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-48 border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Interview Questions'}
          </button>
        </div>

        {/* Questions */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Top {questions.length} Interview Questions
            </h2>
            {questions.map((qa, index) => (
              <div key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="w-full text-left p-5 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800">
                    Q{index + 1}. {qa.question}
                  </span>
                  <span className="text-gray-400">
                    {expanded === index ? '▲' : '▼'}
                  </span>
                </button>
                {expanded === index && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <p className="text-sm font-medium text-green-600 mb-2 mt-3">
                      Suggested Answer:
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {qa.suggestedAnswer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewPrep