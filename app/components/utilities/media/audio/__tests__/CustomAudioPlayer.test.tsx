// app/components/utilities/media/audio/CustomAudioPlayer.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CustomAudioPlayer from '../CustomAudioPlayer'

// --- Mock Howler so duration=120 and methods are spies ---
const mockPlay = vi.fn()
const mockPause = vi.fn()
const mockSeek = vi.fn()
const mockVolume = vi.fn()
const mockMute = vi.fn()
const mockDuration = vi.fn().mockReturnValue(120)
const mockUnload = vi.fn()

vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation((config: { onload?: () => void }) => {
    // immediately invoke onload so duration is set
    config.onload?.()
    return {
      play: mockPlay,
      pause: mockPause,
      seek: mockSeek,
      volume: mockVolume,
      mute: mockMute,
      duration: mockDuration,
      unload: mockUnload,
      on: vi.fn(),
      off: vi.fn(),
    }
  }),
}))

describe('<CustomAudioPlayer />', () => {
  const defaultProps = {
    title: 'Test Audio',
    audioSrc: '/test.mp3',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with title and controls', async () => {
    render(<CustomAudioPlayer {...defaultProps} />)

    expect(screen.getByText('Test Audio')).toBeInTheDocument()
    expect(screen.getByLabelText('Play')).toBeInTheDocument()
    expect(screen.getByLabelText('Audio timeline')).toBeInTheDocument()
    expect(screen.getByLabelText('Mute')).toBeInTheDocument()
    expect(screen.getByLabelText('Volume')).toBeInTheDocument()

    // wait for duration=120 to propagate to the time counter
    await waitFor(() =>
      expect(screen.getByText(/0:00\s*\/\s*2:00/)).toBeInTheDocument()
    )
  })

  it('toggles play/pause', () => {
    render(<CustomAudioPlayer {...defaultProps} />)
    const btn = screen.getByLabelText('Play')

    fireEvent.click(btn)
    expect(mockPlay).toHaveBeenCalled()
    expect(btn).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(btn)
    expect(mockPause).toHaveBeenCalled()
  })

  it('handles volume changes', () => {
    render(<CustomAudioPlayer {...defaultProps} />)
    const slider = screen.getByLabelText('Volume')

    fireEvent.change(slider, { target: { value: '0.5' } })
    expect(mockVolume).toHaveBeenCalledWith(0.5)

    fireEvent.change(slider, { target: { value: '0' } })
    expect(mockMute).toHaveBeenCalledWith(true)
  })

  it('toggles mute', () => {
    render(<CustomAudioPlayer {...defaultProps} />)
    const muteBtn = screen.getByLabelText('Mute')

    fireEvent.click(muteBtn)
    expect(mockMute).toHaveBeenCalledWith(true)

    fireEvent.click(muteBtn)
    expect(mockMute).toHaveBeenCalledWith(false)
  })

  it('updates the UI when clicking the timeline', async () => {
    render(<CustomAudioPlayer {...defaultProps} />)

    const timeline = screen.getByLabelText('Audio timeline')
    // Stub the slider width to 200px
    timeline.getBoundingClientRect = () =>
    ({
      left: 0,
      width: 200,
      right: 200,
      top: 0,
      bottom: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => { },
    } as DOMRect)

    // initial counter should be 0:00/2:00
    await waitFor(() =>
      expect(screen.getByText(/0:00\s*\/\s*2:00/)).toBeInTheDocument()
    )

    // simulate click at halfway (100px)
    fireEvent.mouseDown(timeline, { clientX: 100 })
    fireEvent.mouseUp(document, { clientX: 100 })

    // wait for the UI to update
    await waitFor(() =>
      expect(screen.getByText(/1:00\s*\/\s*2:00/)).toBeInTheDocument()
    )

    // slider ARIA attributes reflect 50%
    expect(timeline).toHaveAttribute('aria-valuetext', '1:00 of 2:00')
    expect(timeline).toHaveAttribute('aria-valuenow', '50')

    // progress bar width is 50%
    const progress = timeline.querySelector('div[aria-hidden="true"]')
    expect(progress).toHaveStyle('width: 50%')
  })

  it('displays play status announcement', async () => {
    render(<CustomAudioPlayer {...defaultProps} />)
    fireEvent.click(screen.getByLabelText('Play'))

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        'Playing Test Audio'
      )
    )
  })

  it('unloads audio on unmount', () => {
    const { unmount } = render(
      <CustomAudioPlayer {...defaultProps} />
    )
    unmount()
    expect(mockUnload).toHaveBeenCalled()
  })
})
