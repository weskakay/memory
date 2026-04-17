import type { BoardSize, ThemeName } from '../types/types';
import { Card } from './card';

const THEME_EMOJIS: Record<ThemeName, string[]> = {
  coding:     ['angular', 'typescript', 'javascript', 'html', 'vscode', 'css', 'django', 'npm', 'terminal', 'python', 'github', 'nodejs', 'bootstrap', 'vue', 'react', 'sass', 'database', 'firebase'],
  gaming:     ['game-1', 'game-2', 'game-3', 'game-4', 'game-5', 'game-6', 'game-7', 'game-8', 'game-9', 'game-10', 'game-11', 'game-12', 'game-13', 'game-14', 'game-15', 'game-16', 'game-17', 'game-18'],
  daprojects: ['da-1', 'da-2', 'da-3', 'da-4', 'da-5', 'da-6', 'da-7', 'da-8', 'da-9', 'da-10', 'da-11', 'da-12', 'da-13', 'da-14', 'da-15', 'da-16', 'da-17', 'da-18'],
  foods:      ['food-1', 'food-2', 'food-3', 'food-4', 'food-5', 'food-6', 'food-7', 'food-8', 'food-9', 'food-10', 'food-11', 'food-12', 'food-13', 'food-14', 'food-15', 'food-16', 'food-17', 'food-18'],
};

/**
 * The memory game board. Generates a shuffled card deck for the given size and theme.
 */
export class Board {
  readonly size: BoardSize;
  readonly theme: ThemeName;
  cards: Card[] = [];

  constructor(size: BoardSize, theme: ThemeName) {
    this.size = size;
    this.theme = theme;
    this.generateCards();
  }

  private generateCards(): void {
    const pairCount = this.size / 2;
    const available = THEME_EMOJIS[this.theme];
    if (available.length < pairCount) {
      throw new Error(`Theme "${this.theme}" has only ${available.length} emojis but needs ${pairCount}`);
    }
    const emojis = available.slice(0, pairCount);
    const cards: Card[] = [];
    let id = 0;

    for (let i = 0; i < emojis.length; i++) {
      cards.push(new Card(id++, i, emojis[i]));
      cards.push(new Card(id++, i, emojis[i]));
    }

    this.cards = this.shuffle(cards);
  }

  private shuffle(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
