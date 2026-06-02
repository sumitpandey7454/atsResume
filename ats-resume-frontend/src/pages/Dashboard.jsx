import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

// Wrap page div with flex flex-col min-h-screen
// Add <Footer /> at the bottom before closing div
const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const actions = [
    {
      icon: '🎯',
      title: 'Check ATS Score',
      description: 'Upload resume and check ATS score',
      path: '/ats-checker',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      icon: '✨',
      title: 'Build New Resume',
      description: 'Create AI-powered resume',
      path: '/templates',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      icon: '📄',
      title: 'My Resumes',
      description: 'View and manage saved resumes',
      path: '/my-resumes',
      color: 'bg-green-50 border-green-200',
    },
    {
      icon: '🎤',
      title: 'Interview Prep',
      description: 'Generate interview questions',
      path: '/interview-prep',
      color: 'bg-yellow-50 border-yellow-200',
    },
    {
      icon: '🔗',
      title: 'LinkedIn Optimizer',
      description: 'Optimize your LinkedIn profile',
      path: '/linkedin-optimizer',
      color: 'bg-indigo-50 border-indigo-200',
    },
    {
      icon: '🐙',
      title: 'GitHub README',
      description: 'Generate GitHub profile README',
      path: '/github-readme',
      color: 'bg-gray-50 border-gray-200',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-500 mt-2">
                What would you like to do today?
              </p>
            </div>
            {/* Admin Badge */}
            {user?.role === 'ADMIN' && (
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  👑 Admin
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Admin Panel Card — only for ADMIN */}
        {user?.role === 'ADMIN' && (
          <div
            onClick={() => navigate('/admin')}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-all duration-200 mb-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">👑</span>
              <div>
                <h3 className="text-lg font-semibold text-red-700">
                  Admin Panel
                </h3>
                <p className="text-red-500 text-sm">
                  View all users, resumes and platform stats
                </p>
              </div>
              <span className="ml-auto text-red-400 text-xl">→</span>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={() => navigate(action.path)}
              className={`${action.color} border-2 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-all duration-200`}
            >
              <div className="text-4xl mb-3">{action.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {action.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {action.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard