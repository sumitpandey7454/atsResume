const Template20 = ({ data }) => {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto p-8">
      <h1 className="text-2xl font-bold">{data?.fullName || 'Your Name'}</h1>
      <p className="text-blue-600">{data?.jobRole || 'Job Role'}</p>
    </div>
  )
}
export default Template20