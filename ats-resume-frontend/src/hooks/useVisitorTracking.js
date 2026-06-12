import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Generate unique session ID per browser tab
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitorSessionId')
  if (!sessionId) {
    sessionId = 'v_' + Math.random().toString(36).substr(2, 9) +
                '_' + Date.now()
    sessionStorage.setItem('visitorSessionId', sessionId)
  }
  return sessionId
}

const useVisitorTracking = (isLoggedIn = false) => {
  const location = useLocation()
  const heartbeatRef = useRef(null)
  const sessionId = getSessionId()

  // Track page visit
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${API_URL}/api/visitors/track`, null, {
          params: {
            sessionId,
            page: location.pathname,
            isLoggedIn,
          }
        })
      } catch (e) {
        // silent fail - dont break app if tracking fails
      }
    }
    trackVisit()
  }, [location.pathname])

  // Heartbeat every 30 seconds
  useEffect(() => {
    const sendHeartbeat = async () => {
      try {
        await axios.post(`${API_URL}/api/visitors/heartbeat`, null, {
          params: { sessionId }
        })
      } catch (e) {
        // silent fail
      }
    }

    // Start heartbeat
    heartbeatRef.current = setInterval(sendHeartbeat, 30000)

    // Cleanup on unmount
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current)
      }
    }
  }, [])
}

export default useVisitorTracking