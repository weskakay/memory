import type { PlayerColor } from '../types/types';

/**
 * A player in the memory game. Identified by colour, tracks their match score.
 */
export class Player {
  readonly name: string;
  readonly color: PlayerColor;
  score: number = 0;

  constructor(color: PlayerColor) {
    this.color = color;
    this.name = color === 'blue' ? 'Blue' : 'Orange';
  }

  addPoint(): void {
    this.score++;
  }
}
