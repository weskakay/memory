/** Available visual themes. */
export type ThemeName = 'coding' | 'gaming' | 'daprojects' | 'foods';

/** Total number of cards on the board (always a multiple of 2). */
export type BoardSize = 16 | 24 | 36;

/** Identifies a player by their colour. */
export type PlayerColor = 'blue' | 'orange';

/** End-of-game outcome: winning player color or 'draw' when scores are tied. */
export type GameOutcome = 'blue' | 'orange' | 'draw';

/** User-selected configuration passed from the settings screen to a new game. */
export interface GameConfig {
  /** Visual theme applied to cards, background and buttons. */
  theme: ThemeName;
  /** Total number of cards on the board. */
  boardSize: BoardSize;
  /** Which player takes the first turn. */
  startingPlayer: PlayerColor;
}

/** Final score summary once every pair has been matched. */
export interface GameResult {
  /** Pairs matched by the blue player. */
  blueScore: number;
  /** Pairs matched by the orange player. */
  orangeScore: number;
  /** Winning colour or 'draw' when scores are tied. */
  winner: GameOutcome;
}
