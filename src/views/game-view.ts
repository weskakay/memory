import type { GameConfig, ThemeName, PlayerColor, GameOutcome } from '../types/types';
import { Game } from '../models/game';
import { GameService } from '../services/game-service';
import { showExitPopup } from './popup-view';
import { CODING_ICONS, GAMING_ICONS, DAPROJECTS_ICONS, FOODS_ICONS } from '../services/card-icons';

const THEME_ICONS: Record<ThemeName, Record<string, string>> = {
  coding:     CODING_ICONS,
  gaming:     GAMING_ICONS,
  daprojects: DAPROJECTS_ICONS,
  foods:      FOODS_ICONS,
};

const SCORE_ICON_CODING = `
  <svg viewBox="0 0 24 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.46154 20C1.78462 20 1.20513 19.7552 0.723077 19.2656C0.241026 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.241026 1.22396 0.723077 0.734375C1.20513 0.244792 1.78462 0 2.46154 0H16C16.3897 0 16.759 0.0885417 17.1077 0.265625C17.4564 0.442708 17.7436 0.6875 17.9692 1L23.5077 8.5C23.8359 8.9375 24 9.4375 24 10C24 10.5625 23.8359 11.0625 23.5077 11.5L17.9692 19C17.7436 19.3125 17.4564 19.5573 17.1077 19.7344C16.759 19.9115 16.3897 20 16 20H2.46154Z"/>
  </svg>
`;

const SCORE_ICON_GAMING = `
  <svg viewBox="0 0 22 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.75 28C1.99375 28 1.34635 27.7258 0.807813 27.1775C0.269271 26.6292 0 25.97 0 25.2V22.435C0 21.9683 0.103125 21.5367 0.309375 21.14C0.515625 20.7433 0.790625 20.405 1.13437 20.125C2.71563 18.8183 3.90156 17.5 4.69219 16.17C5.48281 14.84 6.03854 13.65 6.35938 12.6H4.125C3.73542 12.6 3.40885 12.4658 3.14531 12.1975C2.88177 11.9292 2.75 11.5967 2.75 11.2C2.75 10.8033 2.88177 10.4708 3.14531 10.2025C3.40885 9.93417 3.73542 9.8 4.125 9.8H5.84375C5.52292 9.28667 5.27083 8.73833 5.0875 8.155C4.90417 7.57167 4.8125 6.95333 4.8125 6.3C4.8125 4.55 5.41406 3.0625 6.61719 1.8375C7.82031 0.6125 9.28125 0 11 0C12.7188 0 14.1797 0.6125 15.3828 1.8375C16.5859 3.0625 17.1875 4.55 17.1875 6.3C17.1875 6.95333 17.0958 7.57167 16.9125 8.155C16.7292 8.73833 16.4771 9.28667 16.1562 9.8H17.875C18.2646 9.8 18.5911 9.93417 18.8547 10.2025C19.1182 10.4708 19.25 10.8033 19.25 11.2C19.25 11.5967 19.1182 11.9292 18.8547 12.1975C18.5911 12.4658 18.2646 12.6 17.875 12.6H15.6406C15.9615 13.65 16.5172 14.84 17.3078 16.17C18.0984 17.5 19.2844 18.8183 20.8656 20.125C21.2094 20.405 21.4844 20.7433 21.6906 21.14C21.8969 21.5367 22 21.9683 22 22.435V25.2C22 25.97 21.7307 26.6292 21.1922 27.1775C20.6536 27.7258 20.0063 28 19.25 28H2.75ZM2.75 25.2H19.25V22.4C17.1417 20.72 15.6177 18.9875 14.6781 17.2025C13.7385 15.4175 13.1083 13.8833 12.7875 12.6H9.2125C8.89167 13.8833 8.26146 15.4175 7.32188 17.2025C6.38229 18.9875 4.85833 20.72 2.75 22.4V25.2ZM11 9.8C11.9625 9.8 12.776 9.46167 13.4406 8.785C14.1052 8.10833 14.4375 7.28 14.4375 6.3C14.4375 5.32 14.1052 4.49167 13.4406 3.815C12.776 3.13833 11.9625 2.8 11 2.8C10.0375 2.8 9.22396 3.13833 8.55937 3.815C7.89479 4.49167 7.5625 5.32 7.5625 6.3C7.5625 7.28 7.89479 8.10833 8.55937 8.785C9.22396 9.46167 10.0375 9.8 11 9.8Z"/>
  </svg>
`;

