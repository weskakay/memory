import type { GameConfig, GameOutcome, GameResult } from '../types/types';
import { Board } from './board';
import { Player } from './player';

/**
 * Represents a full memory game session: board, players, and turn state.
 */
export class Game {
  readonly board: Board;
  readonly players: [Player, Player];
  private currentPlayerIndex: number = 0;

  constructor(config: GameConfig) {
    this.board = new Board(config.boardSize, config.theme);
    this.players = [new Player('blue'), new Player('orange')];
    this.currentPlayerIndex = config.startingPlayer === 'blue' ? 0 : 1;
  }

  /** Returns the player whose turn it currently is. */
  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  /** True once every card on the board is matched. */
  get isOver(): boolean {
    return this.board.cards.every(card => card.isMatched);
  }

  /** Hand the turn over to the other player. */
  switchPlayer(): void {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  /** Returns the final scores and outcome once every card is matched, or null if the game is still in progress. */
  getResult(): GameResult | null {
    if (!this.isOver) return null;
    const [blue, orange] = this.players;
    return {
      blueScore: blue.score,
      orangeScore: orange.score,
      winner: this.determineWinner(blue.score, orange.score),
    };
  }

  private determineWinner(blue: number, orange: number): GameOutcome {
    if (blue > orange) return 'blue';
    if (orange > blue) return 'orange';
    return 'draw';
  }
}
