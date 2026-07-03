// app\projects\cod\components\Coverage.tsx
'use client'

import React, { useState } from 'react'
import styles from './Coverage.module.css'

interface CoverageProps {
  id?: string
  topOutsideText: string
  topInsideText: string
  videoUrl: string
  children?: React.ReactNode
}

// Helper to extract YouTube video ID
const getYouTubeId = (url: string) => {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop() || ''
  } catch {
    return url
  }
}

export default function Coverage({
  id,
  topOutsideText,
  topInsideText,
  videoUrl,
  children,
}: CoverageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeId(videoUrl)

  const handlePlay = () => {
    // Pause any other videos on the page
    document.querySelectorAll('iframe').forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*'
      )
    })
    setIsPlaying(true)
  }

  return (
    <div id={id} className={`defaulttopspace ${styles.wrapper}`}>
      <h3 className={styles.topOutside}>{topOutsideText}</h3>
      <div className={styles.container}>
        <h3 className={styles.topInside}>{topInsideText}</h3>
        <div className={styles.videoWrapper}>
          {isPlaying ? (
            <iframe
              className={styles.videoIframe}
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`}
              title={topInsideText}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className={styles.thumbnailContainer} onClick={handlePlay}>
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={topInsideText}
                className={styles.videoThumbnail}
              />
              <div className={styles.playOverlay}>
                <svg className={styles.playIcon} viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        {children && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  )
}
