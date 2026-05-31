import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { loginWithGoogle, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to ATS Resume
          </h1>
          <p className="text-gray-500">
            Build ATS-optimized resumes and land your dream job
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-green-500 text-xl">✓</span>
            <span>Free ATS Score Checker</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-green-500 text-xl">✓</span>
            <span>25+ ATS-Friendly Templates</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-green-500 text-xl">✓</span>
            <span>AI-Powered Resume Builder</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-green-500 text-xl">✓</span>
            <span>Interview Questions Generator</span>
          </div>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-6 text-gray-700 font-medium hover:border-blue-400 hover:shadow-md transition-all duration-200"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}

export default Login