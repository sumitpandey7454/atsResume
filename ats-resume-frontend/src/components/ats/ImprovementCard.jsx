const ImprovementCard = ({ improvements }) => {
  if (!improvements || improvements.length === 0) return null

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
      <h3 className="font-semibold text-yellow-700 mb-4 flex items-center gap-2">
        <span>💡</span> Suggested Improvements
      </h3>
      <ul className="space-y-3">
        {improvements.map((item, i) => (
          <li key={i}
            className="flex items-start gap-3 text-sm text-gray-600 bg-yellow-50 p-3 rounded-xl">
            <span className="text-yellow-500 font-bold mt-0.5">{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ImprovementCard