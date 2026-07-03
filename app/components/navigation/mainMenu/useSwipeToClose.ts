import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toggleMobileMenu } from '@/store/slices/navigation/mobileModalSlice'

export function useSwipeToClose(isOpen: boolean) {
  const dispatch = useDispatch()
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const SWIPE_THRESHOLD = 50

  useEffect(() => {
    if (!isOpen) return

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const { clientX: x, clientY: y } = e.touches[0]
        touchStartRef.current = { x, y }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const { clientX: endX, clientY: endY } = e.changedTouches[0]
      const { x: startX, y: startY } = touchStartRef.current

      const deltaX = endX - startX
      const deltaY = endY - startY

      const isSwipeDown = deltaY > SWIPE_THRESHOLD
      const isSwipeLeft = deltaX < -SWIPE_THRESHOLD

      if (isSwipeDown || isSwipeLeft) {
        dispatch(toggleMobileMenu(false))
      }

      touchStartRef.current = null
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isOpen, dispatch])
}
