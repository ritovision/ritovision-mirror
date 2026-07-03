# Particle Effects Documentation

This repository implements a sophisticated particle effects system using multiple technologies and approaches. This document provides a comprehensive overview of the mechanisms, use cases, and implementation details.

---

## Table of Contents

- [Overview](#overview)
- [Particle Effect Mechanisms](#particle-effect-mechanisms)
  - [PixiJS WebGL Rendering](#pixijs-webgl-rendering)
  - [CSS Animations](#css-animations)
  - [MP4 Video Fallback](#mp4-video-fallback)
- [Use Cases](#use-cases)
  - [Hero Backgrounds](#hero-backgrounds)
  - [Interactive Containers](#interactive-containers)
  - [Image Loading States](#image-loading-states)
  - [Error Components](#error-components)
  - [404 Pages](#404-pages)
- [Component Reference](#component-reference)
- [Best Practices](#best-practices)

---

## Overview

The particle effects system is designed with a **progressive enhancement** philosophy:

1. **PixiJS** provides high-performance WebGL-based particle effects for desktop and capable devices
2. **CSS animations** serve as lightweight fallbacks for loading states and less capable devices  
3. **MP4 video** provides a recorded fallback for mobile devices where real-time rendering may be too resource-intensive

This multi-layered approach ensures visual consistency across devices while maintaining optimal performance.

---

## Particle Effect Mechanisms

### PixiJS WebGL Rendering

PixiJS powers the most sophisticated particle effects in the repository, providing hardware-accelerated WebGL rendering for smooth, interactive animations.

#### WhiteOrbs Component

**Location:** `app/components/utilities/particles/WhiteOrbs/`

**Purpose:** Creates luminescent orb particles that drift across the screen with glow effects.

**Key Features:**
- Hardware-accelerated WebGL rendering via PixiJS
- Customizable orb colors and glow effects
- Responsive particle counts (10 on mobile, 50 on desktop)
- Automatic lifecycle management (fade in, sustain, dissolve, respawn)
- Gradient masking for smooth edge blending
- Dynamic resizing on viewport changes

**Technical Implementation:**

The component uses several specialized classes:

1. **`LuminescentCircle.ts`** - Individual particle class
   - Manages particle position, velocity, radius, and alpha
   - Implements physics-based movement with screen wrapping
   - Handles three-phase lifecycle: fade-in (2s) → sustain (70% of lifespan) → dissolve (30% of lifespan)
   - Uses PixiJS Graphics API to render circle + glow layer with blur filter

2. **`createApp.ts`** - PixiJS application factory
   - Configures WebGL renderer with transparency
   - Sets up canvas element for rendering

3. **`mask.ts`** - Gradient masking utility
   - Creates radial gradient masks to fade particles at edges
   - Prevents harsh cutoffs at container boundaries

4. **Configuration (`config.ts`)**
   ```typescript
   // Mobile: 10 particles, smaller sizes
   export const mobileConfig: Config = {
     minRadius: 10,
     maxRadius: 25,
     minSpeed: 0.1,
     maxSpeed: 0.5,
     count: 10,
     minLifespan: 10000,
     maxLifespan: 20000,
     glowStrength: 10,
     minAlpha: 0.3,
     maxAlpha: 0.6,
     fadeInTime: 2000,
   };
   
   // Desktop: 50 particles, larger sizes, faster movement
   export const desktopConfig: Config = {
     minRadius: 15,
     maxRadius: 40,
     minSpeed: 0.2,
     maxSpeed: 0.8,
     count: 50,
     // ... (same other properties with adjusted values)
   };
   ```

**Usage Example:**

```tsx
import WhiteOrbs from '@/components/utilities/particles/WhiteOrbs';

<WhiteOrbs 
  height="100vh" 
  background={0x012035}      // Hex color for background
  circleColor={0x04426C}     // Hex color for orbs
  glowColor={0x04426C}       // Hex color for glow effect
>
  <YourContent />
</WhiteOrbs>
```

---

#### MatrixRain Component

**Location:** `app/components/utilities/particles/MatrixRain/`

**Purpose:** Creates an interactive Matrix-style "digital rain" effect with fully customizable symbols and colors.

**Key Features:**
- Falling character columns rendered via PixiJS Text objects
- Multiple symbol presets: default (katakana/numbers), binary, hexadecimal, custom emoji sets
- Real-time color customization via color picker
- Dynamic column count based on viewport width
- Configurable fall speed, fade duration, and symbol spacing

**Technical Implementation:**

1. **`MatrixLine.ts`** - Individual falling column class
   - Manages an array of PixiJS Text objects representing characters
   - Implements scrolling effect by updating character positions and cycling symbols
   - Handles color updates and symbol set changes dynamically
   - Configurable speed, duration, and fade effects

2. **`MatrixRain.tsx`** - Main rendering component
   - Creates PixiJS application with black background
   - Spawns columns based on `fontSize / viewport width`
   - Updates all lines on ticker with delta-time physics
   - Handles resize events by adding/removing columns dynamically

3. **`MatrixRainContainer.tsx`** - Interactive wrapper
   - Provides UI controls for color picker and symbol type dropdown
   - Implements reveal animation: overlay fade → Matrix rain activation
   - Button state management with timed transitions

4. **Symbol Sets (`symbols.ts`)**
   ```typescript
   export type Preset = 'default' | 'binary' | 'hex' | 'emoji-tech' | 'emoji-money' | 'custom';
   
   // Example: default preset
   const katakana = 'アイウエオカキクケコサシスセソ...';
   const numbers = '0123456789';
   export const defaultSymbols = (katakana + numbers).split('');
   ```

5. **Configuration (`config.ts`)**
   ```typescript
   export const matrixRainConfig = {
     fontSize: 24,              // Character size in px
     maxSpeed: 100,             // Max fall speed
     minSpeed: 60,              // Min fall speed
     fadeDuration: 3,           // Fade-out duration in seconds
     minLineDuration: 7,        // Min column lifetime
     maxLineDuration: 15,       // Max column lifetime
     symbolSpacing: 1.5,        // Vertical spacing multiplier
   };
   ```

**Usage Example:**

```tsx
import { MatrixRainContainer } from '@/components/utilities/particles/MatrixRain/MatrixRainContainer';

// Renders interactive Matrix rain with controls
<MatrixRainContainer />

// Or use the base component directly:
import { MatrixRain } from '@/components/utilities/particles/MatrixRain/MatrixRain';

<MatrixRain color="#FC1819" preset="default" />
```

**Real-World Usage:**
- Used on the press page (`app/press/sections/hero/`) as an interactive "encrypted ERC" reveal effect
- User clicks "Reveal Encrypted ERC" → overlay fades → Matrix rain activates
- Color picker and symbol type controls allow real-time customization

---

### CSS Animations

CSS-based particle effects provide lightweight alternatives for loading states, error screens, and scenarios where WebGL is unnecessary or unavailable.

#### FloatingOrbs Component

**Location:** `app/components/utilities/animations/FloatingOrbs.tsx`

**Purpose:** Lightweight CSS-animated floating orbs used for loading placeholders and error states.

**Key Features:**
- Pure CSS animations (no JavaScript runtime cost)
- 12 orbs with individual keyframe animations
- Customizable z-index for layering
- Radial gradient blur effects via box-shadow
- Automatically uses `--secondary-blue-rgb` CSS variable for theming

**Technical Implementation:**

The component generates 12 `div` elements, each styled with the `.orb` class. Each orb has:

1. **Base Styles** (`FloatingOrbs.module.css`)
   ```css
   .orb {
     position: absolute;
     bottom: -15%;
     border-radius: 50%;
     opacity: 0;
     background: rgba(var(--secondary-blue-rgb), 0.5);
     box-shadow:
       0 0 60px 20px rgba(var(--secondary-blue-rgb), 0.3),
       0 0 16px 6px rgba(var(--secondary-blue-rgb), 0.2);
     will-change: transform, opacity;
   }
   ```

2. **Individual Positioning & Animation**
   ```css
   /* Example for first orb */
   .orb:nth-child(1) { 
     left: 10%; 
     width: 25px; 
     height: 25px; 
     animation: float1 18s linear -9s infinite; 
   }
   ```

3. **Keyframes** - Each orb floats from bottom to top with unique transforms
   ```css
   @keyframes float1 { 
     0% { 
       transform: translate3d(-5px, 0, 0) scale(0.9); 
       opacity: 0; 
     } 
     15% { 
       opacity: 1; 
     } 
     100% { 
       transform: translate3d(-5px, -100vh, 0) scale(0.9); 
       opacity: 0; 
     } 
   }
   ```

**Advantages:**
- No JavaScript execution cost → ideal for loading states
- Works even if JavaScript fails to load
- Minimal bundle size impact
- Smooth 60fps animations via GPU acceleration (transform3d)

**Usage Example:**

```tsx
import FloatingOrbs from '@/components/utilities/animations/FloatingOrbs';

<div style={{ position: 'relative', minHeight: '400px' }}>
  <FloatingOrbs zIndex={0} className="custom-class" />
</div>
```

---

### MP4 Video Fallback

For mobile devices on certain pages (like the 404 page), pre-recorded MP4 video provides the visual richness of particle effects without the real-time rendering overhead.

#### Video Specifications

**Location:** `public/video/`

**Files:**
- `Particle-Effect-blueBG-BlueOrbs.webm` (404 mobile)
- `Particle-Effect-blueBG-BlueOrbs1.webm` (press hero mobile)

**Format:** WebM (VP8/VP9 codec recommended)

**Usage Pattern:**

```tsx
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  onLoadedData={() => setVideoVisible(true)}
  onError={handleVideoError}
  onStalled={ensureVideoPlaying}
>
  <source src="/video/Particle-Effect-blueBG-BlueOrbs.webm" type="video/webm" />
</video>
```

**When to Use:**
- Mobile viewports (`window.innerWidth < 730px`)
- When PixiJS would be too resource-intensive
- When consistent framerate is critical (video is pre-rendered at stable FPS)

**Trade-offs:**
- ✅ Consistent performance across devices
- ✅ No runtime WebGL compilation overhead
- ❌ Larger file size (must be downloaded)
- ❌ Not interactive (cannot respond to user input)

---

## Use Cases

### Hero Backgrounds

Particle effects create immersive, dynamic backgrounds for hero sections.

#### Home Page Hero (`app/components/pages/home/WhiteOrbsWrapper.tsx`)

**Desktop Implementation:**
- Uses `WhiteOrbs` component with sticky positioning
- Particles container is `position: sticky` with `top: 0`
- Content scrolls over the sticky particle background
- Automatically calculates content height to set particles container height

```tsx
<div className={styles.wrapper}>
  {/* Sticky background with particles */}
  {mounted && !isMobile && (
    <div className={styles.stickyBackground} style={{ height: `${contentHeight}px` }}>
      <div className={styles.particlesContainer}>
        <DynamicWhiteOrbs
          background={0x000000}
          height="100%"
          circleColor={0x04426C}
          glowColor={0x012035}
        />
      </div>
    </div>
  )}
  
  {/* Content layer */}
  <div className={styles.content} ref={contentRef}>
    <Intro />
    <Propositions />
    {/* ... */}
  </div>
</div>
```

**Mobile Fallback:**
- On mobile (`window.innerWidth < 730`), particles are disabled
- Uses solid background color instead to preserve battery life

---

#### Press Page Hero (`app/press/sections/hero/Hero.tsx`)

**Responsive Approach:**

```tsx
// Desktop: WhiteOrbs particle effect
{showOrbs && (
  <div className={styles.whiteOrbsBg}>
    <DynamicWhiteOrbs height="100%" />
  </div>
)}

// Mobile: Pre-recorded video
{showVideo && (
  <div className={styles.videoWrapper}>
    <video
      ref={videoRef}
      className={styles.videoLayer}
      onEnded={handleVideoEnded}
      src="/video/Particle-Effect-blueBG-BlueOrbs1.webm"
      muted
      playsInline
      preload="auto"
    />
  </div>
)}
```

**Breakpoint:** `730px` (desktop shows PixiJS orbs, mobile shows video)

**Video Loop Strategy:**
- `onEnded` handler fades out video → resets to `currentTime = 0` → fades back in
- Creates seamless loop with brief fade transition

---

### Interactive Containers

#### Matrix Rain Interactive Component

**Location:** `app/press/sections/hero/` (or wherever `MatrixRainContainer` is used)

**User Flow:**
1. User sees overlay text about "encrypted ERC"
2. Clicks "Reveal Encrypted ERC" button
3. Button transitions: text fades out → background turns blue → disabled state
4. Overlay fades out over 2 seconds
5. Matrix rain activates with falling symbols
6. User can customize:
   - **Color:** Via color picker (any hex color)
   - **Symbol Type:** Dropdown with presets (default/binary/hex/emoji)

**State Management:**

```tsx
const [isActive, setIsActive] = useState(false);        // Matrix rain active?
const [color, setColor] = useState('#FC1819');          // Rain color
const [preset, setPreset] = useState<Preset>('default'); // Symbol preset
const [fadeOut, setFadeOut] = useState(false);          // Overlay fading?
const [buttonPressed, setButtonPressed] = useState(false);
const [buttonDisabled, setButtonDisabled] = useState(false);

const handleReveal = () => {
  setButtonPressed(true);   // Start button transition
  setFadeOut(true);         // Fade overlay
  
  setTimeout(() => setButtonDisabled(true), 1000);  // Disable button after 1s
  setTimeout(() => setIsActive(true), 2000);        // Activate Matrix after 2s
};
```

**Real-time Controls:**
- Color picker updates `color` state → `MatrixRain` receives new prop → `MatrixLine.setColor()` updates all text objects
- Symbol dropdown updates `preset` state → `MatrixRain` receives new prop → `MatrixLine.setSymbolsSet()` updates symbol pool

---

### Image Loading States

#### OrbImage Component

**Location:** `app/components/utilities/media/images/OrbImage.tsx`

**Purpose:** Wraps Next.js `Image` component to show `FloatingOrbs` as loading placeholder, with graceful error handling.

**Features:**
- Shows CSS-animated orbs while image loads
- Fades in image when ready (`onLoad` event)
- If image errors, keeps showing orbs indefinitely
- Optional `minPlaceholderMs` to enforce minimum placeholder duration (useful for demos/testing)

**Usage Example:**

```tsx
import OrbImage from '@/components/utilities/media/images/OrbImage';

<OrbImage
  src="/images/example.jpg"
  alt="Example"
  aspectRatio="16/9"
  radius="var(--border-radius-medium)"
  showOrbs={true}           // Show orbs during load (default: true)
  orbZIndex={0}             // Z-index for orb layer
  minPlaceholderMs={500}    // Keep placeholder for min 500ms
  onLoad={(e) => console.log('Image loaded')}
  onError={(e) => console.log('Image failed')}
/>
```

**Implementation Details:**

```tsx
const [loaded, setLoaded] = useState(false);
const [errored, setErrored] = useState(false);

const handleLoad = (e) => {
  const elapsed = Date.now() - loadStartRef.current;
  const remaining = Math.max(minPlaceholderMs - elapsed, 0);
  
  if (remaining > 0) {
    setTimeout(() => setLoaded(true), remaining);
  } else {
    setLoaded(true);
  }
  onLoad?.(e);
};

const shouldShowPlaceholder = showOrbs && (!loaded || errored);

return (
  <div className={styles.container}>
    {shouldShowPlaceholder && (
      <div className={styles.placeholder}>
        <FloatingOrbs className={styles.orbs} zIndex={orbZIndex} />
      </div>
    )}
    
    <NextImage
      {...props}
      onLoad={handleLoad}
      onError={handleError}
      className={loaded ? styles.imageVisible : styles.imageHidden}
    />
  </div>
);
```

**Styling (`OrbImage.module.css`):**

```css
.placeholder {
  position: absolute;
  inset: 0;
  opacity: 1;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.imageHidden {
  opacity: 0;
}

.imageVisible {
  opacity: 1;
}
```

This ensures smooth crossfade from orbs to image.

---

### Error Components

Both inline and full-page error states use `FloatingOrbs` to maintain visual consistency with the rest of the application.

#### ErrorShellInline

**Location:** `app/components/errors/ErrorShellInline.tsx`

**Purpose:** Inline error component for sectional failures (e.g., failed data fetch in a component).

**Visual Design:**
- Radial gradient background (dark blue to black)
- `FloatingOrbs` in background layer
- Content layer (title, message, retry button) on top with `z-index: 1`
- Border with semi-transparent secondary blue
- Min-height: `400px`

**Usage Example:**

```tsx
import ErrorShellInline from '@/components/errors/ErrorShellInline';

<ErrorShellInline
  title="Failed to load data"
  message="Could not retrieve the requested information."
  onRetry={() => refetch()}
/>
```

**Structure:**

```tsx
<div style={{ /* radial gradient, min-height: 400px */ }}>
  {/* Particle layer */}
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <FloatingOrbs />
  </div>
  
  {/* Content layer */}
  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>{message}</p>
    {onRetry && <button onClick={onRetry}>Try again</button>}
  </div>
</div>
```

---

#### ErrorShellFullPage

**Location:** `app/components/errors/ErrorShellFullPage.tsx`

**Purpose:** Full-page error boundary for app-level failures.

**Differences from Inline:**
- Uses `min-height: 100vh` instead of `400px`
- Larger radial gradient (80% 60% vs contained gradient)
- Otherwise identical implementation

**Usage Example:**

```tsx
import ErrorShellFullPage from '@/components/errors/ErrorShellFullPage';

// In error boundary or global error page:
<ErrorShellFullPage
  title="Something went wrong"
  message="The application encountered an unexpected error."
  onRetry={() => window.location.reload()}
/>
```

---

### 404 Pages

The 404 page uses the most sophisticated responsive particle strategy in the codebase.

#### NotFoundOrbsWrapper

**Location:** `app/components/pages/404/NotFoundOrbsWrapper.tsx`

**Purpose:** Responsive wrapper that conditionally renders desktop (PixiJS) or mobile (video) particle effects.

**Breakpoint:** `730px`

```tsx
const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const check = () => setIsDesktop(window.innerWidth >= 730);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);

return (
  <div style={{ height: '100vh' }}>
    {isDesktop ? <DesktopOrbs /> : <MobileOrbs />}
  </div>
);
```

**Dynamic Imports:** Both components are dynamically imported with `next/dynamic` and `ssr: false` to prevent hydration mismatches and reduce initial bundle size.

---

#### NotFoundOrbsDesktop

**Location:** `app/components/pages/404/NotFoundOrbsDesktop.tsx`

**Implementation:**
- Wraps content in `<WhiteOrbs>` component
- Three animated text blocks ("404 Error", "Page Not Found", "So sorry about that")
- Text blocks use `AnimatedSvgBorderBlock` components with sequential reveal animation (800ms intervals)
- Background orbs config: `background={0x012035} circleColor={0x04426C} glowColor={0x04426C}`

**Animation Sequence:**

```tsx
const [visibleIndex, setVisibleIndex] = useState(-1);

const startSequence = useCallback(() => {
  items.forEach((_, i) => {
    const t = setTimeout(() => {
      setVisibleIndex(i);
    }, 800 * i);  // 0ms, 800ms, 1600ms
    timers.current.push(t);
  });
}, [items]);

// Auto-loop every 60 seconds
useEffect(() => {
  const loop = setInterval(() => {
    setFadeOut(true);                    // Fade out
    setTimeout(() => {                  
      setVisibleIndex(-1);               // Reset visibility
      setIteration((n) => n + 1);        // Force re-key
      startSequence();                   // Restart sequence
    }, 2000);
  }, 60000);
  
  return () => clearInterval(loop);
}, [startSequence]);
```

**Structure:**

```tsx
<WhiteOrbs height="100vh" background={0x012035} circleColor={0x04426C} glowColor={0x04426C}>
  <div className={styles.heroContainer}>
    <div className={styles.desktopContainer}>
      {items.map((item, idx) => (
        <AnimatedSvgBorderBlock
          key={`${iteration}-${idx}`}
          text={item.text}
          textColor={item.color}
          isVisible={idx <= visibleIndex}
          animationDuration={600}
        />
      ))}
    </div>
  </div>
</WhiteOrbs>
```

---

#### NotFoundOrbsMobile

**Location:** `app/components/pages/404/NotFoundOrbsMobile.tsx`

**Implementation:**
- Uses pre-recorded video (`/video/Particle-Effect-blueBG-BlueOrbs.webm`) instead of PixiJS
- Same text animation sequence as desktop
- Video watchdog to ensure continuous playback (checks every 3s)

**Video Management:**

```tsx
const [videoVisible, setVideoVisible] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);
const watchdog = useRef<NodeJS.Timeout | null>(null);

const ensureVideoPlaying = useCallback(() => {
  if (videoRef.current && (videoRef.current.paused || videoRef.current.ended)) {
    videoRef.current.play().catch(() => {
      // Retry after 500ms if autoplay is blocked
      setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 500);
    });
  }
}, []);

// Watchdog: check every 3s to ensure video is playing
useEffect(() => {
  if (!videoVisible) return;
  watchdog.current = setInterval(ensureVideoPlaying, 3000);
  return () => {
    if (watchdog.current) clearInterval(watchdog.current);
  };
}, [videoVisible, ensureVideoPlaying]);

const handleVideoError = () => {
  if (videoRef.current) {
    videoRef.current.load();
    setTimeout(ensureVideoPlaying, 500);
  }
};
```

**Video Element:**

```tsx
<video
  ref={videoRef}
  className={`${styles.backgroundVideo} ${videoVisible ? styles.videoVisible : ''}`}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  onLoadedData={() => {
    setVideoVisible(true);
    ensureVideoPlaying();
  }}
  onError={handleVideoError}
  onStalled={handleVideoError}
  onPause={ensureVideoPlaying}
  onEnded={ensureVideoPlaying}
>
  <source src="/video/Particle-Effect-blueBG-BlueOrbs.webm" type="video/webm" />
</video>
```

**Why This Approach:**
- Mobile Safari and Chrome have complex autoplay policies
- `muted` + `playsInline` + `autoPlay` attributes maximize autoplay success
- Watchdog + error handlers ensure video recovers from stalls/errors
- Multiple event handlers (`onPause`, `onEnded`, `onStalled`) trigger recovery

---

## Component Reference

### Quick Reference Table

| Component | Technology | Primary Use Case | File Location |
|-----------|-----------|------------------|---------------|
| **WhiteOrbs** | PixiJS | Hero backgrounds, desktop 404 | `app/components/utilities/particles/WhiteOrbs/` |
| **MatrixRain** | PixiJS | Interactive containers, Easter eggs | `app/components/utilities/particles/MatrixRain/` |
| **FloatingOrbs** | CSS | Loading states, error screens | `app/components/utilities/animations/FloatingOrbs.tsx` |
| **OrbImage** | CSS (FloatingOrbs) | Image loading placeholder | `app/components/utilities/media/images/OrbImage.tsx` |
| **ErrorShellInline** | CSS (FloatingOrbs) | Inline error states | `app/components/errors/ErrorShellInline.tsx` |
| **ErrorShellFullPage** | CSS (FloatingOrbs) | Full-page error states | `app/components/errors/ErrorShellFullPage.tsx` |
| **NotFoundOrbsDesktop** | PixiJS (WhiteOrbs) | 404 page desktop | `app/components/pages/404/NotFoundOrbsDesktop.tsx` |
| **NotFoundOrbsMobile** | MP4 Video | 404 page mobile | `app/components/pages/404/NotFoundOrbsMobile.tsx` |

---

### Import Paths

```tsx
// PixiJS Components
import WhiteOrbs from '@/components/utilities/particles/WhiteOrbs';
import { MatrixRain } from '@/components/utilities/particles/MatrixRain/MatrixRain';
import { MatrixRainContainer } from '@/components/utilities/particles/MatrixRain/MatrixRainContainer';

// CSS Components
import FloatingOrbs from '@/components/utilities/animations/FloatingOrbs';
import OrbImage from '@/components/utilities/media/images/OrbImage';

// Error Components
import ErrorShellInline from '@/components/errors/ErrorShellInline';
import ErrorShellFullPage from '@/components/errors/ErrorShellFullPage';

// 404 Components (dynamically imported)
const NotFoundOrbsWrapper = dynamic(() => import('@/components/pages/404/NotFoundOrbsWrapper'), { ssr: false });
```

---

## Best Practices

### Performance Optimization

1. **Dynamic Imports for PixiJS Components**
   
   PixiJS is a large library (~500KB). Always dynamically import PixiJS components with `ssr: false`:
   
   ```tsx
   const DynamicWhiteOrbs = dynamic(
     () => import('@/components/utilities/particles/WhiteOrbs'),
     { ssr: false }
   );
   ```

2. **Responsive Particle Counts**
   
   Mobile devices should render fewer particles. Use configuration files:
   
   ```typescript
   const config = isMobile ? mobileConfig : desktopConfig;
   ```

3. **Conditional Rendering Based on Viewport**
   
   For resource-intensive effects, conditionally render based on viewport:
   
   ```tsx
   {isMobile ? <VideoFallback /> : <PixiJSEffect />}
   ```

4. **Video Preloading**
   
   For smooth video playback, use `preload="auto"`:
   
   ```tsx
   <video preload="auto" muted playsInline autoPlay>
   ```

---

### Accessibility

1. **Decorative Particles**
   
   Mark particle containers as `aria-hidden` since they're decorative:
   
   ```tsx
   <div className={styles.particles} aria-hidden>
     <FloatingOrbs />
   </div>
   ```

2. **Ensure Readable Contrast**
   
   Always test text contrast over particle backgrounds. Use semi-transparent overlays if needed:
   
   ```css
   .textOverlay {
     background: rgba(0, 0, 0, 0.5);
     padding: 1rem;
   }
   ```

3. **Respect Reduced Motion Preferences**
   
   Consider adding `prefers-reduced-motion` media queries:
   
   ```tsx
   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
   
   {!prefersReducedMotion && <WhiteOrbs />}
   ```

---

### Responsive Design

1. **Breakpoint Consistency**
   
   The codebase uses `730px` as the primary mobile/desktop breakpoint for particle effects. Maintain this consistency.

2. **Sticky Backgrounds**
   
   For sticky particle backgrounds, ensure parent has explicit height:
   
   ```tsx
   <div style={{ height: `${contentHeight}px` }}>
     <div className={styles.stickyBackground}>
       <WhiteOrbs />
     </div>
   </div>
   ```

3. **Video Aspect Ratio**
   
   For video fallbacks, use `object-fit: cover` to ensure proper scaling:
   
   ```css
   .videoLayer {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   ```

---

### Testing Recommendations

1. **Test Autoplay Policies**
   
   Video autoplay can fail on some browsers. Always include fallback handlers:
   
   ```tsx
   <video
     onError={handleVideoError}
     onStalled={handleVideoError}
     onPause={ensureVideoPlaying}
   />
   ```

2. **Test WebGL Support**
   
   Some older devices don't support WebGL. Consider adding fallback detection:
   
   ```tsx
   const canvas = document.createElement('canvas');
   const isWebGLSupported = !!(
     canvas.getContext('webgl') || 
     canvas.getContext('experimental-webgl')
   );
   
   {isWebGLSupported ? <WhiteOrbs /> : <FloatingOrbs />}
   ```

3. **Test on Low-End Devices**
   
   Test PixiJS effects on low-end mobile devices to ensure 30+ FPS. If performance is poor, consider:
   - Reducing particle count further
   - Disabling blur filters on mobile
   - Using video fallback instead

---

## Troubleshooting

### Common Issues

**Issue:** PixiJS component renders blank screen

**Solution:** Ensure container has explicit dimensions before PixiJS initializes:

```tsx
// Wait for container to mount and have dimensions
useEffect(() => {
  if (containerRef.current && containerRef.current.clientWidth > 0) {
    // Initialize PixiJS
  }
}, []);
```

---

**Issue:** Video doesn't autoplay on mobile

**Solution:** Ensure video is `muted` and has `playsInline` attribute:

```tsx
<video muted playsInline autoPlay>
```

If still failing, implement play() call in `onLoadedData`:

```tsx
<video onLoadedData={() => videoRef.current?.play()} />
```

---

**Issue:** Hydration mismatch with PixiJS components

**Solution:** Use `next/dynamic` with `ssr: false` and handle initial mounting:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

{mounted && <DynamicWhiteOrbs />}
```

---

**Issue:** Particles affect scroll performance

**Solution:** 
1. Use `will-change: transform` on particle containers
2. Ensure particle container has `pointer-events: none`
3. Use `transform3d` instead of `transform` for GPU acceleration

```css
.particles {
  pointer-events: none;
  will-change: transform;
}

.orb {
  transform: translate3d(0, 0, 0); /* Force GPU layer */
}
```

---

## Conclusion

This particle effects system provides a robust, performant, and visually stunning foundation for dynamic UI elements across the application. By leveraging PixiJS for complex effects, CSS for lightweight fallbacks, and video for mobile optimization, the system ensures excellent user experience across all devices and network conditions.

For questions or contributions, please refer to the individual component documentation or contact the development team.
