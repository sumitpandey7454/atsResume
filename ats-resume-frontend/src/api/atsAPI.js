import API from './axios'

export const checkATSText = (data) =>
  API.post('/api/ats/check', data)

export const checkATSFile = (file, jobDescription) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('jobDescription', jobDescription)
  return API.post('/api/ats/check-file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const extractJDKeywords = (jobDescription) =>
  API.post('/api/ats/extract-jd-keywords', null, {
    params: { jobDescription },
  })

export const improveResumeLine = (line, jobRole) =>
  API.post('/api/ats/improve-line', null, {
    params: { line, jobRole },
  })