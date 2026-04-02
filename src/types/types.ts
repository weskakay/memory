export type ThemeName = 'coding' | 'gaming' | 'daprojects' | 'foods';

export type BoardSize = 16 | 24 | 36;

export type PlayerColor = 'blue' | 'orange';

export interface GameConfig {
  theme: ThemeName;
  boardSize: BoardSize;
  startingPlayer: PlayerColor;
}

export interface GameResult {
  blueScore: number;
  orangeScore: number;
  winner: PlayerColor | null;
  isDraw: boolean;
}
