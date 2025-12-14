'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

const Hero: React.FC = () => {
  const orig = {
    upperLeft:   '/images/pages/projects/entriken/hero/upperleft.png',
    upperRight:  '/images/pages/projects/entriken/hero/upperright.png',
    bottomLeft:  '/images/pages/projects/entriken/hero/bottomleft.png',
    bottomRight: '/images/pages/projects/entriken/hero/bottomright.png',
  }

  const [srcs, setSrcs] = useState({ ...orig })
  const [classes, setClasses] = useState({
    upperLeft:   '',
    upperRight:  '',
    bottomRight: '',
    bottomLeft:  '',
  })
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    // alt images only needed inside the effect
    const alt = {
      upperLeft:   '/images/pages/projects/entriken/hero/upperleft-green.png',
      upperRight:  '/images/pages/projects/entriken/hero/upperright-blue.png',
      bottomLeft:  '/images/pages/projects/entriken/hero/bottomleft-yellow.png',
      bottomRight: '/images/pages/projects/entriken/hero/bottomright-red.png',
    }

    const initialDuration = 600
    const delayAfter = 100
    const quadDuration = 400

    const animate = (key: keyof typeof orig) => {
      // shrink
      setClasses((c) => ({ ...c, [key]: 'shrink' }))
      // halfway through shrink, swap src and grow
      setTimeout(() => {
        setSrcs((s) => ({ ...s, [key]: alt[key] }))
        setClasses((c) => ({ ...c, [key]: 'grow' }))
        if (key === 'bottomLeft') {
          setShowTitle(true)
        }
      }, quadDuration / 2)
      // after full quadDuration, clear class
      setTimeout(() => {
        setClasses((c) => ({ ...c, [key]: '' }))
      }, quadDuration)
    }

    const order: (keyof typeof orig)[] = [
      'upperLeft',
      'upperRight',
      'bottomRight',
      'bottomLeft',
    ]

    order.forEach((key, i) => {
      setTimeout(
        () => animate(key),
        initialDuration + delayAfter + i * quadDuration
      )
    })
  }, [])

  return (
    <>
      <div className={styles.heroContainer}>
        <div
          className={[
            styles.imageWrapper,
            styles.upperLeft,
            classes.upperLeft ? styles[classes.upperLeft] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Image
            src={srcs.upperLeft}
            alt="Upper Left"
            width={452}
            height={339}
          />
        </div>

        <div
          className={[
            styles.imageWrapper,
            styles.upperRight,
            classes.upperRight ? styles[classes.upperRight] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Image
            src={srcs.upperRight}
            alt="Upper Right"
            width={298}
            height={339}
          />
        </div>

        <div
          className={[
            styles.imageWrapper,
            styles.bottomLeft,
            classes.bottomLeft ? styles[classes.bottomLeft] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Image
            src={srcs.bottomLeft}
            alt="Bottom Left"
            width={452}
            height={286}
          />
        </div>

        <div
          className={[
            styles.imageWrapper,
            styles.bottomRight,
            classes.bottomRight ? styles[classes.bottomRight] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Image
            src={srcs.bottomRight}
            alt="Bottom Right"
            width={299}
            height={286}
          />
        </div>
      </div>

      <h2
        className={`${styles.extTitle} ${
          showTitle ? styles.showTitle : ''
        }`}
      >
        Extending a Legacy
      </h2>
    </>
  )
}

export default Hero
