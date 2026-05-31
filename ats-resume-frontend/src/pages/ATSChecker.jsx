import { useState } from 'react'
import { checkATSText, checkATSFile } from '../api/atsAPI'
import Navbar from '../components/common/Navbar'
import ScoreCard from '../components/ats/ScoreCard'
import UploadBox from '../components/ats/UploadBox'
import toast from 'react-hot-toast'

const ATSChecker = () => {
  const [mode, setMode] = useState('text')
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter job description')
      return
    }

    if (mode === 'text' && !resumeText.trim()) {
      toast.error('Please enter resume text')
      return
    }

    if (mode === 'file' && !file) {
      toast.error('Please upload a file')
      return
    }

    setLoading(true)
    try {
      let response
      if (mode === 'text') {
        response = await checkATSText({ resumeText, jobDescription })
      } else {
        response = await checkATSFile(file, jobDescription)
      }
      setResult(response.data)
      toast.success('ATS check complete!')
    } catch (error) {
      toast.error('Something went wrong. Try again.')
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
            ATS Score Checker
          </h1>
          <p className="text-gray-500">
            Check how well your resume matches any job description
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setMode('text')}
            className={`px-6 py-2 rounded-xl font-medium transition-colors ${
              mode === 'text'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Paste Text
          </button>
          <button
            onClick={() => setMode('file')}
            className={`px-6 py-2 rounded-xl font-medium transition-colors ${
              mode === 'file'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Upload PDF/DOCX
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Resume Input */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-3">
              Your Resume
            </h3>
            {mode === 'text' ? (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full h-64 border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
              />
            ) : (
              <UploadBox file={file} setFile={setFile} />
            )}
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-3">
              Job Description
            </h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description from Naukri, LinkedIn, Indeed..."
              className="w-full h-64 border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="text-center mb-10">
          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Analyzing...' : 'Check ATS Score'}
          </button>
        </div>

        {/* Results */}
        {result && <ScoreCard result={result} />}
      </div>
    </div>
  )
}

export default ATSChecker