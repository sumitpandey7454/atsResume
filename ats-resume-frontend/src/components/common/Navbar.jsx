import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center gap-2"
        >
          <span className="text-2xl">📄</span>
          <span className="text-xl font-bold text-gray-800">
            ATS<span className="text-blue-600">Resume</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate('/ats-checker')}
            className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            ATS Checker
          </button>
          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/my-resumes')}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                My Resumes
              </button>
            </>
          )}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-8 h-8 rounded-full border-2 border-blue-200"
              />
              <span className="text-sm text-gray-700 hidden md:block">
                {user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar