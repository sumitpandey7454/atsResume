import API from './axios'

export const generateInterviewQuestions = (resumeText, jobRole) =>
  API.post('/api/interview/generate', null, {
    params: { resumeText, jobRole },
  })