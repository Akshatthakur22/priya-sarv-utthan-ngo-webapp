/**
 * Haptic Feedback Utilities
 * Provides native app-like vibration feedback on mobile devices
 */

/**
 * Triggers a light haptic vibration on supported devices
 * @param duration - Vibration duration in milliseconds (default: 50ms)
 */
export function triggerHaptic(duration: number = 50): void {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Silently fail if vibration is not supported
    }
  }
}

/**
 * Triggers a success haptic pattern (two short vibrations)
 */
export function triggerSuccessHaptic(): void {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate([50, 50, 50]);
    } catch {
      // Silently fail
    }
  }
}

/**
 * Triggers a button press haptic (very short vibration)
 */
export function triggerButtonHaptic(p0: number): void {
  triggerHaptic(30);
}
