import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: June 2026</p>

        {[
          {
            title: '1. Information We Collect',
            content: 'We collect your name, email address and profile picture when you sign in with Google OAuth2. This information is used only to provide you with access to ATSResume services and personalize your resume building experience.'
          },
          {
            title: '2. How We Use Your Information',
            content: 'Your information is used to create and manage your account, save your resumes, and provide AI-powered features. We use Google Gemini AI to generate resume content based on information you provide. We do not sell or share your personal data with third parties.'
          },
          {
            title: '3. Resume Data',
            content: 'All resume data you enter (education, projects, skills, experience) is stored securely in our database and is only accessible to you when logged in. Admin users can see aggregate statistics but not individual resume content.'
          },
          {
            title: '4. AI Processing',
            content: 'When you use AI features (ATS checking, About Me generation, etc.), your resume text is sent to Google Gemini API for processing. This is governed by Google\'s privacy policy. We do not store the prompts sent to Gemini.'
          },
          {
            title: '5. Data Storage & Security',
            content: 'Your data is stored securely on our servers with industry standard security measures. We use JWT tokens for authentication and HTTPS for all data transmission. Passwords are never stored as we use Google OAuth2 only.'
          },
          {
            title: '6. Cookies & Local Storage',
            content: 'We store your JWT authentication token in browser localStorage to keep you logged in. No third-party tracking cookies are used. You can clear this at any time by logging out.'
          },
          {
            title: '7. Your Rights',
            content: 'You can delete your account and all associated data at any time by contacting us. You can also delete individual resumes from the My Resumes page. We will process deletion requests within 30 days.'
          },
          {
            title: '8. Contact Us',
            content: 'If you have any questions about this Privacy Policy or want to request data deletion, please contact us at: sumitpandey7454@gmail.com'
          },
        ].map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {section.content}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy