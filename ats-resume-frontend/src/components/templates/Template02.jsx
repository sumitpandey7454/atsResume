const Template02 = ({ data }) => {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto flex font-sans" id="resume-template">

      {/* Left Sidebar */}
      <div className="w-[35%] bg-blue-800 text-white p-6 min-h-screen">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3">
            {data?.fullName?.charAt(0) || 'U'}
          </div>
          <h1 className="text-xl font-bold">{data?.fullName || 'Your Name'}</h1>
          <p className="text-blue-200 text-sm mt-1">{data?.jobRole || 'Job Role'}</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-200 border-b border-blue-600 pb-1 mb-3">
            Contact
          </h2>
          <div className="space-y-2 text-xs">
            {data?.email && <p>📧 {data.email}</p>}
            {data?.phone && <p>📞 {data.phone}</p>}
            {data?.address && <p>📍 {data.address}</p>}
            {data?.linkedin && <p>🔗 {data.linkedin}</p>}
            {data?.github && <p>💻 {data.github}</p>}
          </div>
        </div>

        {/* Skills */}
        {data?.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-200 border-b border-blue-600 pb-1 mb-3">
              Skills
            </h2>
            <div className="space-y-1">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
                  <span className="text-xs">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data?.certifications?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-200 border-b border-blue-600 pb-1 mb-3">
              Certifications
            </h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="text-xs font-medium">{cert.name}</p>
                <p className="text-xs text-blue-200">{cert.issuer} • {cert.issueDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-6">

        {/* About */}
        {data?.aboutMe && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-800 pb-1 mb-2">
              About Me
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{data.aboutMe}</p>
          </div>
        )}

        {/* Education */}
        {data?.educations?.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-800 pb-1 mb-2">
              Education
            </h2>
            {data.educations.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800 text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.startYear}-{edu.endYear}</p>
                </div>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-blue-600 font-medium">{edu.gradeType}: {edu.grade}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data?.projects?.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-800 pb-1 mb-2">
              Projects
            </h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-blue-200">
                <p className="font-semibold text-gray-800 text-sm">{proj.title}</p>
                <p className="text-xs text-blue-600 mb-1">{proj.techStack}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data?.experiences?.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-800 pb-1 mb-2">
              Experience
            </h2>
            {data.experiences.map((exp, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-blue-200">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800 text-sm">{exp.position}</p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-xs text-blue-600">{exp.companyName}</p>
                <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Template02