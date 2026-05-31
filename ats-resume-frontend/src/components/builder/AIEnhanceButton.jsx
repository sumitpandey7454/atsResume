import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { generateAboutMe } from '../../api/resumeAPI'
import toast from 'react-hot-toast'

const AIEnhanceButton = () => {
  const { resumeData, updateResumeData } = useResume()
  const [loading, setLoading] = useState(false)
  const [aboutMeGenerated, setAboutMeGenerated] = useState(false)

  const handleGenerateAboutMe = async () => {
    if (!resumeData.fullName || !resumeData.jobRole) {
      toast.error('Please fill name and job role first')
      return
    }
    setLoading(true)
    try {
      const skillNames = resumeData.skills
        ?.map(s => s.name).join(', ') || ''

      const response = await generateAboutMe(
        resumeData.fullName,
        resumeData.jobRole,
        skillNames,
        resumeData.experienceType
      )
      updateResumeData({ aboutMe: response.data })
      setAboutMeGenerated(true)
      toast.success('About Me generated!')
    } catch (error) {
      toast.error('Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
        <h3 className="font-semibold text-purple-800 mb-2">
          🤖 AI About Me Generator
        </h3>
        <p className="text-sm text-purple-600 mb-4">
          AI will generate a strong About Me section based on your
          name, job role, and skills.
        </p>
        <button
          onClick={handleGenerateAboutMe}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
        >
          {loading ? '✨ Generating...' : '✨ Generate About Me with AI'}
        </button>
      </div>

      {/* About Me Preview/Edit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Me
          {aboutMeGenerated && (
            <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">
              ✓ AI Generated
            </span>
          )}
        </label>
        <textarea
          value={resumeData.aboutMe || ''}
          onChange={(e) => updateResumeData({ aboutMe: e.target.value })}
          placeholder="Write or generate your About Me section..."
          rows={5}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-semibold text-gray-700 mb-3">
          📋 Resume Summary
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>👤 Name: <span className="font-medium">{resumeData.fullName || 'Not filled'}</span></p>
          <p>🎯 Role: <span className="font-medium">{resumeData.jobRole || 'Not selected'}</span></p>
          <p>💼 Type: <span className="font-medium">{resumeData.experienceType}</span></p>
          <p>🎓 Education: <span className="font-medium">{resumeData.educations?.length || 0} added</span></p>
          <p>🚀 Projects: <span className="font-medium">{resumeData.projects?.length || 0} added</span></p>
          <p>💻 Skills: <span className="font-medium">{resumeData.skills?.length || 0} added</span></p>
          <p>📜 Certifications: <span className="font-medium">{resumeData.certifications?.length || 0} added</span></p>
        </div>
      </div>
    </div>
  )
}

export default AIEnhanceButton