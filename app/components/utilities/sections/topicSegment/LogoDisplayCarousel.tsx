// app\components\utilities\sections\topicSegment\LogoDisplayCarousel.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn'
import styles from './LogoDisplayCarousel.module.css'

interface LogoDisplayCarouselProps {
  images: string[]
  /** Optional per-image URLs; if provided, only the current image is clickable. */
  links?: string[]
  alt?: string
  interval?: number
  fadeIn?: boolean
  duration?: number
  triggerAmountMobile?: number
  triggerAmountDesktop?: number
  mobileBreakpoint?: string
  borderColor?: string
  backgroundColor?: string
  boxShadow?: string
}

const LogoDisplayCarousel: React.FC<LogoDisplayCarouselProps> = ({
  images,
  links,
  alt = 'logo',
  interval = 2000,
  fadeIn = true,
  duration,
  triggerAmountMobile,
  triggerAmountDesktop,
  mobileBreakpoint,
  borderColor = 'var(--secondary-blue)',
  backgroundColor = 'transparent',
  boxShadow = '0 18px 20px rgba(0, 0, 0, 0.15)',
}) => {
  const [index, setIndex] = useState(0)

  // cycle slides
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  // build the image element
  const imageEl = (
    <AnimatePresence mode="wait">
      <motion.img
        key={images[index]}
        src={images[index]}
        alt={`${alt} ${index}`}
        loading="lazy"
        className={styles.image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </AnimatePresence>
  )

  // wrap in fade-in if requested
  const inner = (
    <div
      className={styles.container}
      style={{ borderColor, backgroundColor, boxShadow }}
    >
      {fadeIn ? (
        <ScrollFadeIn
          duration={duration}
          triggerAmountMobile={triggerAmountMobile}
          triggerAmountDesktop={triggerAmountDesktop}
          mobileBreakpoint={mobileBreakpoint}
        >
          {imageEl}
        </ScrollFadeIn>
      ) : (
        imageEl
      )}
    </div>
  )

  // only wrap in a link if there's a URL for the current index
  const currentLink = links?.[index]
  return currentLink ? (
    <Link
      href={currentLink}
      style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}
    >
      {inner}
    </Link>
  ) : (
    inner
  )
}

export default LogoDisplayCarousel
