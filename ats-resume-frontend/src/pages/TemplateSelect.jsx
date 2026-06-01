import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import Navbar from '../components/common/Navbar'
import { templateList } from '../data/templateList'

const TemplateSelect = () => {
  const navigate = useNavigate()
  const { setSelectedTemplate, updateResumeData } = useResume()
  const [filter, setFilter] = useState('ALL')
  const [selected, setSelected] = useState(null)

  const filters = ['ALL', 'MINIMAL', 'PROFESSIONAL', 'CREATIVE']

  const filtered = filter === 'ALL'
    ? templateList
    : templateList.filter(t => t.style === filter)

  const handleSelect = (template) => {
    setSelected(template.id)
    setSelectedTemplate(template)
    updateResumeData({ templateId: template.id })
  }

  const handleContinue = () => {
    if (!selected) {
      // use default template
      handleSelect(templateList[0])
    }
    navigate('/builder')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Choose Your Template
          </h1>
          <p className="text-gray-500">
            All templates are ATS-optimized and free
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-3 justify-center mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
          {filtered.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelect(template)}
              className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                selected === template.id
                  ? 'border-blue-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="bg-gray-100 h-56 flex items-center justify-center">
                <span className="text-5xl">{template.preview}</span>
              </div>
              <div className="p-3 bg-white">
                <p className="font-medium text-gray-800 text-sm">
                  {template.name}
                </p>
                <p className="text-xs text-gray-400">{template.style}</p>
              </div>
              {selected === template.id && (
                <div className="bg-blue-600 text-white text-xs text-center py-1">
                  ✓ Selected
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            {selected ? 'Continue with Selected Template' : 'Continue with Default Template'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelect