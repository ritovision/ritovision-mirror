'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

/** Development-only logger (no-ops in production). */
const devLog = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...(args as []))
  }
}

export const useDeferredActivation = (shouldActivate: boolean): boolean => {
  const isTransitioning = useSelector(
    (state: RootState) => state.menuTransition.isTransitioning
  )
  const [ready, setReady] = useState(false)
  const [wasTransitioning, setWasTransitioning] = useState(false)

  useEffect(() => {
    devLog(
      'useDeferredActivation: shouldActivate =',
      shouldActivate,
      ', isTransitioning =',
      isTransitioning
    )

    if (!shouldActivate) {
      devLog('useDeferredActivation: Not activating because shouldActivate is false')
      setReady(false)
      return
    }

    if (isTransitioning) {
      setWasTransitioning(true)
      devLog('useDeferredActivation: Menu is currently transitioning, waiting')
      setReady(false)
      return
    }

    if (wasTransitioning && !isTransitioning) {
      devLog('useDeferredActivation: Menu transition completed, activating')
      setReady(true)
      return
    }

    if (!wasTransitioning && !isTransitioning) {
      devLog('useDeferredActivation: Activating on initial load (no transitions detected)')
      setReady(true)
      return
    }
  }, [shouldActivate, isTransitioning, wasTransitioning])

  return ready
}
