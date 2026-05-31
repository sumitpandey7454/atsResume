import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getResumeById } from '../api/resumeAPI'
import Navbar from '../components/common/Navbar'
import toast from 'react-hot-toast'

const Preview = () => {
  const { id } = useParams()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getResumeById(id)
      .then(r => setResume(r.data))
      .catch(() => toast.error('Failed to load resume'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Resume Preview</h1>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>

        {resume && (
          <div className="bg-white rounded-2xl shadow-sm p-10"
            id="resume-preview">
            {/* Header */}
            <div className="text-center border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {resume.fullName}
              </h1>
              <p className="text-blue-600 font-medium mt-1">{resume.jobRole}</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                {resume.email && <span>{resume.email}</span>}
                {resume.phone && <span>{resume.phone}</span>}
                {resume.address && <span>{resume.address}</span>}
                {resume.linkedin && <span>{resume.linkedin}</span>}
                {resume.github && <span>{resume.github}</span>}
              </div>
            </div>

            {/* About */}
            {resume.aboutMe && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  ABOUT ME
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {resume.aboutMe}
                </p>
              </div>
            )}

            {/* Education */}
            {resume.educations?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  EDUCATION
                </h2>
                {resume.educations.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.gradeType}: {edu.grade}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resume.skills?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, i) => (
                    <span key={i}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resume.projects?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  PROJECTS
                </h2>
                {resume.projects.map((proj, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{proj.title}</p>
                      <p className="text-sm text-gray-500">
                        {proj.startDate} - {proj.endDate}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {proj.description}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Tech: {proj.techStack}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {resume.experiences?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  EXPERIENCE
                </h2>
                {resume.experiences.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">
                        {exp.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{exp.companyName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {resume.certifications?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  CERTIFICATIONS
                </h2>
                {resume.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-medium text-gray-800">{cert.name}</p>
                    <p className="text-sm text-gray-500">
                      {cert.issuer} • {cert.issueDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Preview