# Particles (Pixi + TSParticles)

This folder contains the site’s particle/graphics utilities, primarily implemented with `pixi.js` for WebGL/canvas effects.

## What’s here

- `WhiteOrbs/` — floating luminescent orb background (Pixi). Used in hero/background contexts on desktop.
- `MatrixRain/` — “Matrix rain” effect (Pixi) with a `MatrixRainContainer` that handles timed reveal/overlay UI.
- `PixiCompatClient.tsx` + `pixi-compat.ts` — client-only Pixi compatibility shim (imports `@pixi/unsafe-eval` once).

## Important runtime notes (Next.js App Router)

### 1) Pixi must be client-only

All Pixi components are `use client` and should be dynamically imported with SSR disabled when mounted from server components:

```tsx
import dynamic from 'next/dynamic';

const WhiteOrbs = dynamic(
  () => import('@/components/utilities/particles/WhiteOrbs'),
  { ssr: false }
);
```

### 2) The Pixi compat shim is expected to run once

`app/layout.tsx` mounts `PixiCompatClient` (a server component can’t import Pixi safely, so this mounts a tiny client component that only imports the shim). If you render Pixi in a new route/layout and hit CSP/runtime issues, confirm `PixiCompatClient` is still present.

## `WhiteOrbs` overview

Entry: `app/components/utilities/particles/WhiteOrbs/index.tsx`

- Creates a single Pixi `Application` bound to a `<canvas>` via `createPixiApp` (`app/components/utilities/particles/WhiteOrbs/createApp.ts`).
- Spawns `config.count` instances of `LuminescentCircle` (`app/components/utilities/particles/WhiteOrbs/LuminescentCircle.ts`) and updates them on the Pixi ticker.
- Applies a top/bottom fade mask via `createGradientMask` (`app/components/utilities/particles/WhiteOrbs/mask.ts`) so particles blend out at the edges.
- Uses `useIsMobile()` (`app/components/utilities/particles/WhiteOrbs/useIsMobile.ts`) to select `mobileConfig` vs `desktopConfig` (`app/components/utilities/particles/WhiteOrbs/config.ts`).

### Performance knobs

- `createPixiApp` caps the ticker FPS (`app.ticker.maxFPS = 24`) to keep the background effect lightweight.
- `mobileConfig` reduces particle count and speeds; `desktopConfig` increases density.
- When the `useIsMobile()` breakpoint flips (max-width `730px`), `WhiteOrbs` rebuilds the particle set using the new config.

### Resize behavior

On window resize, `WhiteOrbs`:

- Resizes the Pixi renderer + canvas to match the container.
- Rebuilds the gradient mask (and destroys the previous mask sprite) so the fade stays correct for the new dimensions.

## `MatrixRain` overview

Entry: `app/components/utilities/particles/MatrixRain/MatrixRain.tsx`

- Creates a Pixi `Application` that appends its `view` to the container (`MatrixRain/pixiApp.ts`) and sets `pointerEvents = 'none'` on the canvas.
- Computes column count from container width and `matrixRainConfig.fontSize` (`MatrixRain/config.ts`).
- Manages per-column animation with `MatrixLine` (`MatrixRain/MatrixLine.ts`).
- On resize, it adjusts the renderer, recomputes columns, and adds/removes `MatrixLine` instances accordingly.

Container UI: `app/components/utilities/particles/MatrixRain/MatrixRainContainer.tsx`

- Handles the timed “reveal” flow (overlay → fade → start rain) and exposes controls like color + symbol preset.

## Tests and Storybook

- Unit/integration tests live alongside implementations under `__tests__/` (e.g. `WhiteOrbs/__tests__`, `MatrixRain/__tests__`).
- Storybook stories live under `__stories__/` and are a good way to iterate on visuals without navigating the full site.

## Related (outside this folder)

- Some hero/mobile experiences use **pre-recorded video captures** of particle animations to avoid running WebGL on constrained devices. Those assets live in `public/video/` and are mounted by page-level hero components.