const SCORE_ICON_PAWN_SMALL = `
  <svg viewBox="0 0 20 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.5 25C1.8125 25 1.22396 24.7552 0.734375 24.2656C0.244792 23.776 0 23.1875 0 22.5V20.0312C0 19.6146 0.09375 19.2292 0.28125 18.875C0.46875 18.5208 0.71875 18.2188 1.03125 17.9688C2.46875 16.8021 3.54688 15.625 4.26562 14.4375C4.98438 13.25 5.48958 12.1875 5.78125 11.25H3.75C3.39583 11.25 3.09896 11.1302 2.85938 10.8906C2.61979 10.651 2.5 10.3542 2.5 10C2.5 9.64583 2.61979 9.34896 2.85938 9.10938C3.09896 8.86979 3.39583 8.75 3.75 8.75H5.3125C5.02083 8.29167 4.79167 7.80208 4.625 7.28125C4.45833 6.76042 4.375 6.20833 4.375 5.625C4.375 4.0625 4.92188 2.73438 6.01562 1.64062C7.10938 0.546875 8.4375 0 10 0C11.5625 0 12.8906 0.546875 13.9844 1.64062C15.0781 2.73438 15.625 4.0625 15.625 5.625C15.625 6.20833 15.5417 6.76042 15.375 7.28125C15.2083 7.80208 14.9792 8.29167 14.6875 8.75H16.25C16.6042 8.75 16.901 8.86979 17.1406 9.10938C17.3802 9.34896 17.5 9.64583 17.5 10C17.5 10.3542 17.3802 10.651 17.1406 10.8906C16.901 11.1302 16.6042 11.25 16.25 11.25H14.2188C14.5104 12.1875 15.0156 13.25 15.7344 14.4375C16.4531 15.625 17.5312 16.8021 18.9688 17.9688C19.2812 18.2188 19.5312 18.5208 19.7188 18.875C19.9062 19.2292 20 19.6146 20 20.0312V22.5C20 23.1875 19.7552 23.776 19.2656 24.2656C18.776 24.7552 18.1875 25 17.5 25H2.5ZM2.5 22.5H17.5V20C15.5833 18.5 14.1979 16.9531 13.3438 15.3594C12.4896 13.7656 11.9167 12.3958 11.625 11.25H8.375C8.08333 12.3958 7.51042 13.7656 6.65625 15.3594C5.80208 16.9531 4.41667 18.5 2.5 20V22.5ZM10 8.75C10.875 8.75 11.6146 8.44792 12.2188 7.84375C12.8229 7.23958 13.125 6.5 13.125 5.625C13.125 4.75 12.8229 4.01042 12.2188 3.40625C11.6146 2.80208 10.875 2.5 10 2.5C9.125 2.5 8.38542 2.80208 7.78125 3.40625C7.17708 4.01042 6.875 4.75 6.875 5.625C6.875 6.5 7.17708 7.23958 7.78125 7.84375C8.38542 8.44792 9.125 8.75 10 8.75Z"/>
  </svg>
`;

const SCORE_ICONS: Record<ThemeName, string> = {
  coding: SCORE_ICON_CODING,
  gaming: SCORE_ICON_GAMING,
  daprojects: SCORE_ICON_PAWN_SMALL,
  foods: SCORE_ICON_PAWN_SMALL,
};

