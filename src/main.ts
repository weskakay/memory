import './scss/main.scss';
import { renderHome } from './views/home-view';
import { renderSettings } from './views/settings-view';
import { renderGame } from './views/game-view';
import { renderGameOver } from './views/game-over-view';
import { renderWinner } from './views/winner-view';
import type { GameConfig, ThemeName, PlayerColor } from './types/types';

const WINNER_DELAY_MS = 3000;

const assetBase = import.meta.env.BASE_URL;
const rootElement = document.documentElement;
rootElement.style.setProperty('--asset-back-icon', `url(${assetBase}back-icon.png)`);
rootElement.style.setProperty('--asset-gaming-dice', `url(${assetBase}gaming-dice.png)`);
rootElement.style.setProperty('--asset-foods-wrap', `url(${assetBase}foods-wrap.png)`);

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
