import './scss/main.scss';
import { renderHome } from './views/HomeView';
import { renderSettings } from './views/SettingsView';
import { renderGame } from './views/GameView';
import { renderGameOver } from './views/GameOverView';
import { renderWinner } from './views/WinnerView';
import type { GameConfig, ThemeName, PlayerColor } from './types/types';

const WINNER_DELAY_MS = 3000;

const app = document.getElementById('app') as HTMLElement;
if (!app) throw new Error('App container #app not found');

function showHome(): void {
  renderHome(app, () => {
    showSettings();
  });
}

function showSettings(): void {
  renderSettings(app, (config: GameConfig) => {
    showGame(config);
  });
}

function showGame(config: GameConfig): void {
  renderGame(
    app,
    config,
    () => showSettings(),
    (scores) => showGameOver(config.theme, scores),
    (winner, scores) => showGameOverThenWinner(config.theme, scores, winner)
  );
}

function showGameOver(
  theme: ThemeName,
  scores: { blue: number; orange: number }
): void {
  renderGameOver(app, theme, scores, () => showHome());
}

function showGameOverThenWinner(
  theme: ThemeName,
  scores: { blue: number; orange: number },
  winner: PlayerColor
): void {
  renderGameOver(app, theme, scores, null);

  setTimeout(() => {
    showWinner(theme, winner);
  }, WINNER_DELAY_MS);
}

function showWinner(theme: ThemeName, winner: PlayerColor): void {
  renderWinner(app, theme, winner, () => showHome());
}

showHome();
