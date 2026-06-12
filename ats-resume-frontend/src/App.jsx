import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import useVisitorTracking from './hooks/useVisitorTracking'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ATSChecker from './pages/ATSChecker'
import TemplateSelect from './pages/TemplateSelect'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import MyResumes from './pages/MyResumes'
import InterviewPrep from './pages/InterviewPrep'
import LinkedInOptimizer from './pages/LinkedInOptimizer'
import GitHubReadme from './pages/GitHubReadme'
import Admin from './pages/Admin'
import ProtectedRoute from './components/common/ProtectedRoute'
import PrivacyPolicy from './pages/PrivacyPolicy'

// Separate component to use hooks inside AuthProvider
const AppContent = () => {
  const { isAuthenticated } = useAuth()
  useVisitorTracking(isAuthenticated)
  return null
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppContent />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/oauth2/callback" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/templates" element={
            <ProtectedRoute><TemplateSelect /></ProtectedRoute>
          } />
          <Route path="/builder" element={
            <ProtectedRoute><ResumeBuilder /></ProtectedRoute>
          } />
          <Route path="/builder/:id" element={
            <ProtectedRoute><ResumeBuilder /></ProtectedRoute>
          } />
          <Route path="/preview/:id" element={
            <ProtectedRoute><Preview /></ProtectedRoute>
          } />
          <Route path="/my-resumes" element={
            <ProtectedRoute><MyResumes /></ProtectedRoute>
          } />
          <Route path="/interview-prep" element={
            <ProtectedRoute><InterviewPrep /></ProtectedRoute>
          } />
          <Route path="/linkedin-optimizer" element={
            <ProtectedRoute><LinkedInOptimizer /></ProtectedRoute>
          } />
          <Route path="/github-readme" element={
            <ProtectedRoute><GitHubReadme /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute><Admin /></ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App