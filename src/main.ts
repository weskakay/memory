import './scss/main.scss';
import { renderHome } from './views/HomeView';
import { renderSettings } from './views/SettingsView';
import { renderGame } from './views/GameView';
import { renderGameOver } from './views/GameOverView';
import type { GameConfig, ThemeName } from './types/types';

const app = document.getElementById('app');
if (!app) throw new Error('App container #app not found');

const appContainer: HTMLElement = app;

function showHome(): void {
  renderHome(appContainer, () => {
    showSettings();
  });
}

function showSettings(): void {
  renderSettings(appContainer, (config: GameConfig) => {
    showGame(config);
  });
}

function showGame(config: GameConfig): void {
  renderGame(
    appContainer,
    config,
    () => showSettings(),
    (scores) => showGameOver(config.theme, scores),
    (_winner, scores) => showGameOver(config.theme, scores)
  );
}

function showGameOver(
  theme: ThemeName,
  scores: { blue: number; orange: number }
): void {
  renderGameOver(appContainer, theme, scores, () => showHome());
}

showHome();
