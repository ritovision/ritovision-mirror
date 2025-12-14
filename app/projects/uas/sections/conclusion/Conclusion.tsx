// app\projects\uas\sections\conclusion\Conclusion.tsx
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
        src="/images/pages/projects/uas/conclusion.jpg"
        alt="Conclusion background"
        className={`${styles.bgImage} ${showBg ? styles.showBg : ''}`}
      />

      <div className={styles.content}>
        <p>
          The Universal Asset Signing initiative, co-authored and led by Rito in collaboration with William Entriken, offers a rare lens into the strategic realities of driving ERC adoption within the Ethereum ecosystem. Beyond the technical work, this effort engaged the broader challenges of coordination—across DAOs, developer communities, and executive leadership within the blockchain space.
          <br /><br />
          Rito played a central role in shaping and guiding the effort from multiple angles. This included developing detailed technical materials for blockchain development teams, coordinating with executive stakeholders at major organizations, and incorporating public-facing strategy as part of the adoption roadmap—including onboarding a public relations firm in preparation for broader visibility efforts.
          <br /><br />
          Supporting this initiative were long-form proposals built to evolve with community feedback—refined through live town halls, asynchronous forums, and collaborative input. The work reflects a deep understanding of how to balance strategic intent with decentralized participation.
          <br /><br />
          Though the current phase of this effort has reached a natural pause, the approach and execution demonstrate a blueprint for others facing similar adoption challenges. Whether navigating protocol governance, engaging technical teams, or aligning stakeholders across fragmented ecosystems—Rito brings a rare mix of systems thinking, strategic clarity, and executional depth.
        </p>
      </div>
    </div>
  )
}
