import { useState, useEffect, useRef, useCallback } from 'react'

export const useTimer = (initialTime = 0, onTimeUpdate) => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(initialTime)
  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsed * 1000
      intervalRef.current = setInterval(() => {
        const newElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setElapsed(newElapsed)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, elapsed])

  const start = useCallback(() => {
    if (!isRunning) setIsRunning(true)
  }, [isRunning])

  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setElapsed(0)
  }, [])

  const saveTime = useCallback(() => {
    setIsRunning(false)
    if (onTimeUpdate) {
      onTimeUpdate(elapsed)
    }
    return elapsed
  }, [elapsed, onTimeUpdate])

  return { elapsed, isRunning, start, pause, reset, saveTime }
}
