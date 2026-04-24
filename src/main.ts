import './scss/main.scss';
import { renderHome } from './views/home-view';
import { renderSettings } from './views/settings-view';
import { renderGame } from './views/game-view';
import { renderGameOver } from './views/game-over-view';
import { renderWinner } from './views/winner-view';
import type { GameConfig, ThemeName, GameOutcome } from './types/types';

const WINNER_DELAY_MS = 3000;

const assetBase = import.meta.env.BASE_URL;
const rootElement = document.documentElement;
rootElement.style.setProperty('--asset-back-icon', `url(${assetBase}back-icon.png)`);
rootElement.style.setProperty('--asset-gaming-dice', `url(${assetBase}gaming-dice.png)`);
rootElement.style.setProperty('--asset-foods-wrap', `url(${assetBase}foods-wrap.png)`);

const app = document.getElementById('app') as HTMLElement;
if (!app) throw new Error('App container #app not found');

/** Shows the Home screen. Wires the Play button to open the Settings screen. */
function showHome(): void {
  renderHome(app, () => showSettings());
}

/** Shows the Settings screen. Starts the game with the chosen config on Start. */
function showSettings(): void {
  renderSettings(app, (config: GameConfig) => showGame(config));
}

/**
 * Shows the Game screen for the given config. The Exit button returns to Settings;
 * when the board is completed, `showEndSequence` runs with the final outcome.
 */
function showGame(config: GameConfig): void {
  renderGame(
    app,
    config,
    () => showSettings(),
    (outcome, scores) => showEndSequence(config.theme, outcome, scores)
  );
}

/**
 * Runs the end-of-game transition: shows Game-Over without a restart button,
 * then swaps to the Winner screen after `WINNER_DELAY_MS`.
 */
function showEndSequence(
  theme: ThemeName,
  outcome: GameOutcome,
  scores: { blue: number; orange: number }
): void {
  renderGameOver(app, theme, scores, null);
  setTimeout(() => showWinner(theme, outcome), WINNER_DELAY_MS);
}

/** Shows the Winner screen with confetti; the action button returns to Home. */
function showWinner(theme: ThemeName, outcome: GameOutcome): void {
  renderWinner(app, theme, outcome, () => showHome());
}

showHome();
