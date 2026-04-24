/**
 * A single memory card. Cards with the same pairId form a matching pair.
 */
export class Card {
  readonly id: number;
  readonly pairId: number;
  readonly emoji: string;
  isFlipped: boolean = false;
  isMatched: boolean = false;

  /** Creates a card with a unique id, a pairId shared with its matching partner, and an icon key. */
  constructor(id: number, pairId: number, emoji: string) {
    this.id = id;
    this.pairId = pairId;
    this.emoji = emoji;
  }

  /** Flip the card face-up. No-op if the card is already matched. */
  flip(): void {
    if (!this.isMatched) {
      this.isFlipped = true;
    }
  }

  /** Flip the card face-down. No-op if the card is already matched. */
  unflip(): void {
    if (!this.isMatched) {
      this.isFlipped = false;
    }
  }

  /** Mark the card as permanently matched and face-up. */
  match(): void {
    this.isMatched = true;
    this.isFlipped = true;
  }
}
