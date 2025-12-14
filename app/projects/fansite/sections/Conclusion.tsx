'use client'

import React, { useRef, useEffect, useState } from 'react'
import styles from './Conclusion.module.css'

export default function Conclusion() {
  const ref = useRef<HTMLDivElement>(null)
  const [showBg, setShowBg] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isMobile = window.innerWidth < 730
    const rootMargin = `${isMobile ? '-20%' : '-10%'} 0px 0px 0px`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBg(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      id="conclusion"
      ref={ref}
      className={`defaulttopspace blueglow ${styles.container}`}
    >
      <h2 className={styles.title}>Conclusion</h2>

      <img
        src="/images/pages/projects/fansite/conclusion.jpg"
        alt="Conclusion background"
        className={`${styles.bgImage} ${showBg ? styles.showBg : ''}`}
      />

      <div className={styles.content}>
        <p>
          What began as a personal tribute evolved into a strategic, high-performance digital platform that has organically captured public attention, earned mainstream recognition, and stood the test of time.
          <br /><br />
          This project demonstrates a unique blend of product thinking, technical execution, and brand sensitivity. From the frontend architecture to the content curation, every element was intentionally designed to honor a complex personal brand while showcasing best-in-class digital craftsmanship.
          <br /><br />
          Its sustained relevance is the outcome of years of architectural decision-making, migrating from Joomla to Wix to a custom AFL stack, with each phase sharpening how the brand is presented, protected, and automated. More than a fan site, this is proof of concept that one strategist-engineer, iterating relentlessly, can build a premium, scalable experience end to end.
        </p>
      </div>
    </div>
  )
}
