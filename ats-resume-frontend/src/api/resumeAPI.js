import API from './axios'

export const createResume = (data) =>
  API.post('/api/resume/create', data)

export const getAllResumes = () =>
  API.get('/api/resume/all')

export const getResumeById = (id) =>
  API.get(`/api/resume/${id}`)

export const deleteResume = (id) =>
  API.delete(`/api/resume/${id}`)

export const generateAboutMe = (name, jobRole, skills, experienceType) =>
  API.post('/api/resume/generate-about-me', null, {
    params: { name, jobRole, skills, experienceType },
  })

export const generateKeywords = (jobRole) =>
  API.post('/api/resume/generate-keywords', null, {
    params: { jobRole },
  })

export const generateTechStack = (jobRole, experienceType) =>
  API.post('/api/resume/generate-techstack', null, {
    params: { jobRole, experienceType },
  })

export const generateLinkedIn = (resumeText) =>
  API.post('/api/resume/generate-linkedin', null, {
    params: { resumeText },
  })

export const generateGithubReadme = (name, skills, projects) =>
  API.post('/api/resume/generate-github-readme', null, {
    params: { name, skills, projects },
  })