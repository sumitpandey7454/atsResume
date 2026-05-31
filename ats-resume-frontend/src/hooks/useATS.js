import { useState } from 'react'
import { checkATSText, checkATSFile } from '../api/atsAPI'
import toast from 'react-hot-toast'

const useATS = () => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkFromText = async (resumeText, jobDescription) => {
    setLoading(true)
    try {
      const response = await checkATSText({ resumeText, jobDescription })
      setResult(response.data)
      toast.success('ATS check complete!')
      return response.data
    } catch (error) {
      toast.error('ATS check failed')
    } finally {
      setLoading(false)
    }
  }

  const checkFromFile = async (file, jobDescription) => {
    setLoading(true)
    try {
      const response = await checkATSFile(file, jobDescription)
      setResult(response.data)
      toast.success('ATS check complete!')
      return response.data
    } catch (error) {
      toast.error('ATS check failed')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => setResult(null)

  return { result, loading, checkFromText, checkFromFile, reset }
}

export default useATS