import { useResume } from '../../context/ResumeContext'

const emptyEdu = {
  degree: '', institution: '', board: '',
  startYear: '', endYear: '', grade: '', gradeType: 'CGPA'
}

const EducationForm = () => {
  const { resumeData, updateResumeData } = useResume()
  const educations = resumeData.educations || []

  const addEducation = () => {
    updateResumeData({ educations: [...educations, { ...emptyEdu }] })
  }

  const updateEducation = (index, field, value) => {
    const updated = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    )
    updateResumeData({ educations: updated })
  }

  const removeEducation = (index) => {
    updateResumeData({
      educations: educations.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      {educations.map((edu, index) => (
        <div key={index}
          className="border border-gray-200 rounded-xl p-5 relative">
          <button
            onClick={() => removeEducation(index)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm"
          >
            ✕ Remove
          </button>
          <p className="font-medium text-gray-700 mb-4">
            Education {index + 1}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Degree/Course
              </label>
              <input
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="B.Tech Computer Science"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Institution
              </label>
              <input
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                placeholder="ABC University"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Board/University
              </label>
              <input
                value={edu.board}
                onChange={(e) => updateEducation(index, 'board', e.target.value)}
                placeholder="AKTU, CBSE, etc."
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Grade Type
              </label>
              <select
                value={edu.gradeType}
                onChange={(e) => updateEducation(index, 'gradeType', e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400 bg-white"
              >
                <option value="CGPA">CGPA</option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="GRADE">Grade</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Grade/Score
              </label>
              <input
                value={edu.grade}
                onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                placeholder="8.5 or 85%"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Start Year
                </label>
                <input
                  value={edu.startYear}
                  onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                  placeholder="2020"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  End Year
                </label>
                <input
                  value={edu.endYear}
                  onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                  placeholder="2024"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
      >
        + Add Education
      </button>
    </div>
  )
}

export default EducationForm