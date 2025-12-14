'use client'

import React from 'react'
import styles from './CoverageSection.module.css'
import Hacker from './Hacker'
import Helicopter from './Helicopter'
import RiotShield from './RiotShield'
import SnoopDogg from './SnoopDogg'

export default function CoverageSection() {
  return (
    <section className={styles.coverageSection}>
      <RiotShield />
      <Helicopter />
      <SnoopDogg />
      <Hacker />

      
    </section>
  )
}
