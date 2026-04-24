import type { PlayerColor } from '../types/types';

/**
 * A player in the memory game. Identified by colour, tracks their match score.
 */
export class Player {
  readonly name: string;
  readonly color: PlayerColor;
  score: number = 0;

  /** Creates a player identified by the given colour; the display name follows from the colour. */
  constructor(color: PlayerColor) {
    this.color = color;
    this.name = color === 'blue' ? 'Blue' : 'Orange';
  }

  /** Increase the player's score by one point. */
  addPoint(): void {
    this.score++;
  }
}
