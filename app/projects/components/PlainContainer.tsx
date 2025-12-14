// \test\app\components\pages\projects\PlainContainer.tsx
'use client'
import React, { ReactNode } from 'react'
import styles from './PlainContainer.module.css'

interface PlainContainerProps {
  id?: string
  title: string
  children: ReactNode
}

export default function PlainContainer({
  id,
  title,
  children,
}: PlainContainerProps) {
  return (
    <div className={`defaulttopspace ${styles.container}`}>
      <span id={id} className={styles.anchorTarget} />
      <h2 className={`${styles.header} headingLarge`}>{title}</h2>
      {children}
    </div>
  )
}
