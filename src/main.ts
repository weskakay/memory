import './scss/main.scss';
import { renderHome } from './views/HomeView';
import { renderSettings } from './views/SettingsView';
import type { GameConfig } from './types/types';

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

function showGame(_config: GameConfig): void {
  appContainer.innerHTML = '<div style="min-height:100vh;background:#303131;"></div>';
}

showHome();
