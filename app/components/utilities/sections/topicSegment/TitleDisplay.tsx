'use client'

import React from 'react'
import styles from './TitleDisplay.module.css'
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn'

interface TitleDisplayProps {
  /** If you only need plain text, you can still pass `text`. */
  text?: string
  /** Or pass JSX children for fine-grained styling. */
  children?: React.ReactNode
  /** Optional link URL. If provided, clicking opens this URL in the same window. */
  href?: string
  className?: string
  fadeIn?: boolean
  duration?: number
  triggerAmount?: number
  triggerAmountMobile?: number
  triggerAmountDesktop?: number
  mobileBreakpoint?: string
  borderColor?: string
  backgroundColor?: string
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({
  text,
  children,
  href,
  className,
  fadeIn = true,
  duration,
  triggerAmount,
  triggerAmountMobile,
  triggerAmountDesktop,
  mobileBreakpoint,
  borderColor = 'var(--secondary-blue)',
  backgroundColor = 'transparent',
}) => {
  const content = (
    <h3 className={styles.title}>
      {children ?? text}
    </h3>
  )

  const inner = (
    <div
      className={`${styles.container} ${className || ''}`}
      style={{ borderColor, backgroundColor }}
    >
      {fadeIn ? (
        <ScrollFadeIn
          duration={duration}
          triggerAmount={triggerAmount}
          triggerAmountMobile={triggerAmountMobile}
          triggerAmountDesktop={triggerAmountDesktop}
          mobileBreakpoint={mobileBreakpoint}
        >
          {content}
        </ScrollFadeIn>
      ) : (
        content
      )}
    </div>
  )

  return href ? (
    <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      {inner}
    </a>
  ) : (
    inner
  )
}

export default TitleDisplay
