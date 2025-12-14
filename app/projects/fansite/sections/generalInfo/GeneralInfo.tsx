'use client'
import React from 'react'
import styles from './GeneralInfo.module.css'
import Overview from '@/projects/fansite/components/Overview'
import Highlight from './components/Highlight'
import Evolution from './components/Evolution'
import Vision from './components/Vision'
import Toc from './components/Toc'

const GeneralInfo = () => {
  return (
    <section className={styles.section}>
      <Overview />
      <Toc />
      <Evolution />
      <Vision />
      <Highlight />
    </section>
  )
}

export default GeneralInfo