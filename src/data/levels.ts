import { LevelData, ChapterInfo } from '../types/game';

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    title: 'Chapter 1: Shapes',
    subtitle: '8 fun geometric shapes with bold lines',
    emoji: '⭐',
    badge: 'Shapes',
  },
  {
    id: 2,
    title: 'Chapter 2: Fruits',
    subtitle: '8 juicy fruits with reference previews',
    emoji: '🍓',
    badge: 'Fruits',
  },
  {
    id: 3,
    title: 'Chapter 3: Cozy Art',
    subtitle: '10 adorable cute objects & characters',
    emoji: '🧋',
    badge: 'Cozy',
  },
];

export const LEVELS: LevelData[] = [
  // ==========================================
  // CHAPTER 1: SIMPLE & EASY SHAPES (8 LEVELS)
  // ==========================================
  {
    id: 'ch1_lvl1',
    chapterId: 1,
    levelNumber: 1,
    title: 'Cute Star',
    category: 'shapes',
    emoji: '⭐',
    characterPrompt: 'Color the golden star! ⭐',
    palette: [
      '#FFD166', // Golden yellow
      '#FF9F1C', // Amber
      '#EF476F', // Red
      '#70D6FF', // Sky blue
      '#06D6A0', // Mint
      '#8338EC', // Violet
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'star_main_body',
        name: 'Star Body',
        targetColor: '#FFD166',
        path: 'M 200 45 L 245 140 L 350 150 L 270 220 L 295 325 L 200 270 L 105 325 L 130 220 L 50 150 L 155 140 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl2',
    chapterId: 1,
    levelNumber: 2,
    title: 'Sweet Heart',
    category: 'shapes',
    emoji: '❤️',
    characterPrompt: 'Paint the sweet heart! ❤️',
    palette: [
      '#EF476F', // Coral red
      '#FF70A6', // Bubblegum pink
      '#FFD166', // Golden yellow
      '#70D6FF', // Sky blue
      '#06D6A0', // Mint
      '#8338EC', // Violet
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'heart_left',
        name: 'Left Heart Half',
        targetColor: '#EF476F',
        path: 'M 200 130 C 180 80 100 80 100 155 C 100 210 160 260 200 310 L 200 130 Z',
      },
      {
        id: 'heart_right',
        name: 'Right Heart Half',
        targetColor: '#FF70A6',
        path: 'M 200 130 L 200 310 C 240 260 300 210 300 155 C 300 80 220 80 200 130 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl3',
    chapterId: 1,
    levelNumber: 3,
    title: 'Happy Circle',
    category: 'shapes',
    emoji: '🟡',
    characterPrompt: 'Color sunny circle! 🟡',
    palette: [
      '#FFD166', // Golden yellow
      '#FB8500', // Amber orange
      '#EF476F', // Red
      '#06D6A0', // Mint
      '#70D6FF', // Sky blue
      '#8338EC', // Violet
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'sun_rays_ring',
        name: 'Outer Sunny Ring',
        targetColor: '#FB8500',
        path: 'M 200 50 A 150 150 0 1 0 350 200 A 150 150 0 0 0 200 50 Z M 200 90 A 110 110 0 1 1 90 200 A 110 110 0 0 1 200 90 Z',
      },
      {
        id: 'sun_circle_face',
        name: 'Inner Circle Center',
        targetColor: '#FFD166',
        path: 'M 90 200 A 110 110 0 1 0 310 200 A 110 110 0 0 0 90 200 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl4',
    chapterId: 1,
    levelNumber: 4,
    title: 'Gift Square',
    category: 'shapes',
    emoji: '🟦',
    characterPrompt: 'Color the gift square! 🟦',
    palette: [
      '#3A86FF', // Royal blue
      '#06D6A0', // Fresh mint
      '#FFD166', // Yellow
      '#EF476F', // Red
      '#FF70A6', // Pink
      '#8338EC', // Purple
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'square_top_half',
        name: 'Top Half Square',
        targetColor: '#3A86FF',
        path: 'M 90 90 L 310 90 L 310 200 L 90 200 Z',
      },
      {
        id: 'square_bottom_half',
        name: 'Bottom Half Square',
        targetColor: '#06D6A0',
        path: 'M 90 200 L 310 200 L 310 310 L 90 310 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl5',
    chapterId: 1,
    levelNumber: 5,
    title: 'Party Triangle',
    category: 'shapes',
    emoji: '🔺',
    characterPrompt: 'Color party triangle! 🔺',
    palette: [
      '#8338EC', // Violet cone
      '#00F5D4', // Aqua base
      '#FFD166', // Golden yellow
      '#EF476F', // Red
      '#70D6FF', // Sky blue
      '#FF70A6', // Pink
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'triangle_top',
        name: 'Top Triangle',
        targetColor: '#8338EC',
        path: 'M 200 65 L 310 220 L 90 220 Z',
      },
      {
        id: 'triangle_bottom',
        name: 'Bottom Base',
        targetColor: '#00F5D4',
        path: 'M 90 220 L 310 220 L 325 325 L 75 325 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl6',
    chapterId: 1,
    levelNumber: 6,
    title: 'Crescent Moon',
    category: 'shapes',
    emoji: '🌙',
    characterPrompt: 'Sweet bedtime moon! 🌙',
    palette: [
      '#FFD166', // Golden yellow
      '#70D6FF', // Sky star
      '#FF85A1', // Pink
      '#EF476F', // Red
      '#8338EC', // Violet
      '#06D6A0', // Mint
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'moon_body',
        name: 'Crescent Moon',
        targetColor: '#FFD166',
        path: 'M 230 75 C 130 75 80 155 80 245 C 80 325 140 360 220 360 C 160 330 140 270 140 220 C 140 150 180 95 230 75 Z',
      },
      {
        id: 'moon_star_friend',
        name: 'Star Friend',
        targetColor: '#70D6FF',
        path: 'M 270 180 L 278 196 L 294 196 L 282 206 L 287 222 L 270 212 L 253 222 L 258 206 L 246 196 L 262 196 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl7',
    chapterId: 1,
    levelNumber: 7,
    title: 'Sweet Oval',
    category: 'shapes',
    emoji: '🥚',
    characterPrompt: 'Color the cute oval! 🥚',
    palette: [
      '#06D6A0', // Mint top
      '#FF70A6', // Pink bottom
      '#FFD166', // Golden yellow
      '#3A86FF', // Blue
      '#8338EC', // Purple
      '#EF476F', // Coral red
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'oval_top',
        name: 'Top Half Oval',
        targetColor: '#06D6A0',
        path: 'M 110 200 C 110 100 150 65 200 65 C 250 65 290 100 290 200 Z',
      },
      {
        id: 'oval_bottom',
        name: 'Bottom Half Oval',
        targetColor: '#FF70A6',
        path: 'M 110 200 C 110 300 150 335 200 335 C 250 335 290 300 290 200 Z',
      },
    ],
  },

  {
    id: 'ch1_lvl8',
    chapterId: 1,
    levelNumber: 8,
    title: 'Simple Diamond',
    category: 'shapes',
    emoji: '💎',
    characterPrompt: 'Sparkle the diamond! 💎',
    palette: [
      '#70D6FF', // Sky diamond top
      '#3A86FF', // Royal blue bottom
      '#FFD166', // Golden glint
      '#00F5D4', // Aqua
      '#FF70A6', // Pink
      '#8338EC', // Violet
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'diamond_top_half',
        name: 'Top Triangle',
        targetColor: '#70D6FF',
        path: 'M 200 60 L 320 200 L 80 200 Z',
      },
      {
        id: 'diamond_bottom_half',
        name: 'Bottom Triangle',
        targetColor: '#3A86FF',
        path: 'M 80 200 L 320 200 L 200 340 Z',
      },
    ],
  },

  // ==========================================
  // CHAPTER 2: JUICY FRUITS (8 LEVELS)
  // ==========================================
  {
    id: 'ch2_lvl1',
    chapterId: 2,
    levelNumber: 1,
    title: 'Crisp Apple',
    category: 'fruits',
    emoji: '🍎',
    characterPrompt: 'Sweet juicy apple! 🍎',
    palette: [
      '#EF233C', // Apple red
      '#D90429', // Deep crimson
      '#70E000', // Green leaf
      '#38B000', // Forest leaf
      '#80522F', // Woody stem
      '#FFE5B4', // Apple slice flesh
      '#333333', // Apple seed
      '#FFFFFF', // Gloss shine
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'apple_left_half',
        name: 'Left Apple Body',
        targetColor: '#EF233C',
        path: 'M 200 150 C 170 120 100 120 90 200 C 80 270 140 340 200 340 L 200 150 Z',
      },
      {
        id: 'apple_right_half',
        name: 'Right Apple Body',
        targetColor: '#D90429',
        path: 'M 200 150 L 200 340 C 260 340 320 270 310 200 C 300 120 230 120 200 150 Z',
      },
      {
        id: 'apple_stem',
        name: 'Woody Stem',
        targetColor: '#80522F',
        path: 'M 194 150 Q 200 80 230 70 L 235 78 Q 210 88 206 150 Z',
      },
      {
        id: 'apple_leaf',
        name: 'Green Leaf',
        targetColor: '#70E000',
        path: 'M 210 120 Q 280 80 290 125 Q 250 150 210 120 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl2',
    chapterId: 2,
    levelNumber: 2,
    title: 'Sweet Strawberry',
    category: 'fruits',
    emoji: '🍓',
    characterPrompt: 'Berry sweet strawberry! 🍓',
    palette: [
      '#FF4D6D', // Strawberry red
      '#C9184A', // Berry depth
      '#38B000', // Leaf crown
      '#70E000', // Bright calyx
      '#FFD166', // Golden yellow
      '#FF85A1', // Blush
      '#FFFFFF', // Flower petals
      '#FFB703', // Flower center
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'strawberry_body',
        name: 'Strawberry Body',
        targetColor: '#FF4D6D',
        path: 'M 110 150 C 90 220 160 340 200 350 C 240 340 310 220 290 150 Q 200 130 110 150 Z',
      },
      {
        id: 'strawberry_crown',
        name: 'Leaf Crown',
        targetColor: '#38B000',
        path: 'M 110 150 L 140 100 L 175 145 L 200 80 L 225 145 L 260 100 L 290 150 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl3',
    chapterId: 2,
    levelNumber: 3,
    title: 'Watermelon Slice',
    category: 'fruits',
    emoji: '🍉',
    characterPrompt: 'Cool melon slice! 🍉',
    palette: [
      '#EF476F', // Watermelon red
      '#06D6A0', // Pale inner rind
      '#2D6A4F', // Dark green rind
      '#333333', // Black seeds
      '#FF85A1', // Sweet pulp
      '#FFFFFF', // Rind white
      '#FFE66D', // Summer sun
      '#FF70A6', // Berry splash
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'rind_dark_outer',
        name: 'Dark Green Rind',
        targetColor: '#2D6A4F',
        path: 'M 60 270 Q 200 370 340 270 L 330 290 Q 200 390 70 290 Z',
      },
      {
        id: 'rind_pale_inner',
        name: 'Crisp Light Rind',
        targetColor: '#06D6A0',
        path: 'M 70 255 Q 200 355 330 255 L 340 270 Q 200 370 60 270 Z',
      },
      {
        id: 'watermelon_flesh',
        name: 'Sweet Ruby Flesh',
        targetColor: '#EF476F',
        path: 'M 200 70 L 330 255 Q 200 355 70 255 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl4',
    chapterId: 2,
    levelNumber: 4,
    title: 'Tropical Pineapple',
    category: 'fruits',
    emoji: '🍍',
    characterPrompt: 'Tropical vacation vibe! 🍍',
    palette: [
      '#FFB703', // Pineapple gold
      '#FB8500', // Amber orange
      '#52B788', // Spiky crown green
      '#2D6A4F', // Dark jungle leaf
      '#003566', // Sunglasses dark
      '#FFD166', // Bright peel
      '#FFFFFF', // Glasses reflection
      '#FF70A6', // Flower accessory
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'pineapple_body',
        name: 'Pineapple Fruit Body',
        targetColor: '#FFB703',
        path: 'M 130 180 C 110 270 140 350 200 350 C 260 350 290 270 270 180 Q 200 160 130 180 Z',
      },
      {
        id: 'crown_leaf_top',
        name: 'Center Spiky Crown',
        targetColor: '#2D6A4F',
        path: 'M 190 170 L 200 60 L 210 170 Z',
      },
      {
        id: 'crown_leaf_left_spike',
        name: 'Left Crown Spike',
        targetColor: '#52B788',
        path: 'M 190 170 L 130 80 L 170 165 Z',
      },
      {
        id: 'crown_leaf_right_spike',
        name: 'Right Crown Spike',
        targetColor: '#52B788',
        path: 'M 210 170 L 270 80 L 230 165 Z',
      },
      {
        id: 'cross_hatch_1',
        name: 'Diamond Texture 1',
        targetColor: '#FB8500',
        path: 'M 140 220 L 260 220 L 250 245 L 150 245 Z',
      },
      {
        id: 'cross_hatch_2',
        name: 'Diamond Texture 2',
        targetColor: '#FB8500',
        path: 'M 150 270 L 250 270 L 240 295 L 160 295 Z',
      },
      {
        id: 'cool_sunglasses_left',
        name: 'Left Sunglass Lens',
        targetColor: '#003566',
        path: 'M 145 200 L 185 200 L 180 230 L 150 230 Z',
      },
      {
        id: 'cool_sunglasses_right',
        name: 'Right Sunglass Lens',
        targetColor: '#003566',
        path: 'M 215 200 L 255 200 L 250 230 L 220 230 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl5',
    chapterId: 2,
    levelNumber: 5,
    title: 'Ripe Bananas',
    category: 'fruits',
    emoji: '🍌',
    characterPrompt: 'Color sweet bananas! 🍌',
    palette: [
      '#FFD166', // Banana yellow
      '#FFE6A7', // Soft banana pulp
      '#BC6C25', // Brown stem tip
      '#606C38', // Green unripe tip
      '#FF9F1C', // Amber curve
      '#FFFFFF', // Shine
      '#9D0208', // Red sticker
      '#4D908E', // Island leaf
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'banana_1_body',
        name: 'Main Yellow Banana',
        targetColor: '#FFD166',
        path: 'M 140 100 Q 80 230 180 320 Q 280 340 310 270 Q 240 300 170 240 Q 140 180 160 100 Z',
      },
      {
        id: 'banana_2_back',
        name: 'Second Banana Behind',
        targetColor: '#FF9F1C',
        path: 'M 160 100 Q 240 140 270 230 Q 290 200 270 170 Q 220 120 160 100 Z',
      },
      {
        id: 'banana_stem_crown',
        name: 'Stem Bunch Top',
        targetColor: '#606C38',
        path: 'M 130 90 L 170 85 L 165 110 L 135 110 Z',
      },
      {
        id: 'banana_tip_dark',
        name: 'Bottom Peel Tip',
        targetColor: '#BC6C25',
        path: 'M 300 265 L 325 260 L 320 280 L 295 280 Z',
      },
      {
        id: 'banana_sticker',
        name: 'Cute Brand Sticker',
        targetColor: '#9D0208',
        path: 'M 175 190 A 15 15 0 1 0 205 190 A 15 15 0 1 0 175 190 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl6',
    chapterId: 2,
    levelNumber: 6,
    title: 'Citrus Orange',
    category: 'fruits',
    emoji: '🍊',
    characterPrompt: 'Tangy fresh orange! 🍊',
    palette: [
      '#FB8500', // Bright orange peel
      '#FFB703', // Citrus segment
      '#FFF3B0', // White inner pith
      '#38B000', // Leaf green
      '#80522F', // Twig brown
      '#FFFFFF', // White segment divider
      '#D90429', // Blood orange
      '#FF85A1', // Cheek blush
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'orange_peel_ring',
        name: 'Outer Orange Rind',
        targetColor: '#FB8500',
        path: 'M 80 220 A 120 120 0 1 0 320 220 A 120 120 0 1 0 80 220 Z',
      },
      {
        id: 'orange_white_pith',
        name: 'Inner White Pith',
        targetColor: '#FFF3B0',
        path: 'M 100 220 A 100 100 0 1 0 300 220 A 100 100 0 1 0 100 220 Z',
      },
      {
        id: 'segment_1',
        name: 'Juicy Segment 1',
        targetColor: '#FFB703',
        path: 'M 200 220 L 180 140 Q 200 135 220 140 Z',
      },
      {
        id: 'segment_2',
        name: 'Juicy Segment 2',
        targetColor: '#FFB703',
        path: 'M 200 220 L 235 150 Q 260 170 270 190 Z',
      },
      {
        id: 'segment_3',
        name: 'Juicy Segment 3',
        targetColor: '#FFB703',
        path: 'M 200 220 L 270 210 Q 270 235 255 260 Z',
      },
      {
        id: 'segment_4',
        name: 'Juicy Segment 4',
        targetColor: '#FFB703',
        path: 'M 200 220 L 235 280 Q 210 295 190 295 Z',
      },
      {
        id: 'segment_5',
        name: 'Juicy Segment 5',
        targetColor: '#FFB703',
        path: 'M 200 220 L 165 280 Q 140 260 130 235 Z',
      },
      {
        id: 'segment_6',
        name: 'Juicy Segment 6',
        targetColor: '#FFB703',
        path: 'M 200 220 L 130 205 Q 140 175 165 150 Z',
      },
      {
        id: 'orange_leaf_top',
        name: 'Leaf on Stem',
        targetColor: '#38B000',
        path: 'M 200 100 Q 260 60 270 95 Q 235 120 200 100 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl7',
    chapterId: 2,
    levelNumber: 7,
    title: 'Plump Grapes',
    category: 'fruits',
    emoji: '🍇',
    characterPrompt: 'Juicy sweet grapes! 🍇',
    palette: [
      '#7209B7', // Deep grape purple
      '#9D4EDD', // Royal violet
      '#C77DFF', // Soft lilac grape
      '#38B000', // Grape leaf green
      '#70E000', // Bright tendril
      '#80522F', // Woody vine
      '#FFFFFF', // Dew shine
      '#06D6A0', // Muscat green
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'grape_berry_1',
        name: 'Top Center Grape',
        targetColor: '#9D4EDD',
        path: 'M 175 170 A 25 25 0 1 0 225 170 A 25 25 0 1 0 175 170 Z',
      },
      {
        id: 'grape_berry_2',
        name: 'Top Left Grape',
        targetColor: '#7209B7',
        path: 'M 130 185 A 25 25 0 1 0 180 185 A 25 25 0 1 0 130 185 Z',
      },
      {
        id: 'grape_berry_3',
        name: 'Top Right Grape',
        targetColor: '#C77DFF',
        path: 'M 220 185 A 25 25 0 1 0 270 185 A 25 25 0 1 0 220 185 Z',
      },
      {
        id: 'grape_berry_4',
        name: 'Middle Left Grape',
        targetColor: '#9D4EDD',
        path: 'M 150 230 A 25 25 0 1 0 200 230 A 25 25 0 1 0 150 230 Z',
      },
      {
        id: 'grape_berry_5',
        name: 'Middle Right Grape',
        targetColor: '#7209B7',
        path: 'M 200 230 A 25 25 0 1 0 250 230 A 25 25 0 1 0 200 230 Z',
      },
      {
        id: 'grape_berry_6',
        name: 'Bottom Grape Tip',
        targetColor: '#C77DFF',
        path: 'M 175 275 A 25 25 0 1 0 225 275 A 25 25 0 1 0 175 275 Z',
      },
      {
        id: 'grape_leaf_wide',
        name: 'Grapevine Leaf',
        targetColor: '#38B000',
        path: 'M 200 130 Q 280 90 260 135 Q 240 160 200 130 Z',
      },
      {
        id: 'grape_vine_stem',
        name: 'Twisting Vine Stem',
        targetColor: '#80522F',
        path: 'M 200 130 Q 185 80 200 65 L 208 70 Q 195 85 205 130 Z',
      },
    ],
  },

  {
    id: 'ch2_lvl8',
    chapterId: 2,
    levelNumber: 8,
    title: 'Twin Cherries',
    category: 'fruits',
    emoji: '🍒',
    characterPrompt: 'Glossy red cherries! 🍒',
    palette: [
      '#D90429', // Deep cherry red
      '#EF233C', // Bright cherry red
      '#38B000', // Green cherry leaf
      '#70E000', // Dual stem
      '#FFFFFF', // White specular gloss
      '#FF85A1', // Blush
      '#FFE5B4', // Cream
      '#6A040F', // Dark shadow
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'cherry_left_body',
        name: 'Left Cherry Fruit',
        targetColor: '#D90429',
        path: 'M 110 260 A 45 45 0 1 0 200 260 A 45 45 0 1 0 110 260 Z',
      },
      {
        id: 'cherry_right_body',
        name: 'Right Cherry Fruit',
        targetColor: '#EF233C',
        path: 'M 205 260 A 45 45 0 1 0 295 260 A 45 45 0 1 0 205 260 Z',
      },
      {
        id: 'cherry_shine_left',
        name: 'Left Cherry Shine',
        targetColor: '#FFFFFF',
        path: 'M 135 240 A 10 10 0 1 0 155 240 A 10 10 0 1 0 135 240 Z',
      },
      {
        id: 'cherry_shine_right',
        name: 'Right Cherry Shine',
        targetColor: '#FFFFFF',
        path: 'M 230 240 A 10 10 0 1 0 250 240 A 10 10 0 1 0 230 240 Z',
      },
      {
        id: 'stem_left_twig',
        name: 'Left Stem Branch',
        targetColor: '#70E000',
        path: 'M 155 220 Q 170 140 200 100 L 208 105 Q 178 145 163 220 Z',
      },
      {
        id: 'stem_right_twig',
        name: 'Right Stem Branch',
        targetColor: '#70E000',
        path: 'M 250 220 Q 230 140 200 100 L 208 105 Q 238 145 258 220 Z',
      },
      {
        id: 'double_leaf_crown',
        name: 'Twin Cherry Leaf',
        targetColor: '#38B000',
        path: 'M 200 100 Q 270 70 280 110 Q 240 120 200 100 Z',
      },
    ],
  },

  // ==========================================
  // CHAPTER 3: COZY ART & CHARACTERS (10 LEVELS)
  // ==========================================
  {
    id: 'ch3_lvl1',
    chapterId: 3,
    levelNumber: 1,
    title: 'Happy Boba Tea',
    category: 'cute',
    emoji: '🧋',
    characterPrompt: 'can you do? 🧋',
    palette: [
      '#FF6B8B', '#4ECDC4', '#FFE66D', '#845EC2',
      '#FF9671', '#2C2C54', '#F9F871', '#FFFFFF', '#80522F',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'cup_body',
        name: 'Milk Tea Liquid',
        targetColor: '#FF9671',
        path: 'M 115 140 L 130 320 Q 132 340 155 340 L 245 340 Q 268 340 270 320 L 285 140 Z',
      },
      {
        id: 'cup_sleeve',
        name: 'Cup Sleeve',
        targetColor: '#FFE66D',
        path: 'M 122 210 L 126 270 L 274 270 L 278 210 Z',
      },
      {
        id: 'cup_heart',
        name: 'Heart Decal',
        targetColor: '#FF6B8B',
        path: 'M 200 250 C 185 235 170 245 180 260 C 190 272 200 280 200 280 C 200 280 210 272 220 260 C 230 245 215 235 200 250 Z',
      },
      {
        id: 'cup_lid',
        name: 'Dome Lid',
        targetColor: '#4ECDC4',
        path: 'M 95 140 Q 95 90 200 90 Q 305 90 305 140 Q 305 150 295 150 L 105 150 Q 95 150 95 140 Z',
      },
      {
        id: 'cup_straw',
        name: 'Striped Straw',
        targetColor: '#FF6B8B',
        path: 'M 220 50 L 245 50 L 235 110 L 210 110 Z',
      },
      {
        id: 'boba_1',
        name: 'Boba Pearl 1',
        targetColor: '#2C2C54',
        path: 'M 150 305 A 15 15 0 1 0 180 305 A 15 15 0 1 0 150 305 Z',
      },
      {
        id: 'boba_2',
        name: 'Boba Pearl 2',
        targetColor: '#2C2C54',
        path: 'M 220 305 A 15 15 0 1 0 250 305 A 15 15 0 1 0 220 305 Z',
      },
      {
        id: 'boba_3',
        name: 'Boba Pearl 3',
        targetColor: '#2C2C54',
        path: 'M 185 290 A 15 15 0 1 0 215 290 A 15 15 0 1 0 185 290 Z',
      },
      {
        id: 'boba_4',
        name: 'Boba Pearl 4',
        targetColor: '#2C2C54',
        path: 'M 160 270 A 13 13 0 1 0 186 270 A 13 13 0 1 0 160 270 Z',
      },
      {
        id: 'boba_5',
        name: 'Boba Pearl 5',
        targetColor: '#2C2C54',
        path: 'M 220 270 A 13 13 0 1 0 246 270 A 13 13 0 1 0 220 270 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl2',
    chapterId: 3,
    levelNumber: 2,
    title: 'Kawaii Kitty',
    category: 'animals',
    emoji: '🐱',
    characterPrompt: 'Make kitty cute! 😻',
    palette: [
      '#FFD2A0', '#FF85A2', '#FFE156', '#FF5E7E',
      '#4D96FF', '#FFFFFF', '#333333', '#6BCB77',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'cat_body',
        name: 'Cat Face & Body',
        targetColor: '#FFD2A0',
        path: 'M 110 160 Q 80 100 130 90 Q 170 120 200 120 Q 230 120 270 90 Q 320 100 290 160 Q 330 230 280 290 L 280 340 L 120 340 L 120 290 Q 70 230 110 160 Z',
      },
      {
        id: 'ear_left_inner',
        name: 'Left Inner Ear',
        targetColor: '#FF85A2',
        path: 'M 115 145 L 135 105 L 155 135 Z',
      },
      {
        id: 'ear_right_inner',
        name: 'Right Inner Ear',
        targetColor: '#FF85A2',
        path: 'M 285 145 L 265 105 L 245 135 Z',
      },
      {
        id: 'cheeks_left',
        name: 'Left Blush Cheek',
        targetColor: '#FF85A2',
        path: 'M 130 215 A 16 16 0 1 0 162 215 A 16 16 0 1 0 130 215 Z',
      },
      {
        id: 'cheeks_right',
        name: 'Right Blush Cheek',
        targetColor: '#FF85A2',
        path: 'M 238 215 A 16 16 0 1 0 270 215 A 16 16 0 1 0 238 215 Z',
      },
      {
        id: 'cat_collar',
        name: 'Kitty Collar',
        targetColor: '#FF5E7E',
        path: 'M 130 290 Q 200 310 270 290 L 268 310 Q 200 330 132 310 Z',
      },
      {
        id: 'collar_bell',
        name: 'Golden Bell',
        targetColor: '#FFE156',
        path: 'M 185 325 A 15 15 0 1 0 215 325 A 15 15 0 1 0 185 325 Z',
      },
      {
        id: 'cat_fish_toy',
        name: 'Little Fish Snack',
        targetColor: '#4D96FF',
        path: 'M 160 365 Q 200 350 220 365 Q 200 380 160 365 L 140 375 L 140 355 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl3',
    chapterId: 3,
    levelNumber: 3,
    title: 'Rainbow Cloud',
    category: 'nature',
    emoji: '🌈',
    characterPrompt: 'Plz paint rainbow! ☁️',
    palette: [
      '#FF477E', '#FF85A1', '#FFB703', '#52B788',
      '#48CAE4', '#7209B7', '#E0F2FE', '#F4A261',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'cloud_main',
        name: 'Fluffy Cloud',
        targetColor: '#E0F2FE',
        path: 'M 110 220 Q 70 220 70 180 Q 70 140 110 140 Q 130 100 180 100 Q 230 100 250 140 Q 290 140 290 180 Q 290 220 250 220 Z',
      },
      {
        id: 'cloud_blush_left',
        name: 'Left Cloud Blush',
        targetColor: '#FF85A1',
        path: 'M 110 185 A 12 12 0 1 0 134 185 A 12 12 0 1 0 110 185 Z',
      },
      {
        id: 'cloud_blush_right',
        name: 'Right Cloud Blush',
        targetColor: '#FF85A1',
        path: 'M 226 185 A 12 12 0 1 0 250 185 A 12 12 0 1 0 226 185 Z',
      },
      {
        id: 'rainbow_band_1',
        name: 'Rainbow Red Stripe',
        targetColor: '#FF477E',
        path: 'M 120 225 L 120 330 L 145 330 L 145 225 Z',
      },
      {
        id: 'rainbow_band_2',
        name: 'Rainbow Yellow Stripe',
        targetColor: '#FFB703',
        path: 'M 150 225 L 150 330 L 175 330 L 175 225 Z',
      },
      {
        id: 'rainbow_band_3',
        name: 'Rainbow Green Stripe',
        targetColor: '#52B788',
        path: 'M 180 225 L 180 330 L 205 330 L 205 225 Z',
      },
      {
        id: 'rainbow_band_4',
        name: 'Rainbow Cyan Stripe',
        targetColor: '#48CAE4',
        path: 'M 210 225 L 210 330 L 235 330 L 235 225 Z',
      },
      {
        id: 'rainbow_band_5',
        name: 'Rainbow Purple Stripe',
        targetColor: '#7209B7',
        path: 'M 240 225 L 240 330 L 265 330 L 265 225 Z',
      },
      {
        id: 'cloud_sun',
        name: 'Peeking Sun',
        targetColor: '#FFB703',
        path: 'M 250 110 A 35 35 0 1 0 310 70 A 35 35 0 0 0 250 110 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl4',
    chapterId: 3,
    levelNumber: 4,
    title: 'Glazed Donut',
    category: 'food',
    emoji: '🍩',
    characterPrompt: 'Sweet donut treat! 🍩',
    palette: [
      '#FF70A6', '#FFD670', '#70D6FF', '#E9FF70',
      '#FF9770', '#8338EC', '#FFFFFF', '#3A86FF',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'donut_dough',
        name: 'Donut Pastry Base',
        targetColor: '#FFD670',
        path: 'M 200 60 C 100 60 60 120 60 200 C 60 280 100 340 200 340 C 300 340 340 280 340 200 C 340 120 300 60 200 60 Z M 200 150 C 230 150 250 170 250 200 C 250 230 230 250 200 250 C 170 250 150 230 150 200 C 150 170 170 150 200 150 Z',
      },
      {
        id: 'donut_frosting',
        name: 'Pink Cream Glaze',
        targetColor: '#FF70A6',
        path: 'M 200 70 C 110 70 80 120 80 190 Q 100 220 120 190 Q 140 240 170 200 Q 200 240 230 190 Q 250 230 280 190 Q 300 220 320 190 C 320 120 290 70 200 70 Z M 200 160 C 220 160 235 175 235 200 C 235 225 220 240 200 240 C 180 240 165 225 165 200 C 165 175 180 160 200 160 Z',
      },
      {
        id: 'sprinkle_1',
        name: 'Sprinkle 1',
        targetColor: '#70D6FF',
        path: 'M 140 110 L 160 115 L 155 125 L 135 120 Z',
      },
      {
        id: 'sprinkle_2',
        name: 'Sprinkle 2',
        targetColor: '#E9FF70',
        path: 'M 220 95 L 240 90 L 245 100 L 225 105 Z',
      },
      {
        id: 'sprinkle_3',
        name: 'Sprinkle 3',
        targetColor: '#FF9770',
        path: 'M 270 130 L 290 145 L 282 153 L 262 138 Z',
      },
      {
        id: 'sprinkle_4',
        name: 'Sprinkle 4',
        targetColor: '#8338EC',
        path: 'M 110 150 L 125 165 L 118 172 L 103 157 Z',
      },
      {
        id: 'sprinkle_5',
        name: 'Sprinkle 5',
        targetColor: '#70D6FF',
        path: 'M 160 160 L 175 155 L 178 165 L 163 170 Z',
      },
      {
        id: 'sprinkle_6',
        name: 'Sprinkle 6',
        targetColor: '#FF9770',
        path: 'M 230 155 L 245 160 L 242 170 L 227 165 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl5',
    chapterId: 3,
    levelNumber: 5,
    title: 'Cosmic Rocket',
    category: 'vehicles',
    emoji: '🚀',
    characterPrompt: 'Blast off to stars! 🚀',
    palette: [
      '#EF233C', '#3A86FF', '#00F5D4', '#FFBE0B',
      '#FB5607', '#8338EC', '#E2E8F0', '#CED4DA',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'rocket_body',
        name: 'Rocket Hull',
        targetColor: '#E2E8F0',
        path: 'M 150 150 Q 200 60 200 60 Q 200 60 250 150 L 245 270 L 155 270 Z',
      },
      {
        id: 'rocket_nose',
        name: 'Nose Cone Tip',
        targetColor: '#EF233C',
        path: 'M 175 110 Q 200 60 200 60 Q 200 60 225 110 Z',
      },
      {
        id: 'rocket_fin_left',
        name: 'Left Thruster Fin',
        targetColor: '#3A86FF',
        path: 'M 155 220 L 110 270 L 150 280 Z',
      },
      {
        id: 'rocket_fin_right',
        name: 'Right Thruster Fin',
        targetColor: '#3A86FF',
        path: 'M 245 220 L 290 270 L 250 280 Z',
      },
      {
        id: 'window_rim',
        name: 'Porthole Frame',
        targetColor: '#CED4DA',
        path: 'M 170 170 A 30 30 0 1 0 230 170 A 30 30 0 1 0 170 170 Z',
      },
      {
        id: 'window_glass',
        name: 'Cosmic Glass',
        targetColor: '#00F5D4',
        path: 'M 180 170 A 20 20 0 1 0 220 170 A 20 20 0 1 0 180 170 Z',
      },
      {
        id: 'flame_outer',
        name: 'Exhaust Flame Outer',
        targetColor: '#FB5607',
        path: 'M 165 275 Q 200 370 200 370 Q 200 370 235 275 Z',
      },
      {
        id: 'flame_inner',
        name: 'Exhaust Flame Core',
        targetColor: '#FFBE0B',
        path: 'M 180 275 Q 200 330 200 330 Q 200 330 220 275 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl6',
    chapterId: 3,
    levelNumber: 6,
    title: 'Baby Dino',
    category: 'cute',
    emoji: '🦖',
    characterPrompt: 'Rawr! Color dino! 🦖',
    palette: [
      '#57CC99', '#38A3A5', '#80ED99', '#FF85A1',
      '#FFE156', '#FFFFFF', '#22577A', '#FF9F1C',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'dino_body',
        name: 'Dino Head & Body',
        targetColor: '#57CC99',
        path: 'M 130 180 Q 110 110 180 100 Q 250 90 260 160 Q 260 220 290 270 Q 310 290 320 280 Q 270 330 210 330 L 150 330 Q 110 320 120 250 Z',
      },
      {
        id: 'dino_belly',
        name: 'Tummy Belly Patch',
        targetColor: '#80ED99',
        path: 'M 180 200 Q 220 190 240 230 Q 240 280 210 310 L 170 310 Q 150 250 180 200 Z',
      },
      {
        id: 'dino_spike_1',
        name: 'Back Spine 1',
        targetColor: '#38A3A5',
        path: 'M 135 110 L 115 130 L 145 135 Z',
      },
      {
        id: 'dino_spike_2',
        name: 'Back Spine 2',
        targetColor: '#38A3A5',
        path: 'M 115 150 L 95 170 L 125 175 Z',
      },
      {
        id: 'dino_spike_3',
        name: 'Back Spine 3',
        targetColor: '#38A3A5',
        path: 'M 105 195 L 85 215 L 115 220 Z',
      },
      {
        id: 'dino_cheek',
        name: 'Rosy Cheek',
        targetColor: '#FF85A1',
        path: 'M 220 150 A 14 14 0 1 0 248 150 A 14 14 0 1 0 220 150 Z',
      },
      {
        id: 'dino_egg',
        name: 'Cracked Egg Shell',
        targetColor: '#FFE156',
        path: 'M 120 300 L 150 280 L 180 300 L 210 280 L 240 300 L 260 280 L 270 340 L 110 340 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl7',
    chapterId: 3,
    levelNumber: 7,
    title: 'Ice Cream Sundae',
    category: 'food',
    emoji: '🍨',
    characterPrompt: 'Yummy ice cream! 🍦',
    palette: [
      '#FF6B8B', '#4ECDC4', '#E76F51', '#DDA15E',
      '#BC6C25', '#606C38', '#6A040F', '#FFFFFF',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'waffle_cone',
        name: 'Crisp Waffle Cone',
        targetColor: '#DDA15E',
        path: 'M 130 220 L 200 370 L 270 220 Z',
      },
      {
        id: 'cone_cross_1',
        name: 'Waffle Pattern',
        targetColor: '#BC6C25',
        path: 'M 150 250 L 250 250 L 240 265 L 160 265 Z',
      },
      {
        id: 'cone_cross_2',
        name: 'Waffle Grid 2',
        targetColor: '#BC6C25',
        path: 'M 170 290 L 230 290 L 220 305 L 180 305 Z',
      },
      {
        id: 'ice_cream_bottom',
        name: 'Mint Scoop Base',
        targetColor: '#4ECDC4',
        path: 'M 120 220 Q 120 150 200 150 Q 280 150 280 220 Q 250 240 220 220 Q 190 240 160 220 Q 140 240 120 220 Z',
      },
      {
        id: 'ice_cream_top',
        name: 'Strawberry Scoop Top',
        targetColor: '#FF6B8B',
        path: 'M 140 160 Q 140 90 200 90 Q 260 90 260 160 Q 230 180 200 160 Q 170 180 140 160 Z',
      },
      {
        id: 'cherry_fruit',
        name: 'Glossy Cherry',
        targetColor: '#E76F51',
        path: 'M 185 85 A 18 18 0 1 0 221 85 A 18 18 0 1 0 185 85 Z',
      },
      {
        id: 'cherry_stem',
        name: 'Cherry Twig',
        targetColor: '#606C38',
        path: 'M 200 70 Q 220 40 240 35 L 245 42 Q 225 47 205 72 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl8',
    chapterId: 3,
    levelNumber: 8,
    title: 'Sunny Flower Pot',
    category: 'nature',
    emoji: '🌻',
    characterPrompt: 'Color my petals! 🌸',
    palette: [
      '#F77F00', '#FCBF49', '#EAE2B7', '#2A9D8F',
      '#E76F51', '#9B5DE5', '#F15BB5', '#00BBF9',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'clay_pot_body',
        name: 'Terracotta Pot',
        targetColor: '#F77F00',
        path: 'M 135 250 L 155 350 L 245 350 L 265 250 Z',
      },
      {
        id: 'clay_pot_rim',
        name: 'Pot Collar Rim',
        targetColor: '#E76F51',
        path: 'M 120 225 L 120 255 L 280 255 L 280 225 Z',
      },
      {
        id: 'flower_stem',
        name: 'Green Stem',
        targetColor: '#2A9D8F',
        path: 'M 194 150 L 194 225 L 206 225 L 206 150 Z',
      },
      {
        id: 'leaf_left',
        name: 'Left Leaf',
        targetColor: '#2A9D8F',
        path: 'M 194 190 Q 140 180 145 210 Q 175 220 194 200 Z',
      },
      {
        id: 'leaf_right',
        name: 'Right Leaf',
        targetColor: '#2A9D8F',
        path: 'M 206 180 Q 260 170 255 200 Q 225 210 206 190 Z',
      },
      {
        id: 'flower_petal_top',
        name: 'Top Petals',
        targetColor: '#FCBF49',
        path: 'M 200 40 Q 160 80 175 110 Q 225 110 240 80 Z',
      },
      {
        id: 'flower_petal_left',
        name: 'Left Petals',
        targetColor: '#FCBF49',
        path: 'M 130 110 Q 170 80 180 120 Q 170 160 130 130 Z',
      },
      {
        id: 'flower_petal_right',
        name: 'Right Petals',
        targetColor: '#FCBF49',
        path: 'M 270 110 Q 230 80 220 120 Q 230 160 270 130 Z',
      },
      {
        id: 'flower_center',
        name: 'Smiley Flower Face',
        targetColor: '#EAE2B7',
        path: 'M 170 120 A 30 30 0 1 0 230 120 A 30 30 0 1 0 170 120 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl9',
    chapterId: 3,
    levelNumber: 9,
    title: 'Cute Beetle Car',
    category: 'vehicles',
    emoji: '🚗',
    characterPrompt: 'Vroom! Color me! 🚙',
    palette: [
      '#00B4D8', '#90E0EF', '#FFD166', '#333333',
      '#E0E1DD', '#EF476F', '#FFFFFF', '#06D6A0',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'car_roof',
        name: 'Car Roof Dome',
        targetColor: '#00B4D8',
        path: 'M 120 190 Q 160 110 240 110 Q 280 130 310 190 Z',
      },
      {
        id: 'car_windshield',
        name: 'Window Glass',
        targetColor: '#90E0EF',
        path: 'M 140 185 Q 175 125 235 125 Q 265 140 285 185 Z',
      },
      {
        id: 'car_chassis',
        name: 'Lower Car Body',
        targetColor: '#00B4D8',
        path: 'M 60 240 Q 60 190 120 190 L 310 190 Q 360 210 360 250 L 330 260 Q 330 220 290 220 Q 250 220 250 260 L 170 260 Q 170 220 130 220 Q 90 220 90 260 L 60 250 Z',
      },
      {
        id: 'tire_left',
        name: 'Front Tire',
        targetColor: '#333333',
        path: 'M 95 260 A 28 28 0 1 0 151 260 A 28 28 0 1 0 95 260 Z',
      },
      {
        id: 'hubcap_left',
        name: 'Front Hubcap',
        targetColor: '#E0E1DD',
        path: 'M 110 260 A 13 13 0 1 0 136 260 A 13 13 0 1 0 110 260 Z',
      },
      {
        id: 'tire_right',
        name: 'Rear Tire',
        targetColor: '#333333',
        path: 'M 255 260 A 28 28 0 1 0 311 260 A 28 28 0 1 0 255 260 Z',
      },
      {
        id: 'hubcap_right',
        name: 'Rear Hubcap',
        targetColor: '#E0E1DD',
        path: 'M 270 260 A 13 13 0 1 0 296 260 A 13 13 0 1 0 270 260 Z',
      },
      {
        id: 'headlight',
        name: 'Beetle Headlight',
        targetColor: '#FFD166',
        path: 'M 60 210 Q 75 210 75 225 Q 75 240 60 240 Z',
      },
    ],
  },

  {
    id: 'ch3_lvl10',
    chapterId: 3,
    levelNumber: 10,
    title: 'Mushroom House',
    category: 'cute',
    emoji: '🍄',
    characterPrompt: 'Fairy cottage home! 🧚',
    palette: [
      '#E63946', '#F1FAEE', '#F4A261', '#E9D8A6',
      '#52B788', '#457B9D', '#FFE156', '#6C757D',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'mushroom_cap',
        name: 'Crimson Mushroom Cap',
        targetColor: '#E63946',
        path: 'M 70 190 Q 70 60 200 60 Q 330 60 330 190 Q 200 215 70 190 Z',
      },
      {
        id: 'cap_spot_center',
        name: 'Center Polka Dot',
        targetColor: '#F1FAEE',
        path: 'M 180 120 A 22 22 0 1 0 224 120 A 22 22 0 1 0 180 120 Z',
      },
      {
        id: 'cap_spot_left',
        name: 'Left Polka Dot',
        targetColor: '#F1FAEE',
        path: 'M 105 140 A 16 16 0 1 0 137 140 A 16 16 0 1 0 105 140 Z',
      },
      {
        id: 'cap_spot_right',
        name: 'Right Polka Dot',
        targetColor: '#F1FAEE',
        path: 'M 265 140 A 16 16 0 1 0 297 140 A 16 16 0 1 0 265 140 Z',
      },
      {
        id: 'house_stem',
        name: 'Mushroom Cottage Wall',
        targetColor: '#E9D8A6',
        path: 'M 130 195 L 140 330 L 260 330 L 270 195 Z',
      },
      {
        id: 'arched_door',
        name: 'Cozy Cottage Door',
        targetColor: '#F4A261',
        path: 'M 180 330 L 180 270 Q 200 250 220 270 L 220 330 Z',
      },
      {
        id: 'round_window',
        name: 'Glowing Window',
        targetColor: '#FFE156',
        path: 'M 145 240 A 14 14 0 1 0 173 240 A 14 14 0 1 0 145 240 Z',
      },
      {
        id: 'grass_hill',
        name: 'Meadow Grass',
        targetColor: '#52B788',
        path: 'M 80 330 Q 200 310 320 330 L 330 365 L 70 365 Z',
      },
    ],
  },

  // BONUS DAILY
  {
    id: 'daily_level',
    chapterId: 3,
    levelNumber: 11,
    title: 'Daily: Sunflower & Bee',
    category: 'daily',
    emoji: '🐝',
    characterPrompt: 'Daily Challenge! 🌻🐝',
    palette: [
      '#FFB703', '#FB8500', '#219EBC', '#023047',
      '#55A630', '#FFD166', '#FFFFFF', '#E63946',
    ],
    viewBox: '0 0 400 400',
    regions: [
      {
        id: 'sunflower_center',
        name: 'Sunflower Seed Core',
        targetColor: '#FB8500',
        path: 'M 155 220 A 45 45 0 1 0 245 220 A 45 45 0 1 0 155 220 Z',
      },
      {
        id: 'sunflower_petals_outer',
        name: 'Golden Blossom Ring',
        targetColor: '#FFB703',
        path: 'M 200 135 L 215 170 L 250 160 L 245 195 L 285 205 L 265 235 L 290 260 L 255 275 L 255 310 L 225 305 L 200 335 L 175 305 L 145 310 L 145 275 L 110 260 L 135 235 L 115 205 L 155 195 L 150 160 L 185 170 Z',
      },
      {
        id: 'sunflower_stem',
        name: 'Thick Green Stem',
        targetColor: '#55A630',
        path: 'M 190 320 L 190 380 L 210 380 L 210 320 Z',
      },
      {
        id: 'bee_body_yellow',
        name: 'Fuzzy Bee Body',
        targetColor: '#FFD166',
        path: 'M 150 90 Q 200 60 230 90 Q 230 130 180 135 Q 140 120 150 90 Z',
      },
      {
        id: 'bee_stripe',
        name: 'Bee Black Stripe',
        targetColor: '#023047',
        path: 'M 180 75 L 195 72 L 190 135 L 175 133 Z',
      },
      {
        id: 'bee_wing_left',
        name: 'Left Translucent Wing',
        targetColor: '#219EBC',
        path: 'M 175 75 Q 140 35 170 30 Q 190 40 185 75 Z',
      },
      {
        id: 'bee_wing_right',
        name: 'Right Translucent Wing',
        targetColor: '#219EBC',
        path: 'M 195 75 Q 185 25 215 25 Q 235 45 205 75 Z',
      },
    ],
  },
];
