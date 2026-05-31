export const exportToDocx = (resumeData) => {
  // Basic text export for now
  // Full DOCX generation handled by backend
  const content = `
${resumeData.fullName}
${resumeData.jobRole}
${resumeData.email} | ${resumeData.phone}
${resumeData.address}

ABOUT ME
${resumeData.aboutMe}

SKILLS
${resumeData.skills?.map(s => s.name).join(', ')}

EDUCATION
${resumeData.educations?.map(e =>
  `${e.degree} - ${e.institution} (${e.startYear}-${e.endYear}) ${e.grade} ${e.gradeType}`
).join('\n')}

PROJECTS
${resumeData.projects?.map(p =>
  `${p.title}\n${p.description}\nTech: ${p.techStack}`
).join('\n\n')}
  `.trim()

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${resumeData.fullName || 'resume'}.txt`
  a.click()
  URL.revokeObjectURL(url)
}