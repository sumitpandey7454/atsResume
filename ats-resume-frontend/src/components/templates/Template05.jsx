const Template05 = ({ data }) => {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto font-sans" id="resume-template">

      {/* Purple Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{data?.fullName || 'Your Name'}</h1>
            <p className="text-purple-200 text-lg mt-1">{data?.jobRole || 'Job Role'}</p>
          </div>
          <div className="text-right text-xs text-purple-200 space-y-1">
            {data?.email && <p>{data.email}</p>}
            {data?.phone && <p>{data.phone}</p>}
            {data?.github && <p>{data.github}</p>}
            {data?.linkedin && <p>{data.linkedin}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* About */}
        {data?.aboutMe && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest border-b-2 border-purple-200 pb-1 mb-2">
              About Me
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{data.aboutMe}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div>
            {/* Education */}
            {data?.educations?.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest border-b-2 border-purple-200 pb-1 mb-2">
                  Education
                </h2>
                {data.educations.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-bold text-gray-800 text-sm">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-purple-600">{edu.gradeType}: {edu.grade}</p>
                    <p className="text-xs text-gray-400">{edu.startYear}-{edu.endYear}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {data?.skills?.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest border-b-2 border-purple-200 pb-1 mb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((skill, i) => (
                    <span key={i}
                      className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data?.certifications?.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest border-b-2 border-purple-200 pb-1 mb-2">
                  Certifications
                </h2>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-xs font-medium text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.issuer} • {cert.issueDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Projects */}
            {data?.projects?.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest border-b-2 border-purple-200 pb-1 mb-2">
                  Projects
                </h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-bold text-gray-800 text-sm">{proj.title}</p>
                    <p className="text-xs text-purple-600 my-0.5">{proj.techStack}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {data?.experiences?.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest border-b-2 border-purple-200 pb-1 mb-2">
                  Experience
                </h2>
                {data.experiences.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-bold text-gray-800 text-sm">{exp.position}</p>
                    <p className="text-xs text-purple-600">{exp.companyName}</p>
                    <p className="text-xs text-gray-400">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
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

export default Template05