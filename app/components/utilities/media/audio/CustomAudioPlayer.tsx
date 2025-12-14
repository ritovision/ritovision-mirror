// components/utilities/media/audio/CustomAudioPlayer.tsx
'use client'

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { Howl } from 'howler'
import styles from './CustomAudioPlayer.module.css'

type CustomAudioPlayerProps = {
  /** Visible title for the audio track */
  title: string
  /** URL or path to the audio source */
  audioSrc: string
}

// SVG Icons
const PlayIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
    <path d="M6 3 L21 12 L6 21 Z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
    <rect x="4" y="2" width="5.5" height="20" rx="1.5" />
    <rect x="14.5" y="2" width="5.5" height="20" rx="1.5" />
  </svg>
)

const MuteIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
    <path d="M10.5 3 L4.5 8 L0 8 L0 16 L4.5 16 L10.5 21 Z" />
    <path d="M14 8 L20 14 M20 8 L14 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const VolumeIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
    <path d="M10.5 3 L4.5 8 L0 8 L0 16 L4.5 16 L10.5 21 Z" />
    <path d="M14 7 C17 7 18 9.5 18 12 C18 14.5 17 17 14 17" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path d="M17.5 4.5 C21 4.5 22.5 8 22.5 12 C22.5 16 21 19.5 17.5 19.5" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export default function CustomAudioPlayer({
  title,
  audioSrc,
}: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastVolume, setLastVolume] = useState(1)
  const [announcement, setAnnouncement] = useState('')

  const howlRef = useRef<Howl | null>(null)
  const animationFrameRef = useRef<number>(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const dragTimeRef = useRef<number>(0) // Track time during drag without state

  // — Load & unload Howl, guard against unmount/source changes —
  useEffect(() => {
    let isCurrent = true // Guard against stale callbacks
    
    const sound = new Howl({
      src: [audioSrc],
      html5: true,
      onload: () => {
        queueMicrotask(() => {
          if (isCurrent && howlRef.current === sound) {
            setDuration(sound.duration())
          }
        })
      },
      onend: () => {
        queueMicrotask(() => {
          if (isCurrent && howlRef.current === sound) {
            setIsPlaying(false)
            setCurrentTime(0)
            cancelAnimationFrame(animationFrameRef.current)
          }
        })
      },
    })

    howlRef.current = sound
    
    return () => {
      isCurrent = false
      sound.unload()
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [audioSrc])

  // keep volume/mute in sync
  useEffect(() => {
    howlRef.current?.volume(volume)
  }, [volume])

  useEffect(() => {
    howlRef.current?.mute(isMuted)
  }, [isMuted])

  // update the playhead via rAF
  useEffect(() => {
    const update = () => {
      setCurrentTime(howlRef.current?.seek() as number)
      animationFrameRef.current = requestAnimationFrame(update)
    }

    if (isPlaying && !isDragging && duration > 0) {
      animationFrameRef.current = requestAnimationFrame(update)
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isPlaying, isDragging, duration])

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = String(Math.floor(t % 60)).padStart(2, '0')
    return `${m}:${s}`
  }

  const timelinePerc = duration
    ? (currentTime / duration) * 100
    : 0

  const handlePlayPause = () => {
    if (!howlRef.current) return
    if (isPlaying) {
      howlRef.current.pause()
      setIsPlaying(false)
      cancelAnimationFrame(animationFrameRef.current)
    } else {
      howlRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = parseFloat(e.target.value)
    if (v > 0) {
      setIsMuted(false)
      setLastVolume(v)
    } else {
      if (!isMuted && volume > 0) setLastVolume(volume)
      setIsMuted(true)
    }
    setVolume(v)
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (volume === 0) setVolume(lastVolume)
    } else {
      if (volume > 0) setLastVolume(volume)
      setIsMuted(true)
    }
  }

  const calculateTimeFromPosition = useCallback(
    (clientX: number): number => {
      const el = timelineRef.current
      if (!el || !duration) return 0
      const { left, width } = el.getBoundingClientRect()
      const pos = Math.max(0, Math.min(clientX - left, width))
      return (pos / width) * duration
    },
    [duration]
  )

  const handleTimelineUpdate = useCallback(
    (clientX: number) => {
      const time = calculateTimeFromPosition(clientX)
      dragTimeRef.current = time // Store in ref for immediate access
      setCurrentTime(time)
      if (!isDragging) howlRef.current?.seek(time)
    },
    [calculateTimeFromPosition, isDragging]
  )

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    handleTimelineUpdate(e.clientX)
  }

  // Stable handlers that don't depend on changing state
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      const time = calculateTimeFromPosition(e.clientX)
      dragTimeRef.current = time
      setCurrentTime(time)
    },
    [calculateTimeFromPosition]
  )

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      const time = calculateTimeFromPosition(e.clientX)
      howlRef.current?.seek(time) // Use calculated time directly
      setCurrentTime(time)
      setIsDragging(false)
    },
    [calculateTimeFromPosition]
  )

  // Only add/remove listeners when isDragging changes
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      return () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
    }
  }, [isDragging, onMouseMove, onMouseUp])

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    handleTimelineUpdate(e.touches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const time = calculateTimeFromPosition(e.touches[0].clientX)
      dragTimeRef.current = time
      setCurrentTime(time)
    }
  }

  const onTouchEnd = () => {
    if (isDragging) {
      howlRef.current?.seek(dragTimeRef.current) // Use ref value
      setIsDragging(false)
    }
  }

  // announce play/pause changes
  useEffect(() => {
    if (isPlaying) {
      setAnnouncement(`Playing ${title}`)
    } else if (!isPlaying && currentTime > 0) {
      setAnnouncement(`Paused at ${formatTime(currentTime)}`)
    }
  }, [isPlaying, title, currentTime])

  return (
    <div
      className={styles.audioPlayer}
      role="region"
      aria-label="Audio player"
    >
      <div className={styles.title} id="audio-title">
        {title}
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`${styles.announcement} ${
          announcement ? styles.announcementVisible : ''
        }`}
      >
        {announcement || '\u00A0'}
      </div>

      <div className={styles.controls}>
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          aria-pressed={isPlaying}
          aria-describedby="audio-title"
          className={styles.playPauseButton}
        >
          <div className={styles.iconContainer}>
            <div
              className={`${styles.icon} ${
                !isPlaying ? styles.active : ''
              }`}
              aria-hidden="true"
            >
              <PlayIcon />
            </div>
            <div
              className={`${styles.icon} ${
                isPlaying ? styles.active : ''
              }`}
              aria-hidden="true"
            >
              <PauseIcon />
            </div>
          </div>
        </button>
      </div>

      <div className={styles.timelineContainer}>
        <div
          ref={timelineRef}
          className={styles.timeline}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="slider"
          aria-label="Audio timeline"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(timelinePerc)}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(
            duration
          )}`}
          tabIndex={0}
        >
          <div
            className={styles.timelineProgress}
            style={{ width: `${timelinePerc}%` }}
            aria-hidden="true"
          />
          <div
            className={`${styles.timelineCursor} ${
              isDragging ? styles.dragging : ''
            }`}
            style={{ left: `${timelinePerc}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.timeCounter} aria-hidden="true">
        {formatTime(currentTime)}/{formatTime(duration)}
      </div>

      <div className={styles.volumeContainer}>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          aria-pressed={isMuted}
          className={styles.volumeButton}
        >
          <div className={styles.volumeIcon}>
            {isMuted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
          </div>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(volume * 100)}
          aria-valuetext={`Volume ${Math.round(volume * 100)}%`}
        />
      </div>
    </div>
  )
}