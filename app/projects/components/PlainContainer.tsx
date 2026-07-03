// \test\app\components\pages\projects\PlainContainer.tsx
'use client'
import React, { ReactNode } from 'react'
import styles from './PlainContainer.module.css'

interface PlainContainerProps {
  id?: string
  title: string
  children: ReactNode
  className?: string
  titleClassName?: string
  hideTitle?: boolean
}

export default function PlainContainer({
  id,
  title,
  children,
  className,
  titleClassName,
  hideTitle,
}: PlainContainerProps) {
  const containerClassName = ['defaulttopspace', styles.container, className]
    .filter(Boolean)
    .join(' ')
  const headingClassName = [styles.header, 'headingLarge', titleClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClassName}>
      <span id={id} className={styles.anchorTarget} />
      {!hideTitle && <h2 className={headingClassName}>{title}</h2>}
      {children}
    </div>
  )
}
