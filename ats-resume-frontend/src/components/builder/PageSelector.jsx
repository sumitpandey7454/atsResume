import { useResume } from '../../context/ResumeContext'

const PageSelector = () => {
  const { resumeData, updateResumeData } = useResume()

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Resume Length
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={() => updateResumeData({ pageCount: 1 })}
          className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-all ${
            resumeData.pageCount === 1
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-2xl mb-1">📄</p>
          <p className="font-semibold text-gray-800 text-sm">1 Page</p>
          <p className="text-xs text-gray-500">Recommended for freshers</p>
        </div>
        <div
          onClick={() => updateResumeData({ pageCount: 2 })}
          className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-all ${
            resumeData.pageCount === 2
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-2xl mb-1">📋</p>
          <p className="font-semibold text-gray-800 text-sm">2 Pages</p>
          <p className="text-xs text-gray-500">For experienced candidates</p>
        </div>
      </div>
    </div>
  )
}

export default PageSelector