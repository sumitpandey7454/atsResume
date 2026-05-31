import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllResumes, deleteResume } from '../api/resumeAPI'
import Navbar from '../components/common/Navbar'
import toast from 'react-hot-toast'

const MyResumes = () => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await getAllResumes()
      setResumes(response.data)
    } catch (error) {
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return
    try {
      await deleteResume(id)
      setResumes(resumes.filter(r => r.id !== id))
      toast.success('Resume deleted')
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Resumes</h1>
          <button
            onClick={() => navigate('/templates')}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            + New Resume
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📄</p>
            <p className="text-gray-500 text-lg">No resumes yet</p>
            <button
              onClick={() => navigate('/templates')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Create First Resume
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <div key={resume.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {resume.resumeTitle || 'Untitled Resume'}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {resume.jobRole} • {resume.experienceType}
                  </p>
                  {resume.atsScore && (
                    <span className="text-green-600 text-sm font-medium">
                      ATS Score: {resume.atsScore}/100
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/preview/${resume.id}`)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-100"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => navigate(`/builder/${resume.id}`)}
                    className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyResumes