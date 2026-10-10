import { PlayerProgress, GameSettings } from '../types/game';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY_PROGRESS = 'colorzen_asmr_progress_v1';
const STORAGE_KEY_SETTINGS = 'colorzen_asmr_settings_v1';

export const DEFAULT_PROGRESS: PlayerProgress = {
  totalStars: 0,
  unlockedLevels: ['ch1_lvl1', 'ch2_lvl1', 'ch3_lvl1', 'level_1'],
  completedLevels: [],
  levelColors: {},
  dailyCompletedDates: [],
  lastPlayedLevelId: 'ch1_lvl1',
  currentChapterId: 1,
};

export const DEFAULT_SETTINGS: GameSettings = {
  soundEffects: true,
  ambientMusic: false,
  hapticFeedback: true,
  showMarkerPen: true,
};

// Local storage helpers
export function loadLocalProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
        unlockedLevels: parsed.unlockedLevels || ['level_1'],
      };
    }
  } catch (e) {
    console.error('Failed to load local progress:', e);
  }
  return DEFAULT_PROGRESS;
}

export function saveLocalProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save local progress:', e);
  }
}

export function loadLocalSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load local settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveLocalSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save local settings:', e);
  }
}

// Firebase Cloud Sync
export async function syncProgressToFirebase(progress: PlayerProgress): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;

  const path = `user_progress/${user.uid}`;
  try {
    const payload = {
      userId: user.uid,
      totalStars: progress.totalStars,
      completedLevels: progress.completedLevels,
      unlockedLevels: progress.unlockedLevels,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'user_progress', user.uid), payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function loadProgressFromFirebase(): Promise<PlayerProgress | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const path = `user_progress/${user.uid}`;
  try {
    const snap = await getDoc(doc(db, 'user_progress', user.uid));
    if (snap.exists()) {
      const data = snap.data();
      const local = loadLocalProgress();
      // Merge local with cloud
      const merged: PlayerProgress = {
        ...local,
        userId: user.uid,
        totalStars: Math.max(local.totalStars, data.totalStars || 0),
        completedLevels: Array.from(new Set([...local.completedLevels, ...(data.completedLevels || [])])),
        unlockedLevels: Array.from(new Set([...local.unlockedLevels, ...(data.unlockedLevels || ['level_1'])])),
      };
      saveLocalProgress(merged);
      return merged;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}
