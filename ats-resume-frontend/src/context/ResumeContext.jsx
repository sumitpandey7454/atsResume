import { createContext, useContext, useState } from 'react'

const ResumeContext = createContext(null)

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    resumeTitle: '',
    jobRole: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    aboutMe: '',
    experienceType: 'FRESHER',
    templateId: 1,
    pageCount: 1,
    educations: [],
    projects: [],
    experiences: [],
    certifications: [],
    skills: [],
  })

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)

  const updateResumeData = (newData) => {
    setResumeData(prev => ({ ...prev, ...newData }))
  }

  const resetResumeData = () => {
    setResumeData({
      resumeTitle: '',
      jobRole: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      portfolio: '',
      aboutMe: '',
      experienceType: 'FRESHER',
      templateId: 1,
      pageCount: 1,
      educations: [],
      projects: [],
      experiences: [],
      certifications: [],
      skills: [],
    })
  }

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateResumeData,
      resetResumeData,
      selectedTemplate,
      setSelectedTemplate,
      currentStep,
      setCurrentStep,
    }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider')
  }
  return context
}