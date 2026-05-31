const ScoreCard = ({ result }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match! ✅'
    if (score >= 60) return 'Good Match ⚠️'
    return 'Needs Improvement ❌'
  }

  return (
    <div className="space-y-6">
      
      {/* Score */}
      <div className={`border-2 rounded-2xl p-8 text-center ${getScoreBg(result.score)}`}>
        <p className="text-gray-500 mb-2 text-sm font-medium uppercase tracking-wide">
          ATS Match Score
        </p>
        <p className={`text-7xl font-bold ${getScoreColor(result.score)}`}>
          {result.score}
        </p>
        <p className="text-gray-500 mt-1">out of 100</p>
        <p className={`mt-3 font-semibold ${getScoreColor(result.score)}`}>
          {getScoreLabel(result.score)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Strong Points */}
        {result.strongPoints?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
              <span>✅</span> Strong Points
            </h3>
            <ul className="space-y-2">
              {result.strongPoints.map((point, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Keywords */}
        {result.missingKeywords?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
              <span>🔍</span> Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((keyword, i) => (
                <span key={i}
                  className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-lg text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Improvements */}
        {result.improvements?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-yellow-700 mb-4 flex items-center gap-2">
              <span>💡</span> Improvements
            </h3>
            <ul className="space-y-2">
              {result.improvements.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Overall Feedback */}
        {result.overallFeedback && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <span>📝</span> Overall Feedback
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {result.overallFeedback}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScoreCard