'use client'
import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PlainContainer from '../../components/PlainContainer'
import styles from './Overview.module.css'
import Button from '../../../components/utilities/buttons/Button'

export default function Overview() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px'
  })

  return (
    <PlainContainer id="overview" title="Overview">
      <div
        ref={ref}
        className={`${styles.wrapper} ${inView ? styles.visible : styles.hidden}`}
      >
        <p className={styles.paragraph}>
          This project began as a graduate school assignment for Rito's HCI Master's,
          but evolved into a deeply branded, passion-driven tribute to celebrity
          fashion icon and singer Caroline Vreeland. Designed to encapsulate her
          multifaceted persona: elegant, feminine, and provocatively edgy. The site
          functions as both an evolving digital shrine and a technical showcase. <br /><br />
          Originally launched in Joomla, later rebuilt in Wix, and now reimagined in
          Next.js with a custom CMS-like architecture, the site reflects an evolution
          in cultural trends, technology and creative direction. The current version
          integrates advanced SEO practices, AI-forward markup, and component-driven
          design with autonomous updating mechanisms that enable effortless, ongoing
          expansion while maintaining a high-touch, editorial-quality presentation.<br /><br />
          Organically highlighted by The New York Times and receiving over 100,000 unique
          visitors in a year without any paid marketing, the site ranks consistently in
          Google’s top 10 for her name, a testament to strategic branding, thoughtful
          information architecture, and native content virality.<br /><br />
          What started as a tribute became a proof of concept: a high-performing,
          search-optimized, visually immersive platform engineered for discoverability,
          longevity, and cultural resonance.
        </p>

        <div className={styles.rolesSection}>
          <h3 className={styles.rolesTitle}>Roles by Rito</h3>
          <div className={styles.rolesList}>
            <p>Product Manager</p>
            <p>Brand Strategist</p>
            <p>Creative Director</p>
            <p>UX Strategist, Architect &amp; Designer</p>
            <p>Full-stack Developer</p>
            <p>DevOps</p>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button href="https://carolinevreeland.com" text="CarolineVreeland.com" />
          <div className={styles.repoCta}>
            <p>
              <a
                href="https://github.com/ritovision/vreeland-fansite"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoTextLink}
              >
                See the full Open Source repo on GitHub
              </a>
            </p>
            <a
              href="https://github.com/ritovision/vreeland-fansite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/utilities/socials/github-white.png"
                alt="GitHub icon"
                width={50}
                height={50}
              />
            </a>
          </div>
        </div>
      </div>
    </PlainContainer>
  )
}
