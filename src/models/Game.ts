import type { GameConfig, GameResult } from '../types/types';
import { Board } from './Board';
import { Player } from './Player';

export class Game {
  readonly board: Board;
  readonly players: [Player, Player];
  private currentPlayerIndex: number = 0;

  constructor(config: GameConfig) {
    this.board = new Board(config.boardSize, config.theme);
    this.players = [new Player('blue'), new Player('orange')];
    this.currentPlayerIndex = config.startingPlayer === 'blue' ? 0 : 1;
  }

  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  get isOver(): boolean {
    return this.board.cards.every(card => card.isMatched);
  }

  switchPlayer(): void {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  getResult(): GameResult | null {
    if (!this.isOver) return null;

    const [blue, orange] = this.players;
    const isDraw = blue.score === orange.score;
    let winner = null;
    if (!isDraw) {
      winner = blue.score > orange.score ? blue.color : orange.color;
    }

    return {
      blueScore: blue.score,
      orangeScore: orange.score,
      winner,
      isDraw,
    };
  }
}
