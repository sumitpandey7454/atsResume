import { useResume } from '../../context/ResumeContext'

const PersonalDetails = () => {
  const { resumeData, updateResumeData } = useResume()

  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'Sumit Pandey', required: true },
    { key: 'email', label: 'Email', placeholder: 'sumit@gmail.com', required: true },
    { key: 'phone', label: 'Phone', placeholder: '+91 9876543210', required: true },
    { key: 'address', label: 'Address', placeholder: 'Prayagraj, Uttar Pradesh' },
    { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/sumitpandey' },
    { key: 'github', label: 'GitHub URL', placeholder: 'github.com/sumitpandey7454' },
    { key: 'portfolio', label: 'Portfolio URL', placeholder: 'sumitpandey.vercel.app' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {fields.map((field) => (
        <div key={field.key}
          className={field.key === 'fullName' ? 'md:col-span-2' : ''}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            value={resumeData[field.key] || ''}
            onChange={(e) => updateResumeData({ [field.key]: e.target.value })}
            placeholder={field.placeholder}
            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400 text-sm"
          />
        </div>
      ))}
    </div>
  )
}

export default PersonalDetails