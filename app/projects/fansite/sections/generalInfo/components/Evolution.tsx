'use client'

import React, { useRef, useEffect, useState } from 'react'
import PlainContainer from '../../../../components/PlainContainer'
import styles from './Evolution.module.css'

interface BlockProps {
  text: string
  animate: boolean
  onComplete: () => void
  last?: boolean
}

function Block({ text, animate, onComplete, last = false }: BlockProps) {
  const [showText, setShowText]     = useState(false)
  const [drawBorder, setDrawBorder] = useState(false)
  const [drawArrow, setDrawArrow]   = useState(false)

  useEffect(() => {
    if (!animate) return

    setShowText(true)
    setDrawBorder(true)

    if (!last) {
      const arrowTimer = setTimeout(() => {
        setDrawArrow(true)
        onComplete()
      }, 1000)
      return () => clearTimeout(arrowTimer)
    } else {
      const finishTimer = setTimeout(onComplete, 1000)
      return () => clearTimeout(finishTimer)
    }
  }, [animate, last, onComplete])

  return (
    <svg
      className={styles.block}
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100,0 L200,0 L200,60 L100,60"
        className={`${styles.line} ${drawBorder ? styles.drawBorder : ''}`}
      />
      <path
        d="M100,0 L0,0 L0,60 L100,60"
        className={`${styles.line} ${drawBorder ? styles.drawBorder : ''}`}
      />

      <text
        className={`${styles.text} ${showText ? styles.showText : ''}`}
        x="100"
        y="35"
        textAnchor="middle"
        fill="white"
        fontSize="20"
        fontFamily="var(--font-agency)"
      >
        {text}
      </text>

      {!last && (
        <path
          d="M100,60 L100,90 M90,80 L100,90 L110,80"
          className={`${styles.arrow} ${drawArrow ? styles.drawArrow : ''}`}
        />
      )}
    </svg>
  )
}

export default function Evolution() {
  const block1Ref = useRef<HTMLDivElement>(null)
  const block2Ref = useRef<HTMLDivElement>(null)
  const block3Ref = useRef<HTMLDivElement>(null)

  const [firstTriggered, setFirstTriggered]     = useState(false)
  const [firstDone, setFirstDone]               = useState(false)
  const [secondTriggered, setSecondTriggered]   = useState(false)
  const [secondDone, setSecondDone]             = useState(false)
  const [thirdTriggered, setThirdTriggered]     = useState(false)

  // 1) Block 1 scroll trigger
  useEffect(() => {
    const el = block1Ref.current
    if (!el) return
    const isMobile   = window.innerWidth < 730
    const rootMargin = `${isMobile ? '-20%' : '-10%'} 0px 0px 0px`

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setFirstTriggered(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // 2) Block 2 scroll trigger after Block 1 done
  useEffect(() => {
    if (!firstDone) return
    const el = block2Ref.current
    if (!el) return
    const isMobile   = window.innerWidth < 730
    const rootMargin = `${isMobile ? '-20%' : '-10%'} 0px 0px 0px`

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSecondTriggered(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [firstDone])

  // 3) Block 3 scroll trigger after Block 2 done
  useEffect(() => {
    if (!secondDone) return
    const el = block3Ref.current
    if (!el) return
    const isMobile   = window.innerWidth < 730
    const rootMargin = `${isMobile ? '-20%' : '-10%'} 0px 0px 0px`

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setThirdTriggered(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [secondDone])

  return (
    <PlainContainer id="site-evolution" title="Site Evolution">
      <div className={styles.wrapper}>
        <p className={styles.paragraph}>
          CarolineVreeland.com has gone through several iterations over the years, not just in tools but in philosophy. From early CMS experiments to no-code visual builders to a fully custom-coded platform, each phase reflects a different chapter in both the project's creative direction and Rito's own growth as a designer-engineer. What began as a hosted fan site eventually became a self-sustaining, highly-optimized, code-driven archive, purpose-built for elegance, discoverability, and permanence.
        </p>

        <div className={styles.blocks}>
          <div ref={block1Ref} className={styles.blockWrapper}>
            <Block
              text="Joomla"
              animate={firstTriggered}
              onComplete={() => setFirstDone(true)}
            />
          </div>

          <div ref={block2Ref} className={styles.blockWrapper}>
            <Block
              text="Wix"
              animate={secondTriggered}
              onComplete={() => setSecondDone(true)}
            />
          </div>

          <div ref={block3Ref} className={styles.blockWrapper}>
            <Block
              text="Next.js"
              animate={thirdTriggered}
              onComplete={() => {}}
              last
            />
          </div>
        </div>

        <div className={styles.paragraph}>
          <h3 style={{ color: 'var(--primary-red)' }}>Phase I: Joomla</h3>
          <h3 style={{ marginBottom: '1rem' }}>Structural Foundations</h3>
          <p>
            The original version of the site was built in Joomla, a traditional CMS that offered structured templating and modular content blocks. This early phase focused on establishing basic publishing workflows and organizing information hierarchically. While restrictive in terms of customization, it laid the groundwork for thinking in terms of systemized content architecture.
          </p>
        </div>

        <div className={styles.paragraph}>
          <h3 style={{ color: 'var(--primary-red)' }}>Phase II: Wix</h3>
          <h3 style={{ marginBottom: '1rem' }}>Aesthetic and UX Expansion</h3>
          <p>
            Moving into Wix shifted the focus toward design precision, layout control, and interactive presentation. This phase was about visual storytelling, exploring typography, spacing, and motion without being limited by backend configuration. While still CMS-driven, this stage empowered more expressive branding and a polished editorial experience.
          </p>
        </div>

        <div className={styles.paragraph}>
          <h3 style={{ color: 'var(--primary-red)' }}>Phase III: Next.js</h3>
          <h3 style={{ marginBottom: '1rem' }}>Advanced Custom Architecture</h3>
          <p>
            The current version was rebuilt from the ground up in Next.js, fully componentized and deployed via Vercel. It transcends the limitations of traditional CMS platforms with custom-built systems for randomized image content, drag-and-drop file updates, structured metadata injection, and a powerful client-side search UI. It functions like a CMS, but with better performance, complete flexibility, and zero platform dependency.
          </p>
        </div>
      </div>
    </PlainContainer>
  )
}
