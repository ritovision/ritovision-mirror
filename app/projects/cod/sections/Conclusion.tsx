// app\projects\cod\sections\Conclusion.tsx
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
        src="/images/pages/projects/cod/conclusion.jpeg"
        alt="Conclusion background"
        className={`${styles.bgImage} ${showBg ? styles.showBg : ''}`}
      />

      <div className={styles.content}>
        <p>
          This project wasn’t just about documenting bugs—it was about generating visibility and public pressure inside a multi-billion dollar franchise largely insulated from outside voices. Rito combined the rigor of a QA engineer, the instincts of a growth strategist, and the delivery of a content creator to break through the noise and inject overlooked issues into the public conversation around one of the world’s most-watched games.         
          <br /><br />
          With no access to internal teams or official channels, he built a full-stack strategy from scratch—cataloging bugs, designing test protocols, producing infotaining videos, and engineering a media ripple that turned overlooked issues into public stories.          
          <br /><br />
          This wasn’t a stunt. It was a playbook: take something broken, package it with precision, and make the internet care. For organizations looking to drive visibility, user engagement, or narrative control in noisy environments, this case study is proof that the right mix of structure and storytelling can shift outcomes—no matter how big the system.
        </p>
      </div>
    </div>
  )
}
