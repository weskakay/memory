export class Card {
  readonly id: number;
  readonly pairId: number;
  readonly emoji: string;
  isFlipped: boolean = false;
  isMatched: boolean = false;

  constructor(id: number, pairId: number, emoji: string) {
    this.id = id;
    this.pairId = pairId;
    this.emoji = emoji;
  }

  flip(): void {
    if (!this.isMatched) {
      this.isFlipped = true;
    }
  }

  unflip(): void {
    if (!this.isMatched) {
      this.isFlipped = false;
    }
  }

  match(): void {
    this.isMatched = true;
    this.isFlipped = true;
  }
}
