import { useResume } from '../../context/ResumeContext'
import { roles } from '../../data/roles'

const RoleSelector = () => {
  const { resumeData, updateResumeData } = useResume()

  return (
    <div className="space-y-6">

      {/* Resume Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resume Title
        </label>
        <input
          value={resumeData.resumeTitle}
          onChange={(e) => updateResumeData({ resumeTitle: e.target.value })}
          placeholder="e.g. Java Developer Resume - TCS"
          className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Job Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Role <span className="text-red-500">*</span>
        </label>
        <select
          value={resumeData.jobRole}
          onChange={(e) => updateResumeData({ jobRole: e.target.value })}
          className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400 bg-white"
        >
          <option value="">Select your target role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Experience Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Experience Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => updateResumeData({ experienceType: 'FRESHER' })}
            className={`border-2 rounded-xl p-5 cursor-pointer text-center transition-all ${
              resumeData.experienceType === 'FRESHER'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <p className="text-3xl mb-2">🎓</p>
            <p className="font-semibold text-gray-800">Fresher</p>
            <p className="text-xs text-gray-500 mt-1">
              0-1 year experience
            </p>
          </div>
          <div
            onClick={() => updateResumeData({ experienceType: 'EXPERIENCED' })}
            className={`border-2 rounded-xl p-5 cursor-pointer text-center transition-all ${
              resumeData.experienceType === 'EXPERIENCED'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <p className="text-3xl mb-2">💼</p>
            <p className="font-semibold text-gray-800">Experienced</p>
            <p className="text-xs text-gray-500 mt-1">
              1+ years experience
            </p>
          </div>
        </div>
      </div>

      {/* Page Count */}
      <PageSelector />
    </div>
  )
}

import PageSelector from './PageSelector'
export default RoleSelector