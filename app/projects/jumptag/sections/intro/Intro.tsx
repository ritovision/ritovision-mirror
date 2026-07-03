'use client'

import React from 'react'
import styles from './Intro.module.css'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Dogey from './components/Dogey'
import Toc from './components/Toc'

export default function Intro() {
  return (
    <section className={styles.intro}>
      <Hero />
      <Overview />
     <Toc />
      <Dogey />
    </section>
  )
}
