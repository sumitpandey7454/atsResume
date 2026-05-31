import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import { createResume } from '../api/resumeAPI'
import Navbar from '../components/common/Navbar'
import PersonalDetails from '../components/builder/PersonalDetails'
import EducationForm from '../components/builder/EducationForm'
import ProjectForm from '../components/builder/ProjectForm'
import ExperienceForm from '../components/builder/ExperienceForm'
import CertificationForm from '../components/builder/CertificationForm'
import SkillsForm from '../components/builder/SkillsForm'
import RoleSelector from '../components/builder/RoleSelector'
import PageSelector from '../components/builder/PageSelector'
import AIEnhanceButton from '../components/builder/AIEnhanceButton'
import toast from 'react-hot-toast'

const steps = [
  { id: 1, title: 'Role & Type', icon: '🎯' },
  { id: 2, title: 'Personal', icon: '👤' },
  { id: 3, title: 'Education', icon: '🎓' },
  { id: 4, title: 'Skills', icon: '💻' },
  { id: 5, title: 'Projects', icon: '🚀' },
  { id: 6, title: 'Experience', icon: '💼' },
  { id: 7, title: 'Certifications', icon: '📜' },
  { id: 8, title: 'AI Enhance', icon: '🤖' },
]

const ResumeBuilder = () => {
  const navigate = useNavigate()
  const { resumeData, updateResumeData, currentStep, setCurrentStep } = useResume()
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    if (!resumeData.fullName || !resumeData.jobRole) {
      toast.error('Please fill name and job role')
      return
    }
    setLoading(true)
    try {
      const response = await createResume(resumeData)
      toast.success('Resume saved successfully!')
      navigate(`/preview/${response.data.id}`)
    } catch (error) {
      toast.error('Failed to save resume')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <RoleSelector />
      case 2: return <PersonalDetails />
      case 3: return <EducationForm />
      case 4: return <SkillsForm />
      case 5: return <ProjectForm />
      case 6: return <ExperienceForm />
      case 7: return <CertificationForm />
      case 8: return <AIEnhanceButton />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                onClick={() => setCurrentStep(step.id)}
                className={`flex flex-col items-center cursor-pointer min-w-max`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : currentStep > step.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <p className={`text-xs mt-1 font-medium ${
                  currentStep === step.id
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-8 mx-1 transition-colors ${
                  currentStep > step.id
                    ? 'bg-green-400'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {steps[currentStep - 1].icon} {steps[currentStep - 1].title}
          </h2>
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="bg-white border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            ← Back
          </button>

          <span className="text-sm text-gray-400">
            Step {currentStep} of {steps.length}
          </span>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : '✓ Save & Preview'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder