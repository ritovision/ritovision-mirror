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
      ref={ref}
      className={`defaulttopspace blueglow ${styles.container}`}
    >
      <h2 className={styles.title}>Conclusion</h2>

      <img
        src="\images\pages\projects\jumptag\conclusion.jpg"
        alt="Conclusion background"
        className={`${styles.bgImage} ${showBg ? styles.showBg : ''}`}
      />

      <div className={styles.content}>
        <p>
          Jumptag Club was a high-concept, cross-disciplinary initiative that brought together branding, product design, software engineering, and physical manufacturing into a single, cohesive user experience. From concept to real-world deployment, the project showcased how wearable tech could be integrated seamlessly into fashion-forward contexts—both technically and culturally.<br/><br/>
          Designed as a self-contained pilot with the foundations to expand, the project was fully realized within its scope and intentionally concluded. Its outcomes offer a clear demonstration of Rito’s ability to lead complex, boundary-pushing initiatives that synthesize aesthetics, usability, and system-level thinking across both digital and physical mediums.<br/><br/>
          Jumptag Club stands as a complete case study in vision-led execution—evidence of how strategy, design, and innovation can meet in the real world, then close with purpose.
        </p>
      </div>
    </div>
  )
}
