// app\projects\entriken\sections\conclusion\Conclusion.tsx
'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
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

      <Image
        src="/images/pages/projects/entriken/hero/hero.png"
        alt="Conclusion background"
        fill
        className={`${styles.bgImage} ${showBg ? styles.showBg : ''}`}
      />

      <div className={styles.content}>
        <p>
          The strategic repositioning of William Entriken’s public brand was not designed to alter or replace his authentic voice — but rather to build a complementary foundation for understanding his work, contributions, and impact at scale.<br/><br/>
          This initiative established a future-proofed platform that frames William’s multifaceted identity — as a Civic Hacker, businessman, and software pioneer — in a way that is accessible, credible, and structured for diverse audiences without diluting his genuine presence.<br/><br/>
          Through thoughtful thematic framing, professional UX and content architecture, and platform integration, the project created a critical contextual lens: a way for journalists, collaborators, and non-technical audiences to more easily grasp what to know about William — without needing to directly engage with the full depth of his technical contributions or personal communications.<br/><br/>
          Rather than supplanting his organic platforms like Phor.net, GitHub, or Twitter/X, the new brand ecosystem harmonizes with them — strengthening the public understanding of William’s legacy and thought leadership while preserving his authentic methods of participation.<br/><br/>
          Ultimately, the project positioned William alongside a rare echelon of innovators who have catalyzed billion-dollar ecosystems — building an authoritative, accessible foundation ready to scale with his future ambitions, while fully respecting the independent voice and path that define his true legacy.
        </p>
      </div>
    </div>
  )
}
