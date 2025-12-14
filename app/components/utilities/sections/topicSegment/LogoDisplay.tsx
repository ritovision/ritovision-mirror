'use client'

import React from 'react'
import Link from 'next/link'
import styles from './LogoDisplay.module.css'
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn'

interface LogoDisplayProps {
  src: string
  alt?: string
  href?: string
  borderColor?: string
  backgroundColor?: string
  fadeIn?: boolean
  duration?: number
  triggerAmount?: number
  triggerAmountMobile?: number
  triggerAmountDesktop?: number
  mobileBreakpoint?: string
  boxShadow?: string
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({
  src,
  alt = 'logo',
  href,
  borderColor = 'var(--secondary-blue)',
  backgroundColor = 'transparent',
  fadeIn = true,
  duration,
  triggerAmount,
  triggerAmountMobile,
  triggerAmountDesktop,
  mobileBreakpoint,
  boxShadow = '0 18px 20px rgba(0, 0, 0, 0.15)',
}) => {
  const imgElement = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={styles.image}
    />
  )

  const inner = (
    <div
      className={styles.container}
      style={{
        borderColor,
        backgroundColor,
        boxShadow,
      }}
    >
      {fadeIn ? (
        <ScrollFadeIn
          duration={duration}
          triggerAmount={triggerAmount}
          triggerAmountMobile={triggerAmountMobile}
          triggerAmountDesktop={triggerAmountDesktop}
          mobileBreakpoint={mobileBreakpoint}
        >
          {imgElement}
        </ScrollFadeIn>
      ) : (
        imgElement
      )}
    </div>
  )

  return href ? (
    <Link href={href} style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>
      {inner}
    </Link>
  ) : (
    inner
  )
}

export default LogoDisplay
