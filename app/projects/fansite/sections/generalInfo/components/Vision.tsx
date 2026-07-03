'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PlainContainer from '@/projects/components/PlainContainer'
import styles from './Vision.module.css'

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const textAnimationRef = useRef<gsap.core.Timeline | null>(null)
  const hasPlayedRef = useRef<boolean>(false)
  const textHasPlayedRef = useRef<boolean>(false)
  const previousIsMobileRef = useRef<boolean | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const initializeAnimation = () => {
      const isMobile = window.innerWidth < 768
      
      // Only reinitialize if we're crossing the breakpoint or if it's the first run
      if (previousIsMobileRef.current !== null && previousIsMobileRef.current === isMobile) {
        return
      }
      
      previousIsMobileRef.current = isMobile
      
      // Kill existing animations and ScrollTriggers
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
      
      if (textAnimationRef.current) {
        textAnimationRef.current.kill()
        textAnimationRef.current = null
      }
      
      ScrollTrigger.getAll().forEach(t => t.kill())
      
      // Reset hasPlayed when changing breakpoints
      hasPlayedRef.current = false
      textHasPlayedRef.current = false

      if (containerRef.current) {
        const imgContainer = containerRef.current.querySelector(`.${styles.imagesContainer}`)
        const pinkSquare = containerRef.current.querySelector(`.${styles.pinkSquare}`)
        const elegantImg = containerRef.current.querySelector(`.${styles.elegantImg}`)
        const edgyImg = containerRef.current.querySelector(`.${styles.edgyImg}`)

        if (imgContainer && pinkSquare && elegantImg && edgyImg) {
          // Reset positions and opacity
          gsap.set([pinkSquare, elegantImg, edgyImg], {
            clearProps: 'all'
          })

          if (isMobile) {
            // --- MOBILE SETUP ---
            gsap.set([pinkSquare, edgyImg], {
              opacity: 0,
              y: 0
            })
            gsap.set(elegantImg, {
              opacity: 0,
              y: 0,
              zIndex: 2
            })

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: imgContainer,
                start: 'top bottom-=100',
                once: true,
                refreshPriority: 1,
                onEnter: () => {
                  if (!hasPlayedRef.current) {
                    hasPlayedRef.current = true
                    tl.play()
                  }
                }
              },
              paused: true, // Start paused to have better control
              immediateRender: false // Prevent initial flash
            })

            // Store the timeline reference
            animationRef.current = tl

            // 1) Fade in elegant image
            tl.to(elegantImg, {
              opacity: 1,
              duration: 0.75
            })

              // 2) Immediately reveal pinkSquare + edgyImg (no tween)
              .set([pinkSquare, edgyImg], {
                opacity: 1
              })

            // calculate distances
            const itemHeight = 175
            const gap = 15 * 3    // approx 3rem
            const totalDistance = itemHeight + gap
            const speed = 200      // px / sec
            const duration1 = totalDistance / speed
            const duration2 = (totalDistance * 2) / speed

            // 3) Slide pinkSquare down 1 slot
            tl.to(pinkSquare, {
              y: totalDistance,
              duration: duration1,
              ease: 'power2.out'
            })
              // 4) Slide edgyImg down 2 slots (start at same time)
              .to(edgyImg, {
                y: totalDistance * 2,
                duration: duration2,
                ease: 'power2.out'
              }, '<')
          } else {
            // --- DESKTOP ---
            gsap.set([pinkSquare, elegantImg, edgyImg], {
              opacity: 0
            })
            gsap.set([elegantImg, edgyImg], {
              position: 'absolute',
              top: '0',
              left: '0'
            })

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: imgContainer,
                start: `top bottom-=${window.innerHeight * 0.1}`,
                once: true,
                refreshPriority: 1,
                onEnter: () => {
                  if (!hasPlayedRef.current) {
                    hasPlayedRef.current = true
                    tl.play()
                  }
                }
              },
              paused: true, // Start paused to have better control
              immediateRender: false // Prevent initial flash
            })

            // Store the timeline reference
            animationRef.current = tl

            tl.to(pinkSquare, { opacity: 1, duration: 0.5 })
              .set([elegantImg, edgyImg], { opacity: 1 })
              .to(elegantImg, {
                left: '-120%',
                duration: 0.5,
                ease: 'power2.out'
              })
              .to(edgyImg, {
                left: '120%',
                duration: 0.5,
                ease: 'power2.out'
              }, '<')
          }
        }
      }

      // staggered text (reinitialize on resize)
      if (textRef.current) {
        const words = textRef.current.querySelectorAll(`.${styles.word}`)
        gsap.set(words, { opacity: 0 })
        
        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top bottom-=100',
            once: true,
            refreshPriority: 1,
            onEnter: () => {
              if (!textHasPlayedRef.current) {
                textHasPlayedRef.current = true
                textTl.play()
              }
            }
          },
          paused: true,
          immediateRender: false
        })
        
        textAnimationRef.current = textTl
        
        textTl.to(words, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.7,
          ease: 'power2.out'
        })
      }
    }

    // Delay initialization to ensure DOM is fully ready after Next.js navigation
    const initTimeout = setTimeout(() => {
      initializeAnimation()
      
      // Force ScrollTrigger to recalculate positions
      ScrollTrigger.refresh(true)
      
      // Check if elements are already in view and play animations if needed
      if (containerRef.current && !hasPlayedRef.current && animationRef.current) {
        const imgContainer = containerRef.current.querySelector(`.${styles.imagesContainer}`)
        if (imgContainer) {
          const rect = imgContainer.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasPlayedRef.current = true
            animationRef.current.play()
          }
        }
      }
      
      // Check if text is already in view
      if (textRef.current && !textHasPlayedRef.current && textAnimationRef.current) {
        const rect = textRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          textHasPlayedRef.current = true
          textAnimationRef.current.play()
        }
      }
    }, 100)

    // Handle resize events with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        initializeAnimation()
        ScrollTrigger.refresh(true)
      }, 250) // Debounce resize events to avoid excessive reinitializations
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(initTimeout)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        animationRef.current.kill()
      }
      if (textAnimationRef.current) {
        textAnimationRef.current.kill()
      }
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <PlainContainer id="vision-branding" title="Vision & Branding">
      <div ref={containerRef} className={styles.visionContainer}>
        <p className={styles.paragraph}>
          At the heart of the site is a desire to capture Caroline Vreeland's uniquely multifaceted identity: a woman who is as much a celebrated fashion icon as she is an expressive musician. Descended from fashion royalty as the great-granddaughter of legendary Vogue editor Diana Vreeland, Caroline carries a legacy of bold style, cultural relevance, and creative defiance.
        </p>
        
        <div className={styles.imagesContainer}>
          <div className={styles.imagesWrapper}>
            <div className={styles.elegantImg}>
              <Image
                src="/images/pages/projects/fansite/elegant.jpg"
                alt="Elegant style"
                width={175}
                height={175}
                className={styles.image}
              />
            </div>
            <div className={styles.pinkSquare}></div>
            <div className={styles.edgyImg}>
              <Image
                src="/images/pages/projects/fansite/edgy.jpg"
                alt="Edgy style"
                width={175}
                height={175}
                className={styles.image}
              />
            </div>
          </div>
        </div>
        
        <div ref={textRef} className={styles.staggeredText}>
          <span className={styles.word}>Elegant,</span>
          <span className={styles.word}>Feminine,</span>
          <span className={styles.word}>Edgy...</span>
        </div>

        <div className={styles.paragraphBlock}>
          <p>
            This project seeks to honor that lineage while acknowledging Caroline’s own artistic range, one that resists easy categorization but Rito uses "Elegance, Feminine and Edgy" to embody. While widely recognized for her striking presence and sensual image, Caroline has publicly emphasized her dedication to music and her desire not to rely on her body or family name to define her career. The site respects that complexity: it presents her visual allure not as the centerpiece, but as one dimension of a broader creative persona.
            <br /><br />
            Following this vision, the design deliberately avoids the aesthetics of celebrity gossip sites or exploitative fan content. Instead, it adopts a tone that’s editorial, immersive, and archival, built to appeal to those who know her work, respect her artistry, and appreciate thoughtful curation. It is a celebration of her elegance, her feminine confidence, and her edge, without sensationalism.
            <br /><br />
            Beneath the surface, the site functions as a catalog rather than a live feed, prioritizing timeless, iconic moments over constantly updated news. What began as a blog-like CMS has evolved into a refined archive, preserving the most impactful aspects of Caroline’s career and presenting them in a high-design environment that reflects her aesthetic sensibility.
          </p>
        </div>
      </div>
    </PlainContainer>
  )
}
