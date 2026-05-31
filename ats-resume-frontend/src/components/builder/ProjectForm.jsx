import { useResume } from '../../context/ResumeContext'

const emptyProject = {
  title: '', description: '', techStack: '',
  projectUrl: '', githubUrl: '', startDate: '', endDate: ''
}

const ProjectForm = () => {
  const { resumeData, updateResumeData } = useResume()
  const projects = resumeData.projects || []

  const addProject = () => {
    updateResumeData({ projects: [...projects, { ...emptyProject }] })
  }

  const updateProject = (index, field, value) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    )
    updateResumeData({ projects: updated })
  }

  const removeProject = (index) => {
    updateResumeData({ projects: projects.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-xl p-5 relative">
          <button
            onClick={() => removeProject(index)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm"
          >
            ✕ Remove
          </button>
          <p className="font-medium text-gray-700 mb-4">Project {index + 1}</p>
          <div className="space-y-4">
            <input
              value={project.title}
              onChange={(e) => updateProject(index, 'title', e.target.value)}
              placeholder="Project Title"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
            <textarea
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              placeholder="Describe your project — what problem it solves, your role, impact..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-blue-400"
            />
            <input
              value={project.techStack}
              onChange={(e) => updateProject(index, 'techStack', e.target.value)}
              placeholder="Tech Stack (e.g. React, Spring Boot, MySQL)"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={project.githubUrl}
                onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                placeholder="GitHub URL"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
              <input
                value={project.projectUrl}
                onChange={(e) => updateProject(index, 'projectUrl', e.target.value)}
                placeholder="Live URL"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
              <input
                value={project.startDate}
                onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                placeholder="Start (e.g. Jan 2024)"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
              <input
                value={project.endDate}
                onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                placeholder="End (e.g. Mar 2024)"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addProject}
        className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
      >
        + Add Project
      </button>
    </div>
  )
}

export default ProjectForm