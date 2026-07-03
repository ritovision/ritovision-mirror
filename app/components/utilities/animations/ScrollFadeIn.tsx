'use client'

import React, { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import useMediaQuery from '@/hooks/useMediaQuery'

interface ScrollFadeInProps {
  children: React.ReactNode
  duration?: number
  triggerAmount?: number
  triggerAmountMobile?: number
  triggerAmountDesktop?: number
  mobileBreakpoint?: string
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  duration = 1.2,
  triggerAmount,
  triggerAmountMobile,
  triggerAmountDesktop,
  mobileBreakpoint = '(max-width: 600px)',
}) => {
  const isMobile = useMediaQuery(mobileBreakpoint)

  const resolvedTriggerAmount =
    typeof triggerAmount === 'number'
      ? triggerAmount
      : isMobile
        ? triggerAmountMobile ?? 0.2
        : triggerAmountDesktop ?? 0.4

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: resolvedTriggerAmount, once: true })

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default ScrollFadeIn
