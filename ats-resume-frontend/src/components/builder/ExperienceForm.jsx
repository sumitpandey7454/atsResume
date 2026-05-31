import { useResume } from '../../context/ResumeContext'

const emptyExp = {
  companyName: '', position: '', description: '',
  startDate: '', endDate: '', isCurrent: false, category: 'INTERNSHIP'
}

const ExperienceForm = () => {
  const { resumeData, updateResumeData } = useResume()
  const experiences = resumeData.experiences || []

  const addExperience = () => {
    updateResumeData({ experiences: [...experiences, { ...emptyExp }] })
  }

  const updateExperience = (index, field, value) => {
    const updated = experiences.map((e, i) =>
      i === index ? { ...e, [field]: value } : e
    )
    updateResumeData({ experiences: updated })
  }

  const removeExperience = (index) => {
    updateResumeData({
      experiences: experiences.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-2">💼</p>
          <p>No experience added yet</p>
          <p className="text-sm">Add internships or work experience</p>
        </div>
      )}

      {experiences.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-xl p-5 relative">
          <button
            onClick={() => removeExperience(index)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm"
          >
            ✕ Remove
          </button>
          <p className="font-medium text-gray-700 mb-4">
            Experience {index + 1}
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                value={exp.companyName}
                onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
                placeholder="Company Name"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
              <input
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                placeholder="Position/Role"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <select
              value={exp.category}
              onChange={(e) => updateExperience(index, 'category', e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400 bg-white"
            >
              <option value="INTERNSHIP">Internship</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="FREELANCE">Freelance</option>
            </select>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              placeholder="Describe your work, achievements, impact..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                placeholder="Start Date"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
              <input
                value={exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                placeholder="End Date"
                disabled={exp.isCurrent}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400 disabled:bg-gray-50"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exp.isCurrent}
                onChange={(e) => updateExperience(index, 'isCurrent', e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-600">Currently working here</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
      >
        + Add Experience / Internship
      </button>
    </div>
  )
}

export default ExperienceForm