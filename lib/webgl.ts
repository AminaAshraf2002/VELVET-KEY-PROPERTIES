let cached: boolean | null = null;

/**
 * Silently checks whether a WebGL context can be created.
 * Prevents THREE.WebGLRenderer from logging console errors when
 * hardware acceleration is disabled or the GPU is sandboxed.
 */
export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
    cached = !!gl;
    if (gl) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    cached = false;
  }
  return cached;
}
