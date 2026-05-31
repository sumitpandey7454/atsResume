const Template03 = ({ data }) => {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto font-sans" id="resume-template">

      {/* Dark Header */}
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold tracking-wide">
          {data?.fullName || 'Your Name'}
        </h1>
        <p className="text-yellow-400 text-lg font-medium mt-1">
          {data?.jobRole || 'Job Role'}
        </p>
        <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-300">
          {data?.email && <span>{data.email}</span>}
          {data?.phone && <span>{data.phone}</span>}
          {data?.address && <span>{data.address}</span>}
          {data?.linkedin && <span>{data.linkedin}</span>}
          {data?.github && <span>{data.github}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* About */}
        {data?.aboutMe && (
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-yellow-400 inline-block"></span>
              Professional Summary
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{data.aboutMe}</p>
          </div>
        )}

        {/* Two column layout */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">

            {/* Projects */}
            {data?.projects?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-yellow-400 inline-block"></span>
                  Projects
                </h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-gray-800 text-sm">{proj.title}</p>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                        {proj.startDate} - {proj.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-medium my-1">{proj.techStack}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {data?.experiences?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-yellow-400 inline-block"></span>
                  Experience
                </h2>
                {data.experiences.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-bold text-gray-800 text-sm">{exp.position}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-xs text-yellow-600 font-medium">{exp.companyName} • {exp.category}</p>
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Education */}
            {data?.educations?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-yellow-400 inline-block"></span>
                  Education
                </h2>
                {data.educations.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-gray-800 text-xs">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-yellow-600">{edu.gradeType}: {edu.grade}</p>
                    <p className="text-xs text-gray-500">{edu.startYear}-{edu.endYear}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {data?.skills?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-yellow-400 inline-block"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {data.skills.map((skill, i) => (
                    <span key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data?.certifications?.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-yellow-400 inline-block"></span>
                  Certifications
                </h2>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-xs font-medium text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template03