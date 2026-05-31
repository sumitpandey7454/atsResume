const KeywordList = ({ keywords, type }) => {
  if (!keywords || keywords.length === 0) return null

  const styles = {
    missing: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      title: '🔍 Missing Keywords',
      titleColor: 'text-red-600',
    },
    strong: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      title: '✅ Strong Keywords',
      titleColor: 'text-green-700',
    },
  }

  const style = styles[type] || styles.missing

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className={`font-semibold mb-4 ${style.titleColor}`}>
        {style.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, i) => (
          <span key={i}
            className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-lg text-sm font-medium`}>
            {keyword}
          </span>
        ))}
      </div>
    </div>
  )
}

export default KeywordList