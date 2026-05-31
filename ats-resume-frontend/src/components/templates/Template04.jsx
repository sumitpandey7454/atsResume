const Template04 = ({ data }) => {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto font-sans p-8" id="resume-template">

      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-green-600 pb-4 mb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.fullName || 'Your Name'}
          </h1>
          <p className="text-green-600 font-semibold text-lg mt-1">
            {data?.jobRole || 'Job Role'}
          </p>
        </div>
        <div className="text-right text-xs text-gray-600 space-y-1">
          {data?.email && <p>{data.email}</p>}
          {data?.phone && <p>{data.phone}</p>}
          {data?.address && <p>{data.address}</p>}
          {data?.github && <p>{data.github}</p>}
          {data?.linkedin && <p>{data.linkedin}</p>}
        </div>
      </div>

      {/* About */}
      {data?.aboutMe && (
        <div className="mb-5 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
          <p className="text-sm text-gray-700 leading-relaxed">{data.aboutMe}</p>
        </div>
      )}

      {/* Skills */}
      {data?.skills?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-2">
            ▶ Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i}
                className="bg-green-100 text-green-800 border border-green-300 text-xs px-3 py-1 rounded-full font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data?.educations?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-2">
            ▶ Education
          </h2>
          {data.educations.map((edu, i) => (
            <div key={i} className="mb-3 flex justify-between">
              <div>
                <p className="font-bold text-gray-800 text-sm">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution} • {edu.board}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{edu.startYear} - {edu.endYear}</p>
                <p className="text-xs text-green-600 font-semibold">{edu.gradeType}: {edu.grade}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-2">
            ▶ Projects
          </h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800 text-sm">{proj.title}</p>
                <p className="text-xs text-gray-400">{proj.startDate} - {proj.endDate}</p>
              </div>
              <p className="text-xs text-green-600 font-medium my-0.5">
                Tech Stack: {proj.techStack}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data?.experiences?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-2">
            ▶ Experience
          </h2>
          {data.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <p className="font-bold text-gray-800 text-sm">{exp.position}</p>
                <p className="text-xs text-gray-400">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </p>
              </div>
              <p className="text-xs text-green-600">{exp.companyName} • {exp.category}</p>
              <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data?.certifications?.length > 0 && (
        <d