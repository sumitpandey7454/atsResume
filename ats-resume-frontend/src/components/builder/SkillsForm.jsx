import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { generateKeywords, generateTechStack } from '../../api/resumeAPI'
import toast from 'react-hot-toast'

const categories = ['LANGUAGE', 'FRAMEWORK', 'DATABASE', 'TOOL', 'SOFT_SKILL']

const SkillsForm = () => {
  const { resumeData, updateResumeData } = useResume()
  const skills = resumeData.skills || []
  const [newSkill, setNewSkill] = useState({ name: '', category: 'LANGUAGE' })
  const [aiLoading, setAiLoading] = useState(false)

  const addSkill = () => {
    if (!newSkill.name.trim()) return
    updateResumeData({
      skills: [...skills, { ...newSkill }]
    })
    setNewSkill({ name: '', category: 'LANGUAGE' })
  }

  const removeSkill = (index) => {
    updateResumeData({
      skills: skills.filter((_, i) => i !== index)
    })
  }

  const handleAISuggest = async () => {
    if (!resumeData.jobRole) {
      toast.error('Please select job role first')
      return
    }
    setAiLoading(true)
    try {
      const response = await generateTechStack(
        resumeData.jobRole,
        resumeData.experienceType
      )
      const data = JSON.parse(
        response.data.replace(/```json/g, '').replace(/```/g, '').trim()
      )
      const newSkills = [
        ...(data.languages || []).map(s => ({ name: s, category: 'LANGUAGE' })),
        ...(data.frameworks || []).map(s => ({ name: s, category: 'FRAMEWORK' })),
        ...(data.databases || []).map(s => ({ name: s, category: 'DATABASE' })),
        ...(data.tools || []).map(s => ({ name: s, category: 'TOOL' })),
      ]
      updateResumeData({ skills: [...skills, ...newSkills] })
      toast.success('AI skills added!')
    } catch (error) {
      toast.error('Failed to get AI suggestions')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* AI Suggest */}
      <button
        onClick={handleAISuggest}
        disabled={aiLoading}
        className="w-full bg-purple-50 border-2 border-purple-200 text-purple-700 py-3 rounded-xl font-medium hover:bg-purple-100 disabled:opacity-50 transition-colors"
      >
        {aiLoading ? '🤖 Getting AI Suggestions...' : '🤖 AI Suggest Skills for ' + (resumeData.jobRole || 'your role')}
      </button>

      {/* Add Skill */}
      <div className="flex gap-3">
        <input
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add a skill..."
          className="flex-1 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
        />
        <select
          value={newSkill.category}
          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          className="border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400 bg-white"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      {categories.map(category => {
        const categorySkills = skills.filter(s => s.category === category)
        if (categorySkills.length === 0) return null
        return (
          <div key={category}>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
              {category.replace('_', ' ')}
            </p>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skills.indexOf(skill))}
                    className="text-blue-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SkillsForm