const CURRENT_ICON_CODING = `
  <svg viewBox="0 0 29 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.97436 24C2.15641 24 1.4562 23.7063 0.873718 23.1188C0.291239 22.5312 0 21.825 0 21V3C0 2.175 0.291239 1.46875 0.873718 0.88125C1.4562 0.29375 2.15641 0 2.97436 0H19.3333C19.8043 0 20.2504 0.10625 20.6718 0.31875C21.0932 0.53125 21.4402 0.825 21.7128 1.2L28.4051 10.2C28.8017 10.725 29 11.325 29 12C29 12.675 28.8017 13.275 28.4051 13.8L21.7128 22.8C21.4402 23.175 21.0932 23.4688 20.6718 23.6813C20.2504 23.8938 19.8043 24 19.3333 24H2.97436Z"/>
  </svg>
`;

const CURRENT_ICON_PAWN_WHITE = `
  <svg viewBox="0 0 25 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3.125 32C2.26562 32 1.52995 31.6867 0.917969 31.06C0.30599 30.4333 0 29.68 0 28.8V25.64C0 25.1067 0.117188 24.6133 0.351562 24.16C0.585938 23.7067 0.898438 23.32 1.28906 23C3.08594 21.5067 4.43359 20 5.33203 18.48C6.23047 16.96 6.86198 15.6 7.22656 14.4H4.6875C4.24479 14.4 3.8737 14.2467 3.57422 13.94C3.27474 13.6333 3.125 13.2533 3.125 12.8C3.125 12.3467 3.27474 11.9667 3.57422 11.66C3.8737 11.3533 4.24479 11.2 4.6875 11.2H6.64062C6.27604 10.6133 5.98958 9.98667 5.78125 9.32C5.57292 8.65333 5.46875 7.94667 5.46875 7.2C5.46875 5.2 6.15234 3.5 7.51953 2.1C8.88672 0.7 10.5469 0 12.5 0C14.4531 0 16.1133 0.7 17.4805 2.1C18.8477 3.5 19.5312 5.2 19.5312 7.2C19.5312 7.94667 19.4271 8.65333 19.2188 9.32C19.0104 9.98667 18.724 10.6133 18.3594 11.2H20.3125C20.7552 11.2 21.1263 11.3533 21.4258 11.66C21.7253 11.9667 21.875 12.3467 21.875 12.8C21.875 13.2533 21.7253 13.6333 21.4258 13.94C21.1263 14.2467 20.7552 14.4 20.3125 14.4H17.7734C18.138 15.6 18.7695 16.96 19.668 18.48C20.5664 20 21.9141 21.5067 23.7109 23C24.1016 23.32 24.4141 23.7067 24.6484 24.16C24.8828 24.6133 25 25.1067 25 25.64V28.8C25 29.68 24.694 30.4333 24.082 31.06C23.4701 31.6867 22.7344 32 21.875 32H3.125ZM3.125 28.8H21.875V25.6C19.4792 23.68 17.7474 21.7 16.6797 19.66C15.612 17.62 14.8958 15.8667 14.5312 14.4H10.4688C10.1042 15.8667 9.38802 17.62 8.32031 19.66C7.2526 21.7 5.52083 23.68 3.125 25.6V28.8ZM12.5 11.2C13.5938 11.2 14.5182 10.8133 15.2734 10.04C16.0286 9.26667 16.4062 8.32 16.4062 7.2C16.4062 6.08 16.0286 5.13333 15.2734 4.36C14.5182 3.58667 13.5938 3.2 12.5 3.2C11.4062 3.2 10.4818 3.58667 9.72656 4.36C8.97135 5.13333 8.59375 6.08 8.59375 7.2C8.59375 8.32 8.97135 9.26667 9.72656 10.04C10.4818 10.8133 11.4062 11.2 12.5 11.2Z"/>
  </svg>
`;

const CURRENT_ICONS: Record<ThemeName, string> = {
  coding: CURRENT_ICON_CODING,
  gaming: CURRENT_ICON_PAWN_WHITE,
  daprojects: CURRENT_ICON_PAWN_WHITE,
  foods: CURRENT_ICON_PAWN_WHITE,
};

