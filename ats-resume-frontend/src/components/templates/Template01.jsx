const Template01 = ({ data }) => {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto p-10 font-sans text-gray-800"
      id="resume-template">

      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900">
          {data?.fullName || 'Your Name'}
        </h1>
        <p className="text-blue-600 font-semibold mt-1 text-lg">
          {data?.jobRole || 'Job Role'}
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm text-gray-600">
          {data?.email && <span>📧 {data.email}</span>}
          {data?.phone && <span>📞 {data.phone}</span>}
          {data?.address && <span>📍 {data.address}</span>}
          {data?.linkedin && <span>🔗 {data.linkedin}</span>}
          {data?.github && <span>💻 {data.github}</span>}
        </div>
      </div>

      {/* About Me */}
      {data?.aboutMe && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{data.aboutMe}</p>
        </div>
      )}

      {/* Skills */}
      {data?.skills?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-1">
            {['LANGUAGE', 'FRAMEWORK', 'DATABASE', 'TOOL'].map(cat => {
              const catSkills = data.skills.filter(s => s.category === cat)
              if (!catSkills.length) return null
              return (
                <div key={cat} className="text-sm">
                  <span className="font-semibold text-gray-700">
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}s:{' '}
                  </span>
                  <span className="text-gray-600">
                    {catSkills.map(s => s.name).join(', ')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {data?.educations?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {data.educations.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  {edu.board && <p className="text-gray-500 text-xs">{edu.board}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{edu.startYear} - {edu.endYear}</p>
                  <p className="text-sm font-medium text-blue-600">
                    {edu.gradeType}: {edu.grade}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-800 text-sm">{proj.title}</p>
                <p className="text-xs text-gray-500">{proj.startDate} - {proj.endDate}</p>
              </div>
              <p className="text-xs text-blue-600 mb-1">Tech: {proj.techStack}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
              {proj.githubUrl && (
                <p className="text-xs text-blue-500 mt-1">GitHub: {proj.githubUrl}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data?.experiences?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          {data.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{exp.position}</p>
                  <p className="text-gray-600 text-sm">{exp.companyName} • {exp.category}</p>
                </div>
                <p className="text-xs text-gray-500">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data?.certifications?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
            Certifications
          </h2>
          {data.certifications.map((cert, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
              <div>
                <span className="font-medium text-gray-800">{cert.name}</span>
                <span className="text-gray-500"> — {cert.issuer}</span>
              </div>
              <span className="text-gray-500 text-xs">{cert.issueDate}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Template01