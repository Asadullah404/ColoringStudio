export interface ColoringRegion {
  id: string;
  name: string;
  path: string; // SVG path data (d attribute)
  targetColor?: string; // Suggested or sample target color
  initialColor?: string; // Default fill color (default #FFFFFF)
}

export interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  badge: string;
}

export interface LevelData {
  id: string;
  chapterId: number;
  levelNumber: number;
  title: string;
  category: 'shapes' | 'fruits' | 'cute' | 'food' | 'animals' | 'nature' | 'vehicles' | 'daily';
  emoji: string;
  characterPrompt: string; // e.g. "Color the star bright! ⭐"
  palette: string[]; // Recommended 8-12 colors for this picture
  regions: ColoringRegion[];
  outlineStrokeWidth?: number;
  previewSvg?: string; // Optional custom preview
  viewBox: string; // Default "0 0 400 400"
}

export interface PlayerProgress {
  userId?: string;
  totalStars: number;
  unlockedLevels: string[];
  completedLevels: string[];
  levelColors: Record<string, Record<string, string>>; // levelId -> { regionId: hexColor }
  levelCoverage?: Record<string, Record<string, number>>; // levelId -> { regionId: coverage (0-100) }
  dailyCompletedDates: string[]; // YYYY-MM-DD strings
  lastPlayedLevelId: string;
  currentChapterId?: number;
}

export interface GameSettings {
  soundEffects: boolean;
  ambientMusic: boolean;
  hapticFeedback: boolean;
  showMarkerPen: boolean;
}

export interface AdStatus {
  bannerVisible: boolean;
  rewardedAdAvailable: boolean;
}