const EXIT_ICON = `
  <svg viewBox="0 0 26 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21.4375 12.5H7.5C7.14583 12.5 6.84896 12.3802 6.60938 12.1406C6.36979 11.901 6.25 11.6042 6.25 11.25C6.25 10.8958 6.36979 10.599 6.60938 10.3594C6.84896 10.1198 7.14583 10 7.5 10H21.4375L20.375 8.9375C20.125 8.6875 20.0052 8.39583 20.0156 8.0625C20.026 7.72917 20.1458 7.4375 20.375 7.1875C20.625 6.9375 20.9219 6.80729 21.2656 6.79688C21.6094 6.78646 21.9062 6.90625 22.1562 7.15625L25.375 10.375C25.625 10.625 25.75 10.9167 25.75 11.25C25.75 11.5833 25.625 11.875 25.375 12.125L22.1562 15.3438C21.9062 15.5938 21.6094 15.7135 21.2656 15.7031C20.9219 15.6927 20.625 15.5625 20.375 15.3125C20.1458 15.0625 20.026 14.7708 20.0156 14.4375C20.0052 14.1042 20.125 13.8125 20.375 13.5625L21.4375 12.5ZM15 6.25V2.5H2.5V20H15V16.25C15 15.8958 15.1198 15.599 15.3594 15.3594C15.599 15.1198 15.8958 15 16.25 15C16.6042 15 16.901 15.1198 17.1406 15.3594C17.3802 15.599 17.5 15.8958 17.5 16.25V20C17.5 20.6875 17.2552 21.276 16.7656 21.7656C16.276 22.2552 15.6875 22.5 15 22.5H2.5C1.8125 22.5 1.22396 22.2552 0.734375 21.7656C0.244792 21.276 0 20.6875 0 20V2.5C0 1.8125 0.244792 1.22396 0.734375 0.734375C1.22396 0.244792 1.8125 0 2.5 0H15C15.6875 0 16.276 0.244792 16.7656 0.734375C17.2552 1.22396 17.5 1.8125 17.5 2.5V6.25C17.5 6.60417 17.3802 6.90104 17.1406 7.14062C16.901 7.38021 16.6042 7.5 16.25 7.5C15.8958 7.5 15.599 7.38021 15.3594 7.14062C15.1198 6.90104 15 6.60417 15 6.25Z"/>
  </svg>
`;

const CARD_BACK_GAMING = `
  <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="cb-gaming" x1="3.4125" y1="0" x2="148.748" y2="196.767" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ED1B76"/>
        <stop offset="0.917628" stop-color="#0A2835"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" fill="url(#cb-gaming)"/>
  </svg>
`;

const CARD_BACKS: Record<ThemeName, string> = {
  coding:     `<div class="card__back-face card__back-face--coding"></div>`,
  gaming:     CARD_BACK_GAMING,
  daprojects: `<div class="card__back-face card__back-face--daprojects"></div>`,
  foods:      `<div class="card__back-face card__back-face--foods"></div>`,
};

/** Returns the HTML for a card's back face for the given theme. */
function renderCardBack(theme: ThemeName): string {
  return CARD_BACKS[theme];
}

/** Builds the Blue player's score badge (icon + name + current score). */
function renderBlueBadge(theme: ThemeName, score: number): string {
  return `
    <span class="score-badge score-badge--blue">
      <span class="score-badge__icon">${SCORE_ICONS[theme]}</span>
      <span class="score-badge__name">Blue</span>
      <span class="score-badge__num">${score}</span>
    </span>
  `;
}

/** Builds the Orange player's score badge (icon + name + current score). */
function renderOrangeBadge(theme: ThemeName, score: number): string {
  return `
    <span class="score-badge score-badge--orange">
      <span class="score-badge__icon">${SCORE_ICONS[theme]}</span>
      <span class="score-badge__name">Orange</span>
      <span class="score-badge__num">${score}</span>
    </span>
  `;
}

