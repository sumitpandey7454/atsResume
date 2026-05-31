import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getProfile } from '../api/authAPI'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()    // ← THIS LINE WAS MISSING

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const callbackToken = params.get('token')

    if (callbackToken) {
      localStorage.setItem('token', callbackToken)
      setToken(callbackToken)
      navigate('/dashboard')
    }
  }, [location])

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await getProfile()
      setUser(response.data)
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const loginWithGoogle = () => {
  window.location.href =
    'http://localhost:8080/oauth2/authorization/google'
}

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      logout,
      loginWithGoogle,
      isAuthenticated: !!token && !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}