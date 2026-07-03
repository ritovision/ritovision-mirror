// \test\app\components\utilities\sections\topicSegment\ContentDisplay.tsx
'use client'

import React, { ReactNode } from 'react'
import styles from './ContentDisplay.module.css'
import ScrollFadeIn from '@/components/utilities/animations/ScrollFadeIn'
import Button, { ButtonVariant } from '@/components/utilities/buttons/Button'

interface ContentDisplayProps {
  imageSrc: string
  imageAlt?: string
  caption?: ReactNode
  body: ReactNode
  borderColor?: string
  backgroundColor?: string
  fadeIn?: boolean
  duration?: number
  triggerAmount?: number
  triggerAmountMobile?: number
  triggerAmountDesktop?: number
  mobileBreakpoint?: string
  buttonText?: string
  buttonVariant?: ButtonVariant
  buttonHref?: string
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  imageSrc,
  imageAlt = 'Image',
  caption,
  body,
  borderColor = 'var(--secondary-blue)',
  backgroundColor = 'transparent',
  fadeIn = true,
  duration,
  triggerAmount,
  triggerAmountMobile,
  triggerAmountDesktop,
  mobileBreakpoint,
  buttonText,
  buttonVariant = 'blueAccentButton',
  buttonHref,
}) => {
  const content = (
    <div className={styles.container} style={{ borderColor, backgroundColor }}>
      {/* Left column: Image + Caption */}
      <div className={styles.imageCaptionWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className={styles.image}
          />
        </div>
        {caption && <div className={styles.caption}>{caption}</div>}
      </div>

      {/* Right column: Body text and Button */}
      <div className={styles.bodyWrapper}>
        <div>
          <div className={styles.textWrapper}>
            <div className={styles.bodyText}>{body}</div>
          </div>
          {buttonText && buttonHref && (
            <div className={styles.buttonWrapper}>
              <Button
                text={buttonText}
                variant={buttonVariant}
                href={buttonHref}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return fadeIn ? (
    <ScrollFadeIn
      duration={duration}
      triggerAmount={triggerAmount}
      triggerAmountMobile={triggerAmountMobile}
      triggerAmountDesktop={triggerAmountDesktop}
      mobileBreakpoint={mobileBreakpoint}
    >
      {content}
    </ScrollFadeIn>
  ) : (
    content
  )
}

export default ContentDisplay
