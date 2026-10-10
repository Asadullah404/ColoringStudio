// Haptic feedback controller for mobile browsers
class HapticEngine {
  private enabled = true;

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public lightTap() {
    if (!this.enabled || !('vibrate' in navigator)) return;
    try {
      navigator.vibrate(12);
    } catch {
      // Ignore vibration errors if not supported
    }
  }

  public regionFilled() {
    if (!this.enabled || !('vibrate' in navigator)) return;
    try {
      navigator.vibrate([15, 30, 20]);
    } catch {
      // Ignore
    }
  }

  public levelCompleted() {
    if (!this.enabled || !('vibrate' in navigator)) return;
    try {
      navigator.vibrate([30, 50, 40, 60, 80]);
    } catch {
      // Ignore
    }
  }
}

export const hapticEngine = new HapticEngine();
