import type { BoardSize, ThemeName } from '../types/types';
import { Card } from './card';

const THEME_EMOJIS: Record<ThemeName, string[]> = {
  coding:     ['c-1', 'c-2', 'c-3', 'c-4', 'c-5', 'c-6', 'c-7', 'c-8', 'c-9', 'c-10', 'c-11', 'c-12', 'c-13', 'c-14', 'c-15', 'c-16', 'c-17', 'c-18'],
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

  /** Creates a board of the given size and theme, immediately generating a shuffled deck of pairs. */
  constructor(size: BoardSize, theme: ThemeName) {
    this.size = size;
    this.theme = theme;
    this.generateCards();
  }

  /** Populates this.cards with a shuffled deck of pairs for the active theme. */
  private generateCards(): void {
    const pairCount = this.size / 2;
    const available = THEME_EMOJIS[this.theme];
    if (available.length < pairCount) {
      throw new Error(`Theme "${this.theme}" has only ${available.length} emojis but needs ${pairCount}`);
    }
    const cards: Card[] = [];
    available.slice(0, pairCount).forEach((icon, i) => {
      cards.push(...this.createPair(cards.length, i, icon));
    });
    this.cards = this.shuffle(cards);
  }

  /** Creates the two Card instances that share a pairId and icon. */
  private createPair(startId: number, pairId: number, icon: string): [Card, Card] {
    return [new Card(startId, pairId, icon), new Card(startId + 1, pairId, icon)];
  }

  /** Returns a new array with the cards in random order (Fisher-Yates). */
  private shuffle(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
