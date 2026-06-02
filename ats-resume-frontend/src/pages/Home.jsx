import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Home = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Build Resumes That
            <span className="text-blue-600"> Beat ATS </span>
            Systems
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Free ATS score checker, AI-powered resume builder,
            25+ templates — everything a student needs to land their dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/ats-checker')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Check ATS Score Free
            </button>
            <button
              onClick={() => isAuthenticated
                ? navigate('/templates')
                : navigate('/login')}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Build My Resume
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Everything You Need to Get Hired
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          100% Free for Students
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          No credit card. No hidden fees. Just results.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
        >
          Get Started Free
        </button>
      </section>

      <Footer />
    </div>
  )
}

const features = [
  {
    icon: '🎯',
    title: 'ATS Score Checker',
    description: 'Paste your resume and job description. Get instant ATS score with missing keywords and improvements.',
  },
  {
    icon: '🤖',
    title: 'AI Resume Builder',
    description: 'Select your role, fill details, and let AI generate strong keywords, about me, and tech stack.',
  },
  {
    icon: '🎨',
    title: '25+ ATS Templates',
    description: 'Choose from minimal, professional, and creative templates — all optimized for ATS systems.',
  },
  {
    icon: '💼',
    title: 'Role-Based Keywords',
    description: 'Get exact keywords recruiters look for in your specific role — Java, MERN, .NET, and 50+ more.',
  },
  {
    icon: '🎤',
    title: 'Interview Prep',
    description: 'Generate top 10 interview questions based on YOUR resume with suggested answers.',
  },
  {
    icon: '🔗',
    title: 'LinkedIn Optimizer',
    description: 'Get AI-generated LinkedIn About section and headline based on your resume.',
  },
]

export default Home