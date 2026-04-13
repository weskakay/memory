import type { BoardSize, ThemeName } from '../types/types';
import { Card } from './Card';

const THEME_EMOJIS: Record<ThemeName, string[]> = {
  coding: ['angular', 'typescript', 'javascript', 'html', 'vscode', 'css', 'django', 'npm', 'terminal', 'python', 'github', 'nodejs', 'bootstrap', 'vue', 'react', 'sass', 'database', 'firebase'],
  gaming: ['🎮', '🕹️', '🎲', '🏆', '⚔️', '🛡️', '🎯', '🏹', '💣', '👾', '🎪', '🃏', '♟️', '🎰', '🎳', '🏅', '🎖️', '🎭'],
  daprojects: ['📋', '🗂️', '📌', '🎨', '🧩', '📐', '✏️', '📝', '🔍', '🗃️', '📎', '🖇️', '📑', '🏗️', '🧱', '🔩', '⚙️', '🛞'],
  foods: ['🍕', '🍔', '🌮', '🍣', '🧁', '🍩', '🥗', '🍜', '🥐', '🍿', '🧀', '🍇', '🥑', '🌽', '🍪', '🎂', '🥝', '🍫'],
};

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
