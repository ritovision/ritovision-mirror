// components/utilities/performance/performanceUtils.ts

/**
 * Measures average FPS over a given duration (default is 1 second).
 */
export async function measureFPS(duration = 1000): Promise<number> {
  return new Promise((resolve) => {
    let frameCount = 0;
    const start = performance.now();

    function tick() {
      frameCount++;
      const now = performance.now();
      if (now - start >= duration) {
        const fps = (frameCount * 1000) / (now - start);
        resolve(fps);
      } else {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  });
}

/**
 * Determines a basic GPU tier.
 * Returns:
 * - 0: No WebGL support or extremely poor GPU.
 * - 1: Mid-tier GPU.
 * - 2: High-tier GPU.
 */
export function getGpuTier(): number {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return 0; // No WebGL support

  // Assert that gl is a WebGLRenderingContext
  const webgl = gl as WebGLRenderingContext;
  const ext = webgl.getExtension('WEBGL_debug_renderer_info');
  let renderer = '';
  if (ext) {
    renderer = webgl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
  }
  // If no renderer info is available, default to mid-tier
  if (!renderer) {
    return 1;
  }
  renderer = renderer.toLowerCase();
  if (renderer.includes('intel') || renderer.includes('mali') || renderer.includes('adreno')) {
    return 1;
  }
  return 2;
}

/**
 * Evaluates overall performance and returns a performance tier.
 * - 'none': Device is too weak for particles.
 * - 'low': Device is marginal.
 * - 'high': Device is performant.
 */
export async function getPerfTier(): Promise<'none' | 'low' | 'high'> {
  const gpuTier = getGpuTier();
  // deviceMemory might not be available on all browsers; assume 4GB if not provided.
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const fps = await measureFPS();

  // Critical performance issues:
  if (gpuTier === 0 || deviceMemory <= 1 || hardwareConcurrency <= 2 || fps < 24) {
    return 'none';
  }
  // Moderate issues:
  if (gpuTier === 1 || deviceMemory <= 2 || fps < 35) {
    return 'low';
  }
  // Everything's good:
  return 'high';
}
