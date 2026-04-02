import './scss/main.scss';
import { renderHome } from './views/HomeView';

const app = document.getElementById('app');
if (!app) throw new Error('App container #app not found');

const appContainer: HTMLElement = app;

function showHome(): void {
  renderHome(appContainer, () => {
    showSettings();
  });
}

function showSettings(): void {
  appContainer.innerHTML = '<h1 style="color: white; padding: 2rem;">Settings — coming in Commit 5</h1>';
}

showHome();