/** Builds the combined scores box; the coding theme shows Blue first, every other theme shows Orange first. */
function renderScoresBox(theme: ThemeName, blueScore: number, orangeScore: number): string {
  const blue = renderBlueBadge(theme, blueScore);
  const orange = renderOrangeBadge(theme, orangeScore);
  // Coding theme: Blue first; Gaming/DA Projects/Foods: Orange first
  const inner = theme === 'coding' ? `${blue}${orange}` : `${orange}${blue}`;
  return `<div class="game__scores-box">${inner}</div>`;
}

/** Builds the HTML for one playable card (inner flip wrapper with back and front faces). */
function renderSingleCard(theme: ThemeName, card: { id: number; emoji: string }, cardBack: string): string {
  const icon = THEME_ICONS[theme][card.emoji];
  const frontContent = icon ?? `<span class="card__emoji">${card.emoji}</span>`;
  return `
    <div class="card" data-id="${card.id}" aria-label="Card">
      <div class="card__inner">
        <div class="card__face card__face--back">${cardBack}</div>
        <div class="card__face card__face--front">${frontContent}</div>
      </div>
    </div>
  `;
}

/** Builds the HTML for all cards on the board by mapping each Card model to its markup. */
function renderCardsHTML(game: Game, theme: ThemeName): string {
  const cardBack = renderCardBack(theme);
  return game.board.cards.map(card => renderSingleCard(theme, card, cardBack)).join('');
}

/** Builds the game header (scores box + current-player indicator + exit button). */
function renderGameHeader(theme: ThemeName, blueScore: number, orangeScore: number, currentColor: PlayerColor): string {
  return `
    <header class="game__header">
      ${renderScoresBox(theme, blueScore, orangeScore)}
      <div class="game__current">
        <span class="game__current-label">Current player:</span>
        <span class="game__current-box game__current-box--${currentColor}">${CURRENT_ICONS[theme]}</span>
      </div>
      <button class="game__exit" type="button" aria-label="Exit game">${EXIT_ICON}Exit game</button>
    </header>
  `;
}

/** Wires the exit button: shows the exit-confirmation popup and calls `onExit` when the user confirms. */
function bindExitButton(container: HTMLElement, theme: ThemeName, onExit: () => void): void {
  const exitBtn = container.querySelector<HTMLButtonElement>('.game__exit');
  exitBtn?.addEventListener('click', () => {
    showExitPopup(container, theme, () => {}, () => onExit());
  });
}

/** Delegates click events on the board to the GameService by extracting the card id from the clicked element. */
function bindBoardClicks(container: HTMLElement, service: GameService): void {
  const board = container.querySelector<HTMLElement>('.game__board');
  board?.addEventListener('click', (e: Event) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('.card');
    if (!target) return;
    const id = target.dataset.id;
    if (id == null) return;
    service.handleCardClick(Number(id));
  });
}

/**
 * Render the Game screen for the given config and wire up card clicks and the exit popup.
 * Invokes onEnd with the final outcome ('blue' | 'orange' | 'draw') when the board is completed.
 */
export function renderGame(
  container: HTMLElement,
  config: GameConfig,
  onExit: () => void,
  onEnd: (outcome: GameOutcome, scores: { blue: number; orange: number }) => void
): void {
  const game = new Game(config);
  container.innerHTML = buildGameTemplate(game, config);
  bindExitButton(container, config.theme, onExit);
  bindBoardClicks(container, new GameService(game, container, config.theme, onEnd));
}

/** Builds the full Game screen HTML string for the given game state and config. */
function buildGameTemplate(game: Game, config: GameConfig): string {
  const [blue, orange] = game.players;
  const header = renderGameHeader(config.theme, blue.score, orange.score, game.currentPlayer.color);
  return `
    <main class="game game--${config.theme}">
      ${header}
      <section class="game__board game__board--${config.boardSize}" aria-label="Memory board">
        ${renderCardsHTML(game, config.theme)}
      </section>
    </main>
  `;
}
