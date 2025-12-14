'use client'
import React, { useEffect, useState } from 'react'
import styles from './ImageRandomizer.module.css'
import { useRandomPick } from '@/utilities/hooks/useRandomPick'

const imagePaths = [
  '/images/pages/projects/fansite/randomization/random1.jpg',
  '/images/pages/projects/fansite/randomization/random2.jpg',
  '/images/pages/projects/fansite/randomization/random3.webp',
  '/images/pages/projects/fansite/randomization/random4.jpg',
  '/images/pages/projects/fansite/randomization/random5.jpg',
  '/images/pages/projects/fansite/randomization/random6.jpg',
  '/images/pages/projects/fansite/randomization/random7.jpg',
  '/images/pages/projects/fansite/randomization/random8.jpg',
  '/images/pages/projects/fansite/randomization/random9.jpg',
  '/images/pages/projects/fansite/randomization/random10.jpg'
]

export default function ImageRandomizer() {
  const { item: selectedImage } = useRandomPick<string>(imagePaths)
  const [visible, setVisible] = useState(false)
  const [, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (visible) return

      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY + windowHeight

      const element = document.querySelector(`.${styles.wrapper}`)
      if (!element) return

      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const threshold = window.innerWidth < 768 ? 0.8 : 0.9

      if (scrollPosition > elementPosition * threshold) {
        setVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible])

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${visible ? styles.visible : ''}`}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Randomized Display"
            className={styles.image}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Image failed to load', selectedImage)
              e.currentTarget.src = '/images/fallback-image.jpg'
            }}
          />
        )}
      </div>
    </div>
  )
}
