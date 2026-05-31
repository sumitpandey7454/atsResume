import { useResume } from '../../context/ResumeContext'

const emptyCert = {
  name: '', issuer: '', issueDate: '', expiryDate: '', credentialUrl: ''
}

const CertificationForm = () => {
  const { resumeData, updateResumeData } = useResume()
  const certifications = resumeData.certifications || []

  const addCertification = () => {
    updateResumeData({
      certifications: [...certifications, { ...emptyCert }]
    })
  }

  const updateCertification = (index, field, value) => {
    const updated = certifications.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    )
    updateResumeData({ certifications: updated })
  }

  const removeCertification = (index) => {
    updateResumeData({
      certifications: certifications.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      {certifications.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-2">📜</p>
          <p>No certifications added yet</p>
          <p className="text-sm">Add AWS, Google, Coursera certifications</p>
        </div>
      )}

      {certifications.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-xl p-5 relative">
          <button
            onClick={() => removeCertification(index)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm"
          >
            ✕ Remove
          </button>
          <p className="font-medium text-gray-700 mb-4">
            Certification {index + 1}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={cert.name}
              onChange={(e) => updateCertification(index, 'name', e.target.value)}
              placeholder="Certification Name"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              value={cert.issuer}
              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
              placeholder="Issuer (e.g. Google, AWS, Coursera)"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              value={cert.issueDate}
              onChange={(e) => updateCertification(index, 'issueDate', e.target.value)}
              placeholder="Issue Date (e.g. Jan 2024)"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              value={cert.expiryDate}
              onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
              placeholder="Expiry Date (optional)"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              value={cert.credentialUrl}
              onChange={(e) => updateCertification(index, 'credentialUrl', e.target.value)}
              placeholder="Credential URL"
              className="md:col-span-2 w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
      >
        + Add Certification
      </button>
    </div>
  )
}

export default CertificationForm