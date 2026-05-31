import API from './axios'

export const getProfile = () => API.get('/api/auth/me')

export const healthCheck = () => API.get('/api/auth/health')