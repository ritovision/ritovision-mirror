'use client'

import React, { useRef, useEffect, useState } from 'react'
import PlainContainer from '../../../../components/PlainContainer'
import Button from '../../../../../components/utilities/buttons/Button'
import styles from './Highlight.module.css'

export default function Highlight() {
  const imgRef = useRef<HTMLImageElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const imgEl = imgRef.current
    if (!imgEl) return

    const isMobile = window.innerWidth < 730
    // trigger when bottom of image enters viewport:
    // use negative top margin instead of bottom
    const rootMargin = `${isMobile ? '-20%' : '-10%'} 0px 0px 0px`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0 }
    )

    observer.observe(imgEl)
    return () => observer.disconnect()
  }, [])

  const articleUrl =
    'https://www.nytimes.com/2020/01/16/style/caroline-vreeland-a-singer-with-a-famous-fashion-name.html'

  return (
    <PlainContainer id="nyt-highlight" title="NYT Highlight & Organic Traffic Surge">
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              ref={imgRef}
              className={`${styles.image} ${visible ? styles.fadeIn : ''}`}
              src="/images/pages/press/logos/NYT-logo.png"
              alt="NYT Logo"
            />
          </a>
        </div>
        <div className={styles.textContainer}>
          <p>
            When The New York Times profiled Caroline Vreeland in January 2020,
            the article served as a major milestone in her public narrative,
            formally introducing her to a broader audience as a musician,
            fashion icon, and cultural personality. Notably, the very first
            hyperlink in the article directed readers to this tribute site,
            positioning it as the primary destination for those curious to
            explore her body of work.
            <br /><br /><br /><br />
            The feature wasn’t sponsored, solicited, or coordinated. It was
            organic. That single moment of visibility catalyzed a wave of
            inbound traffic, resulting in over 100,000 unique visitors within a
            year, all without paid promotion or search ads. The spike not only
            validated the strength of the site’s SEO and UX, but also proved
            its value as a branded content platform worthy of mainstream
            journalistic reference.
            <br /><br /><br /><br />
            The site continues to rank consistently in the top 10 Google search
            results for Caroline Vreeland’s name, outperforming most fan-run
            platforms and often surfacing alongside her official and
            label-backed content. Those outcomes are the cumulative result of
            Rito’s long-running architectural stewardship, from early CMS
            experiments to the modern AFL stack, rather than a single rebuild.
            It’s a case study in organic discoverability, strategic content
            positioning, and editorial-grade presentation that earns authority,
            not just attention.
          </p>
          <Button
            text="View Article"
            href={articleUrl}
            className={styles.button}
          />
        </div>
      </div>
    </PlainContainer>
  )
}
