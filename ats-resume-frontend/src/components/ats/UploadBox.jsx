import { useDropzone } from 'react-dropzone'

const UploadBox = ({ file, setFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="text-center">
          <p className="text-4xl mb-3">📄</p>
          <p className="font-medium text-gray-800">{file.name}</p>
          <p className="text-sm text-gray-500 mt-1">
            {(file.size / 1024).toFixed(1)} KB
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Click to change file
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-4xl mb-3">📁</p>
          <p className="font-medium text-gray-700">
            {isDragActive ? 'Drop file here' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Supports PDF and DOCX
          </p>
        </div>
      )}
    </div>
  )
}

export default UploadBox