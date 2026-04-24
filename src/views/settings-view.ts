import type { GameConfig, ThemeName, BoardSize, PlayerColor } from '../types/types';

/** Delay before starting the game, long enough to let the Start button's spin animation finish (matches @keyframes settings-start-spin in _settings.scss). */
const START_BUTTON_SPIN_MS = 350;

const THEME_LABELS: Record<ThemeName, string> = {
  coding: 'Codes Theme',
  gaming: 'Games Theme',
  daprojects: 'DaPro Theme',
  foods: 'Foods Theme',
};

/** Returns the human-readable label for the chosen board size. */
function boardLabel(s: BoardSize): string {
  return `Board-${s} Cards`;
}

const FOOTER_MARKER = `
  <svg class="settings__step-marker" viewBox="138 15 38 61" fill="#F0EA6E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M143.836 74.828L159.328 69.664L154.164 54.172L138.672 59.336L143.836 74.828ZM173 16.5L171.211 15.6056L147.211 63.6056L149 64.5L150.789 65.3944L174.789 17.3944L173 16.5Z"/>
  </svg>
`;

/** Builds the dynamic footer steps showing the current selection. */
function buildFooterSteps(config: GameConfig): string {
  const steps = [
    `<span class="settings__step">${THEME_LABELS[config.theme]}</span>`,
    `<span class="settings__step settings__step--${config.startingPlayer}">Player</span>`,
    `<span class="settings__step">${boardLabel(config.boardSize)}</span>`,
  ];
  return steps.join(FOOTER_MARKER);
}

interface PreviewTheme {
  bg: string;
  headerBg: string;
  scoreBoxBg: string;
  playerBlue: string;
  playerOrange: string;
  bodyText: string;
  cardBack: string;
  cardBackIconColor: string;
  cardBackRotate: string;
  cardFront: string;
  cardFrontRotate: string;
  cardWidth: string;
  cardAspect: string;
  cardRadius: string;
  cardIconColor: string;
  cardIconSize: string;
  cardFrontImage: string;
  exitBg: string;
  exitBorder: string;
  exitText: string;
  exitIconColor: string;
  exitRadius: string;
  currentBoxBgBlue: string;
  currentBoxBgOrange: string;
  currentBoxRadius: string;
  currentBoxIconColor: string;
  tagType: 'chevron' | 'pawn';
}

const PREVIEW_THEME: Record<ThemeName, PreviewTheme> = {
  coding: {
    bg: 'linear-gradient(135deg, #303131 30%, #6d6d6d)',
    headerBg: 'rgba(77, 213, 188, 0.2)',
    scoreBoxBg: 'rgba(134, 233, 214, 0.3)',
    playerBlue: '#2bb1ff',
    playerOrange: '#f58e39',
    bodyText: '#ffffff',
    cardBack: 'linear-gradient(155deg, #4dd5bc, #286f62)',
    cardBackIconColor: 'rgba(255, 255, 255, 0.4)',
    cardBackRotate: '-5.45deg',
    cardFront: '#e8f3f0',
    cardFrontRotate: '11deg',
    cardWidth: '39%',
    cardAspect: '1',
    cardRadius: '4px',
    cardIconColor: '#de4c36',
    cardIconSize: '48%',
    cardFrontImage: 'none',
    exitBg: 'rgba(77, 213, 188, 0.2)',
    exitBorder: '#4dd5bc',
    exitText: '#ffffff',
    exitIconColor: '#ffffff',
    exitRadius: '0',
    currentBoxBgBlue: 'transparent',
    currentBoxBgOrange: 'transparent',
    currentBoxRadius: '0',
    currentBoxIconColor: '#2bb1ff',
    tagType: 'chevron',
  },
  gaming: {
    bg: 'linear-gradient(135deg, #294f60, #4d7a8f)',
    headerBg: 'rgba(253, 150, 201, 0.2)',
    scoreBoxBg: '#ffffff',
    playerBlue: '#097fc5',
    playerOrange: '#ea6900',
    bodyText: '#ffffff',
    cardBack: 'linear-gradient(120deg, #ed1b76, #0a2835)',
    cardBackIconColor: 'rgba(255, 255, 255, 0.45)',
    cardBackRotate: '-7.25deg',
    cardFront: '#f6f1f3',
    cardFrontRotate: '5.42deg',
    cardWidth: '37%',
    cardAspect: '170 / 220',
    cardRadius: '19px',
    cardIconColor: '#e91e8c',
    cardIconSize: '85%',
    cardFrontImage: 'var(--asset-gaming-dice)',
    exitBg: 'rgba(237, 27, 118, 0.08)',
    exitBorder: '#e71c4f',
    exitText: '#ffffff',
    exitIconColor: '#e71c4f',
    exitRadius: '5px',
    currentBoxBgBlue: '#1faafc',
    currentBoxBgOrange: '#ea6900',
    currentBoxRadius: '3px',
    currentBoxIconColor: '#ffffff',
    tagType: 'pawn',
  },
  daprojects: {
    bg: '#bfe5f2',
    headerBg: '#f0f3f4',
    scoreBoxBg: '#ffffff',
    playerBlue: '#097fc5',
    playerOrange: '#ea6900',
    bodyText: '#1e7594',
    cardBack: '#1e7594',
    cardBackIconColor: 'rgba(255, 255, 255, 0.4)',
    cardBackRotate: '0deg',
    cardFront: '#f0f4f5',
    cardFrontRotate: '0deg',
    cardWidth: '38%',
    cardAspect: '6 / 5',
    cardRadius: '13px',
    cardIconColor: '#1e7594',
    cardIconSize: '78%',
    cardFrontImage: 'none',
    exitBg: '#bfe5f2',
    exitBorder: 'transparent',
    exitText: '#1e7594',
    exitIconColor: '#1e7594',
    exitRadius: '5px',
    currentBoxBgBlue: '#097fc5',
    currentBoxBgOrange: '#ea6900',
    currentBoxRadius: '4px',
    currentBoxIconColor: '#ffffff',
    tagType: 'pawn',
  },
  foods: {
    bg: '#e8e2dc',
    headerBg: '#ffffff',
    scoreBoxBg: '#ffffff',
    playerBlue: '#097fc5',
    playerOrange: '#ea6900',
    bodyText: '#a45212',
    cardBack: '#f3832d',
    cardBackIconColor: 'rgba(255, 255, 255, 0.45)',
    cardBackRotate: '0deg',
    cardFront: '#f7e6d5',
    cardFrontRotate: '0deg',
    cardWidth: '38%',
    cardAspect: '1',
    cardRadius: '4px',
    cardIconColor: '#a45212',
    cardIconSize: '80%',
    cardFrontImage: 'var(--asset-foods-wrap)',
    exitBg: '#fff9f2',
    exitBorder: '#f3832d',
    exitText: '#f3832d',
    exitIconColor: '#f3832d',
    exitRadius: '5px',
    currentBoxBgBlue: '#097fc5',
    currentBoxBgOrange: '#ea6900',
    currentBoxRadius: '4px',
    currentBoxIconColor: '#ffffff',
    tagType: 'pawn',
  },
};

const SIZE_LABELS: Record<string, string> = {
  '16': '16 cards',
  '24': '24 cards',
  '36': '36 cards',
};

const ICON_PALETTE = `
  <svg class="settings__group-icon settings__group-icon--themes" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.3333 26.6667C11.5111 26.6667 9.78889 26.3167 8.16667 25.6167C6.54444 24.9167 5.12778 23.9611 3.91667 22.75C2.70556 21.5389 1.75 20.1222 1.05 18.5C0.35 16.8778 0 15.1556 0 13.3333C0 11.4889 0.361111 9.75556 1.08333 8.13333C1.80556 6.51111 2.78333 5.1 4.01667 3.9C5.25 2.7 6.68889 1.75 8.33333 1.05C9.97778 0.35 11.7333 0 13.6 0C15.3778 0 17.0556 0.305556 18.6333 0.916667C20.2111 1.52778 21.5944 2.37222 22.7833 3.45C23.9722 4.52778 24.9167 5.80556 25.6167 7.28333C26.3167 8.76111 26.6667 10.3556 26.6667 12.0667C26.6667 14.6222 25.8889 16.5833 24.3333 17.95C22.7778 19.3167 20.8889 20 18.6667 20H16.2C16 20 15.8611 20.0556 15.7833 20.1667C15.7056 20.2778 15.6667 20.4 15.6667 20.5333C15.6667 20.8 15.8333 21.1833 16.1667 21.6833C16.5 22.1833 16.6667 22.7556 16.6667 23.4C16.6667 24.5111 16.3611 25.3333 15.75 25.8667C15.1389 26.4 14.3333 26.6667 13.3333 26.6667ZM6 14.6667C6.57778 14.6667 7.05556 14.4778 7.43333 14.1C7.81111 13.7222 8 13.2444 8 12.6667C8 12.0889 7.81111 11.6111 7.43333 11.2333C7.05556 10.8556 6.57778 10.6667 6 10.6667C5.42222 10.6667 4.94444 10.8556 4.56667 11.2333C4.18889 11.6111 4 12.0889 4 12.6667C4 13.2444 4.18889 13.7222 4.56667 14.1C4.94444 14.4778 5.42222 14.6667 6 14.6667ZM10 9.33333C10.5778 9.33333 11.0556 9.14444 11.4333 8.76667C11.8111 8.38889 12 7.91111 12 7.33333C12 6.75556 11.8111 6.27778 11.4333 5.9C11.0556 5.52222 10.5778 5.33333 10 5.33333C9.42222 5.33333 8.94444 5.52222 8.56667 5.9C8.18889 6.27778 8 6.75556 8 7.33333C8 7.91111 8.18889 8.38889 8.56667 8.76667C8.94444 9.14444 9.42222 9.33333 10 9.33333ZM16.6667 9.33333C17.2444 9.33333 17.7222 9.14444 18.1 8.76667C18.4778 8.38889 18.6667 7.91111 18.6667 7.33333C18.6667 6.75556 18.4778 6.27778 18.1 5.9C17.7222 5.52222 17.2444 5.33333 16.6667 5.33333C16.0889 5.33333 15.6111 5.52222 15.2333 5.9C14.8556 6.27778 14.6667 6.75556 14.6667 7.33333C14.6667 7.91111 14.8556 8.38889 15.2333 8.76667C15.6111 9.14444 16.0889 9.33333 16.6667 9.33333ZM20.6667 14.6667C21.2444 14.6667 21.7222 14.4778 22.1 14.1C22.4778 13.7222 22.6667 13.2444 22.6667 12.6667C22.6667 12.0889 22.4778 11.6111 22.1 11.2333C21.7222 10.8556 21.2444 10.6667 20.6667 10.6667C20.0889 10.6667 19.6111 10.8556 19.2333 11.2333C18.8556 11.6111 18.6667 12.0889 18.6667 12.6667C18.6667 13.2444 18.8556 13.7222 19.2333 14.1C19.6111 14.4778 20.0889 14.6667 20.6667 14.6667ZM13.3333 24C13.5333 24 13.6944 23.9444 13.8167 23.8333C13.9389 23.7222 14 23.5778 14 23.4C14 23.0889 13.8333 22.7222 13.5 22.3C13.1667 21.8778 13 21.2444 13 20.4C13 19.4667 13.3222 18.7222 13.9667 18.1667C14.6111 17.6111 15.4 17.3333 16.3333 17.3333H18.6667C20.1333 17.3333 21.3889 16.9056 22.4333 16.05C23.4778 15.1944 24 13.8667 24 12.0667C24 9.37778 22.9722 7.13889 20.9167 5.35C18.8611 3.56111 16.4222 2.66667 13.6 2.66667C10.5778 2.66667 8 3.7 5.86667 5.76667C3.73333 7.83333 2.66667 10.3556 2.66667 13.3333C2.66667 16.2889 3.70556 18.8056 5.78333 20.8833C7.86111 22.9611 10.3778 24 13.3333 24Z" fill="#DA1EBA"/>
  </svg>
`;

const ICON_PAWN = `
  <svg class="settings__group-icon settings__group-icon--player" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.66667 26.6667C1.93333 26.6667 1.30556 26.4056 0.783333 25.8833C0.261111 25.3611 0 24.7333 0 24V21.3667C0 20.9222 0.1 20.5111 0.3 20.1333C0.5 19.7556 0.766667 19.4333 1.1 19.1667C2.63333 17.9222 3.78333 16.6667 4.55 15.4C5.31667 14.1333 5.85556 13 6.16667 12H4C3.62222 12 3.30556 11.8722 3.05 11.6167C2.79444 11.3611 2.66667 11.0444 2.66667 10.6667C2.66667 10.2889 2.79444 9.97222 3.05 9.71667C3.30556 9.46111 3.62222 9.33333 4 9.33333H5.66667C5.35556 8.84444 5.11111 8.32222 4.93333 7.76667C4.75556 7.21111 4.66667 6.62222 4.66667 6C4.66667 4.33333 5.25 2.91667 6.41667 1.75C7.58333 0.583333 9 0 10.6667 0C12.3333 0 13.75 0.583333 14.9167 1.75C16.0833 2.91667 16.6667 4.33333 16.6667 6C16.6667 6.62222 16.5778 7.21111 16.4 7.76667C16.2222 8.32222 15.9778 8.84444 15.6667 9.33333H17.3333C17.7111 9.33333 18.0278 9.46111 18.2833 9.71667C18.5389 9.97222 18.6667 10.2889 18.6667 10.6667C18.6667 11.0444 18.5389 11.3611 18.2833 11.6167C18.0278 11.8722 17.7111 12 17.3333 12H15.1667C15.4778 13 16.0167 14.1333 16.7833 15.4C17.55 16.6667 18.7 17.9222 20.2333 19.1667C20.5667 19.4333 20.8333 19.7556 21.0333 20.1333C21.2333 20.5111 21.3333 20.9222 21.3333 21.3667V24C21.3333 24.7333 21.0722 25.3611 20.55 25.8833C20.0278 26.4056 19.4 26.6667 18.6667 26.6667H2.66667ZM2.66667 24H18.6667V21.3333C16.6222 19.7333 15.1444 18.0833 14.2333 16.3833C13.3222 14.6833 12.7111 13.2222 12.4 12H8.93333C8.62222 13.2222 8.01111 14.6833 7.1 16.3833C6.18889 18.0833 4.71111 19.7333 2.66667 21.3333V24ZM10.6667 9.33333C11.6 9.33333 12.3889 9.01111 13.0333 8.36667C13.6778 7.72222 14 6.93333 14 6C14 5.06667 13.6778 4.27778 13.0333 3.63333C12.3889 2.98889 11.6 2.66667 10.6667 2.66667C9.73333 2.66667 8.94444 2.98889 8.3 3.63333C7.65556 4.27778 7.33333 5.06667 7.33333 6C7.33333 6.93333 7.65556 7.72222 8.3 8.36667C8.94444 9.01111 9.73333 9.33333 10.6667 9.33333Z" fill="#1AE5BE"/>
  </svg>
`;

const TITLE_UNDERLINE = `
  <svg class="settings__title-underline" viewBox="0 0 250 18" aria-hidden="true">
    <rect x="3" y="3" width="12" height="12" fill="currentColor" transform="rotate(45 9 9)"/>
    <rect x="15" y="7" width="230" height="4" fill="currentColor"/>
  </svg>
`;

const OPTION_ARROW = `
  <svg viewBox="0 0 60 18" aria-hidden="true">
    <rect x="0" y="7" width="48" height="4" fill="currentColor"/>
    <rect x="42" y="3" width="12" height="12" fill="currentColor" transform="rotate(45 48 9)"/>
  </svg>
`;

const ICON_CARDS = `
  <svg class="settings__group-icon settings__group-icon--size" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.66667 22.4444L1.53333 21.9778C0.844444 21.6889 0.383333 21.1889 0.15 20.4778C-0.0833333 19.7667 -0.0444444 19.0667 0.266667 18.3778L2.66667 13.1778V22.4444ZM8 25.3778C7.26667 25.3778 6.63889 25.1167 6.11667 24.5944C5.59444 24.0722 5.33333 23.4444 5.33333 22.7111V14.7111L8.86667 24.5111C8.93333 24.6667 9 24.8167 9.06667 24.9611C9.13333 25.1056 9.22222 25.2444 9.33333 25.3778H8ZM14.8667 25.2444C14.1556 25.5111 13.4667 25.4778 12.8 25.1444C12.1333 24.8111 11.6667 24.2889 11.4 23.5778L5.46667 7.31111C5.2 6.6 5.22222 5.90556 5.53333 5.22778C5.84444 4.55 6.35556 4.08889 7.06667 3.84444L17.1333 0.177778C17.8444 -0.0888889 18.5333 -0.0555556 19.2 0.277778C19.8667 0.611111 20.3333 1.13333 20.6 1.84444L26.5333 18.1111C26.8 18.8222 26.7778 19.5167 26.4667 20.1944C26.1556 20.8722 25.6444 21.3333 24.9333 21.5778L14.8667 25.2444ZM12 9.37778C12.3778 9.37778 12.6944 9.25 12.95 8.99445C13.2056 8.73889 13.3333 8.42222 13.3333 8.04445C13.3333 7.66667 13.2056 7.35 12.95 7.09444C12.6944 6.83889 12.3778 6.71111 12 6.71111C11.6222 6.71111 11.3056 6.83889 11.05 7.09444C10.7944 7.35 10.6667 7.66667 10.6667 8.04445C10.6667 8.42222 10.7944 8.73889 11.05 8.99445C11.3056 9.25 11.6222 9.37778 12 9.37778ZM13.9333 22.7111L24 19.0444L18.0667 2.71111L8 6.37778L13.9333 22.7111Z" fill="#0635C9"/>
  </svg>
`;

const ICON_SMART_DISPLAY = `
  <svg class="settings__start-icon" viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="1" y="1" width="18" height="14" rx="2"/>
    <path d="M8.5 5 L13.5 8 L8.5 11 Z" fill="currentColor" stroke="none"/>
  </svg>
`;

const PREVIEW_FRONT_ICONS: Record<ThemeName, string> = {
  coding: `<svg viewBox="0 0 89 89" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M87.5035 48.7181L56.5497 2.56764C54.7685 -0.0900319 51.1675 -0.799866 48.5081 0.982482L38.9243 7.4101L47.0781 19.5676C49.5953 19.2353 52.1961 20.3038 53.7065 22.5558C55.2235 24.8217 55.2166 27.6558 53.9331 29.8624L61.7911 41.5793C64.3198 41.2303 66.9479 42.2966 68.4657 44.5637C70.5881 47.7268 69.7439 52.0091 66.5796 54.1319C63.4145 56.255 59.1323 55.4108 57.0083 52.2452C55.4125 49.8631 55.4968 46.8465 56.9861 44.5956L49.6579 33.669L44.9221 57.6883C45.5193 58.1459 46.0384 58.6972 46.4594 59.3207C48.5817 62.4839 47.7375 66.7665 44.5728 68.8914C41.408 71.013 37.1237 70.1685 35.0046 67.0053C32.883 63.8383 33.7271 59.5561 36.8911 57.435C37.6494 56.9261 38.5011 56.5726 39.3969 56.3949L44.1758 32.1515C43.4128 31.6492 42.7586 30.9986 42.2521 30.2383C40.6437 27.8437 40.7414 24.8103 42.2522 22.5536L34.2147 10.5681L2.56913 31.7906C-0.0902546 33.575 -0.800157 37.1764 0.983428 39.8349L31.9378 85.9862C33.7196 88.6444 37.32 89.3541 39.98 87.5715L85.9173 56.7631C88.5758 54.9795 89.2865 51.3761 87.5035 48.7181Z"/></svg>`,
  gaming: '',
  daprojects: `<svg viewBox="53 38 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M133 68.9926V108.444H53V68.9926C57.883 68.9926 60.4378 71.5852 62.3037 73.4771C63.9007 75.0971 64.6178 75.7541 66.3333 75.7541C68.0489 75.7541 68.7652 75.0971 70.3622 73.4771C72.2281 71.5845 74.783 68.9926 79.6659 68.9926C84.5489 68.9926 87.1044 71.5852 88.9704 73.4771C90.5674 75.0971 91.2837 75.7541 92.9993 75.7541C94.7148 75.7541 95.4311 75.0971 97.0281 73.4771C98.8941 71.5845 101.45 68.9926 106.333 68.9926C111.217 68.9926 113.772 71.5852 115.637 73.4763C117.235 75.0971 117.951 75.7541 119.667 75.7541C121.382 75.7541 122.099 75.0971 123.696 73.4763C125.561 71.5845 128.117 68.9926 133 68.9926Z" fill="#3CC2D8"/><path d="M64.7034 98.3704C68.5552 89.5556 71.8397 80.5052 70.2449 71.3333C69.5078 67.0993 68.6967 62.9333 67.8086 59.0489L74.439 52.803L73.7723 52.7096L65.8982 51.6008C64.2856 46.063 62.473 41.6674 60.4619 39.3496C60.4619 39.3496 73.0027 35.9904 87.2427 39.8719C88.1177 40.1099 88.9997 40.3773 89.8886 40.6741C101.119 44.4252 112.975 52.9741 120.325 71.3407C122.297 76.2637 125.518 86.7407 125.518 96.1482" fill="#57AEC3"/><path opacity="0.07" d="M125.518 96.1481H113.444C113.444 86.7407 110.223 76.2637 108.251 71.3385C100.901 52.9741 89.0451 44.4252 77.8147 40.6741C76.9298 40.3778 76.0478 40.1104 75.1688 39.8718C72.4087 39.1244 69.5926 38.6019 66.748 38.3096C71.7532 37.7963 79.2288 37.6874 87.2429 39.8718C88.1179 40.1099 88.9999 40.3773 89.8888 40.6741C101.119 44.4252 112.975 52.9741 120.325 71.3407C122.297 76.2637 125.518 86.7407 125.518 96.1481Z" fill="black"/><path d="M133 81.9556V113.111H53V81.9556C57.883 81.9556 60.4378 84.5482 62.3037 86.44C63.9007 88.06 64.6178 88.717 66.3333 88.717C68.0489 88.717 68.7652 88.06 70.3622 86.44C72.2281 84.5474 74.783 81.9556 79.6659 81.9556C84.5489 81.9556 87.1044 84.5482 88.9704 86.44C90.5674 88.06 91.2837 88.717 92.9993 88.717C94.7148 88.717 95.4311 88.06 97.0281 86.44C98.8941 84.5474 101.45 81.9556 106.333 81.9556C111.217 81.9556 113.772 84.5482 115.637 86.4393C117.235 88.06 117.951 88.717 119.667 88.717C121.382 88.717 122.099 88.06 123.696 86.4393C125.561 84.5474 128.117 81.9556 133 81.9556Z" fill="#315FAD"/><path d="M133 99.7333V112.074C133 113.646 132.376 115.153 131.264 116.264C130.153 117.376 128.646 118 127.074 118H58.9259C57.3543 118 55.847 117.376 54.7357 116.264C53.6243 115.153 53 113.646 53 112.074V99.7333C57.883 99.7333 60.4378 102.326 62.3037 104.218C63.9007 105.838 64.6178 106.495 66.3333 106.495C68.0489 106.495 68.7652 105.838 70.3622 104.218C72.2281 102.325 74.783 99.7333 79.6659 99.7333C84.5489 99.7333 87.1044 102.326 88.9704 104.218C90.5674 105.838 91.2837 106.495 92.9993 106.495C94.7148 106.495 95.4311 105.838 97.0281 104.218C98.8941 102.325 101.45 99.7333 106.333 99.7333C111.217 99.7333 113.772 102.326 115.637 104.217C117.235 105.838 117.951 106.495 119.667 106.495C121.382 106.495 122.099 105.838 123.696 104.217C125.561 102.325 128.117 99.7333 133 99.7333Z" fill="#2F318D"/></svg>`,
  foods: '',
};

const PREVIEW_BACK_MASK = `<span class="settings__preview-back-mask"></span>`;

const PREVIEW_PAWN_SMALL = `<svg viewBox="0 0 22 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.66667 26.6667C1.93333 26.6667 1.30556 26.4056 0.783333 25.8833C0.261111 25.3611 0 24.7333 0 24V21.3667C0 20.9222 0.1 20.5111 0.3 20.1333C0.5 19.7556 0.766667 19.4333 1.1 19.1667C2.63333 17.9222 3.78333 16.6667 4.55 15.4C5.31667 14.1333 5.85556 13 6.16667 12H4C3.62222 12 3.30556 11.8722 3.05 11.6167C2.79444 11.3611 2.66667 11.0444 2.66667 10.6667C2.66667 10.2889 2.79444 9.97222 3.05 9.71667C3.30556 9.46111 3.62222 9.33333 4 9.33333H5.66667C5.35556 8.84444 5.11111 8.32222 4.93333 7.76667C4.75556 7.21111 4.66667 6.62222 4.66667 6C4.66667 4.33333 5.25 2.91667 6.41667 1.75C7.58333 0.583333 9 0 10.6667 0C12.3333 0 13.75 0.583333 14.9167 1.75C16.0833 2.91667 16.6667 4.33333 16.6667 6C16.6667 6.62222 16.5778 7.21111 16.4 7.76667C16.2222 8.32222 15.9778 8.84444 15.6667 9.33333H17.3333C17.7111 9.33333 18.0278 9.46111 18.2833 9.71667C18.5389 9.97222 18.6667 10.2889 18.6667 10.6667C18.6667 11.0444 18.5389 11.3611 18.2833 11.6167C18.0278 11.8722 17.7111 12 17.3333 12H15.1667C15.4778 13 16.0167 14.1333 16.7833 15.4C17.55 16.6667 18.7 17.9222 20.2333 19.1667C20.5667 19.4333 20.8333 19.7556 21.0333 20.1333C21.2333 20.5111 21.3333 20.9222 21.3333 21.3667V24C21.3333 24.7333 21.0722 25.3611 20.55 25.8833C20.0278 26.4056 19.4 26.6667 18.6667 26.6667H2.66667ZM2.66667 24H18.6667V21.3333C16.6222 19.7333 15.1444 18.0833 14.2333 16.3833C13.3222 14.6833 12.7111 13.2222 12.4 12H8.93333C8.62222 13.2222 8.01111 14.6833 7.1 16.3833C6.18889 18.0833 4.71111 19.7333 2.66667 21.3333V24ZM10.6667 9.33333C11.6 9.33333 12.3889 9.01111 13.0333 8.36667C13.6778 7.72222 14 6.93333 14 6C14 5.06667 13.6778 4.27778 13.0333 3.63333C12.3889 2.98889 11.6 2.66667 10.6667 2.66667C9.73333 2.66667 8.94444 2.98889 8.3 3.63333C7.65556 4.27778 7.33333 5.06667 7.33333 6C7.33333 6.93333 7.65556 7.72222 8.3 8.36667C8.94444 9.01111 9.73333 9.33333 10.6667 9.33333Z"/></svg>`;

/** Returns the HTML for a player tag (chevron or pawn shape) in the preview scores box. */
function previewTag(tagType: 'chevron' | 'pawn', color: 'blue' | 'orange'): string {
  const shapeClass = tagType === 'pawn' ? 'settings__preview-tag--pawn' : 'settings__preview-tag--chevron';
  const colorClass = `settings__preview-tag--${color}`;
  const inner = tagType === 'pawn' ? PREVIEW_PAWN_SMALL : '';
  return `<span class="settings__preview-tag ${shapeClass} ${colorClass}">${inner}</span>`;
}

/** Returns the HTML for the "current player" indicator box in the preview header. */
function previewCurrentBox(tagType: 'chevron' | 'pawn', color: PlayerColor): string {
  if (tagType === 'chevron') return previewTag('chevron', color);
  return `<span class="settings__preview-current-box settings__preview-current-box--${color}">${PREVIEW_PAWN_SMALL}</span>`;
}

/** Maps each PreviewTheme property to its corresponding `--preview-*` CSS variable name (kebab-case). */
const PREVIEW_CSS_VAR_MAP: Array<[keyof PreviewTheme, string]> = [
  ['bg', 'bg'], ['headerBg', 'header-bg'], ['scoreBoxBg', 'score-box-bg'],
  ['playerBlue', 'player-blue'], ['playerOrange', 'player-orange'],
  ['bodyText', 'body-text'], ['cardBack', 'card-back'],
  ['cardBackIconColor', 'card-back-icon'], ['cardBackRotate', 'card-back-rotate'],
  ['cardFront', 'card-front'], ['cardFrontRotate', 'card-front-rotate'],
  ['cardWidth', 'card-width'], ['cardAspect', 'card-aspect'], ['cardRadius', 'card-radius'],
  ['cardIconColor', 'card-icon'], ['cardIconSize', 'icon-size'], ['cardFrontImage', 'card-image'],
  ['exitBg', 'exit-bg'], ['exitBorder', 'exit-border'],
  ['exitText', 'exit-text'], ['exitIconColor', 'exit-icon'], ['exitRadius', 'exit-radius'],
  ['currentBoxBgBlue', 'current-box-bg-blue'], ['currentBoxBgOrange', 'current-box-bg-orange'],
  ['currentBoxRadius', 'current-box-radius'], ['currentBoxIconColor', 'current-box-icon'],
];

/** Serialises a PreviewTheme into the `--preview-*` CSS custom properties applied inline to the preview element. */
function buildPreviewStyle(t: PreviewTheme): string {
  return PREVIEW_CSS_VAR_MAP
    .map(([key, cssVar]) => `--preview-${cssVar}: ${t[key]}`)
    .join('; ');
}

/** Builds the two-player scores box in the preview header. The coding theme shows Blue first, every other theme shows Orange first. */
function previewScoresBox(theme: ThemeName, t: PreviewTheme): string {
  const blueTag = previewTag(t.tagType, 'blue');
  const orangeTag = previewTag(t.tagType, 'orange');
  const codingOrder = theme === 'coding';
  const first = codingOrder ? { tag: blueTag, label: 'Blue', color: 'blue' } : { tag: orangeTag, label: 'Orange', color: 'orange' };
  const second = codingOrder ? { tag: orangeTag, label: 'Orange', color: 'orange' } : { tag: blueTag, label: 'Blue', color: 'blue' };
  return `<div class="settings__preview-scores-box">${first.tag}<span class="settings__preview-text settings__preview-text--${first.color}">${first.label}</span><span class="settings__preview-text settings__preview-text--${first.color}">0</span>${second.tag}<span class="settings__preview-text settings__preview-text--${second.color}">${second.label}</span><span class="settings__preview-text settings__preview-text--${second.color}">0</span></div>`;
}

/** Returns the HTML for the decorative "Exit game" button shown inside the preview header. */
function previewExitBlock(): string {
  return `
    <div class="settings__preview-exit">
      <svg viewBox="0 0 11 9" fill="currentColor" aria-hidden="true">
        <path d="M8.575 5H3C2.85833 5 2.73958 4.95208 2.64375 4.85625C2.54792 4.76042 2.5 4.64167 2.5 4.5C2.5 4.35833 2.54792 4.23958 2.64375 4.14375C2.73958 4.04792 2.85833 4 3 4H8.575L8.15 3.575C8.05 3.475 8.00208 3.35833 8.00625 3.225C8.01042 3.09167 8.05833 2.975 8.15 2.875C8.25 2.775 8.36875 2.72292 8.50625 2.71875C8.64375 2.71458 8.7625 2.7625 8.8625 2.8625L10.15 4.15C10.25 4.25 10.3 4.36667 10.3 4.5C10.3 4.63333 10.25 4.75 10.15 4.85L8.8625 6.1375C8.7625 6.2375 8.64375 6.28542 8.50625 6.28125C8.36875 6.27708 8.25 6.225 8.15 6.125C8.05833 6.025 8.01042 5.90833 8.00625 5.775C8.00208 5.64167 8.05 5.525 8.15 5.425L8.575 5ZM6 2.5V1H1V8H6V6.5C6 6.35833 6.04792 6.23958 6.14375 6.14375C6.23958 6.04792 6.35833 6 6.5 6C6.64167 6 6.76042 6.04792 6.85625 6.14375C6.95208 6.23958 7 6.35833 7 6.5V8C7 8.275 6.90208 8.51042 6.70625 8.70625C6.51042 8.90208 6.275 9 6 9H1C0.725 9 0.489583 8.90208 0.29375 8.70625C0.0979167 8.51042 0 8.275 0 8V1C0 0.725 0.0979167 0.489583 0.29375 0.29375C0.489583 0.0979167 0.725 0 1 0H6C6.275 0 6.51042 0.0979167 6.70625 0.29375C6.90208 0.489583 7 0.725 7 1V2.5C7 2.64167 6.95208 2.76042 6.85625 2.85625C6.76042 2.95208 6.64167 3 6.5 3C6.35833 3 6.23958 2.95208 6.14375 2.85625C6.04792 2.76042 6 2.64167 6 2.5Z"/>
      </svg>
      <span>Exit game</span>
    </div>
  `;
}

/** Builds the preview header (scores box + current-player indicator + exit button). */
function renderPreviewHeader(theme: ThemeName, t: PreviewTheme, currentPlayer: PlayerColor): string {
  return `
    <div class="settings__preview-header">
      ${previewScoresBox(theme, t)}
      <div class="settings__preview-current">
        <span class="settings__preview-current-label">Current player:</span>
        ${previewCurrentBox(t.tagType, currentPlayer)}
      </div>
      ${previewExitBlock()}
    </div>
  `;
}

/** Builds the preview's card-stack area (back-mask + front card). The gaming theme omits the back-mask overlay. */
function renderPreviewCards(theme: ThemeName): string {
  const backMask = theme === 'gaming' ? '' : PREVIEW_BACK_MASK;
  return `
    <div class="settings__preview-cards">
      <div class="settings__preview-card settings__preview-card--back">${backMask}</div>
      <div class="settings__preview-card settings__preview-card--front">${PREVIEW_FRONT_ICONS[theme]}</div>
    </div>
  `;
}

/** Builds the full preview box (header + cards) for the chosen theme and starting player. */
function renderPreview(theme: ThemeName, currentPlayer: PlayerColor): string {
  const t = PREVIEW_THEME[theme];
  return `
    <div class="settings__preview" style="${buildPreviewStyle(t)}">
      ${renderPreviewHeader(theme, t, currentPlayer)}
      ${renderPreviewCards(theme)}
    </div>
  `;
}

/** Builds a single radio-option list item for a settings group. */
function renderOption(name: string, value: string, label: string, checked: boolean): string {
  return `
    <li class="settings__option">
      <label class="settings__option-label">
        <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''}>
        <span class="settings__option-text">${label}</span>
        <span class="settings__option-arrow" aria-hidden="true">${OPTION_ARROW}</span>
      </label>
    </li>
  `;
}

/** Wraps a group header (icon + title) and its option list into a settings section. */
function renderGroup(icon: string, title: string, options: string): string {
  return `
    <section class="settings__group">
      <header class="settings__group-header">
        ${icon}
        <h2 class="settings__group-title">${title}</h2>
      </header>
      <ul class="settings__options">${options}</ul>
    </section>
  `;
}

/** Builds the "Game themes" radio group with the current theme pre-selected. */
function renderThemeGroup(config: GameConfig): string {
  const options = (Object.keys(THEME_LABELS) as ThemeName[])
    .map(key => renderOption('theme', key, THEME_LABELS[key], key === config.theme))
    .join('');
  return renderGroup(ICON_PALETTE, 'Game themes', options);
}

/** Builds the "Choose player" radio group with the current starting player pre-selected. */
function renderPlayerGroup(config: GameConfig): string {
  const labels: Record<PlayerColor, string> = { blue: 'Blue', orange: 'Orange' };
  const options = (['blue', 'orange'] as PlayerColor[])
    .map(c => renderOption('player', c, labels[c], config.startingPlayer === c))
    .join('');
  return renderGroup(ICON_PAWN, 'Choose player', options);
}

/** Builds the "Board size" radio group (16 / 24 / 36 cards) with the current size pre-selected. */
function renderSizeGroup(config: GameConfig): string {
  const options = (['16', '24', '36'] as const)
    .map(s => renderOption('size', s, SIZE_LABELS[s], Number(s) === config.boardSize))
    .join('');
  return renderGroup(ICON_CARDS, 'Board size', options);
}

/** Builds the left column of the settings page (title + all three radio groups). */
function renderSettingsLeft(config: GameConfig): string {
  return `
    <div class="settings__left">
      <h1 class="settings__title">Settings${TITLE_UNDERLINE}</h1>
      <div class="settings__groups">
        ${renderThemeGroup(config)}
        ${renderPlayerGroup(config)}
        ${renderSizeGroup(config)}
      </div>
    </div>
  `;
}

/** Builds the right column of the settings page (preview box + footer with steps and the Start button). */
function renderSettingsRight(config: GameConfig): string {
  return `
    <div class="settings__right">
      <div class="settings__preview-wrap">${renderPreview(config.theme, config.startingPlayer)}</div>
      <footer class="settings__footer">
        <nav class="settings__steps" aria-label="Current selection">
          ${buildFooterSteps(config)}
        </nav>
        <button class="settings__start" type="button" aria-label="Start game">${ICON_SMART_DISPLAY}<span class="settings__start-label">Start</span></button>
      </footer>
    </div>
  `;
}

/** Re-renders the footer steps inline (no full re-render) when a setting changes. */
function updateFooter(container: HTMLElement, config: GameConfig): void {
  const steps = container.querySelector('.settings__steps');
  if (steps) steps.innerHTML = buildFooterSteps(config);
}

/** Reads the currently checked radio values and returns an updated GameConfig; mutates `config` in place and returns a copy. */
function readConfigFromDOM(container: HTMLElement, config: GameConfig): GameConfig {
  const themeEl = container.querySelector('input[name="theme"]:checked') as HTMLInputElement | null;
  const playerEl = container.querySelector('input[name="player"]:checked') as HTMLInputElement | null;
  const sizeEl = container.querySelector('input[name="size"]:checked') as HTMLInputElement | null;
  if (themeEl) config.theme = themeEl.value as ThemeName;
  if (playerEl) config.startingPlayer = playerEl.value as PlayerColor;
  if (sizeEl) config.boardSize = parseInt(sizeEl.value, 10) as BoardSize;
  return { ...config };
}

/** Re-renders only the preview box when theme or starting player changes (cheaper than a full settings re-render). */
function updatePreview(container: HTMLElement, theme: ThemeName, currentPlayer: PlayerColor): void {
  const wrap = container.querySelector('.settings__preview-wrap');
  if (wrap) wrap.innerHTML = renderPreview(theme, currentPlayer);
}

/** Wires the Start button: triggers the spin animation, then invokes `onStart` with the current config. */
function bindStartButton(
  container: HTMLElement,
  config: GameConfig,
  onStart: (config: GameConfig) => void
): void {
  const startBtn = container.querySelector<HTMLButtonElement>('.settings__start');
  startBtn?.addEventListener('click', () => {
    startBtn.classList.add('settings__start--activating');
    setTimeout(() => onStart(readConfigFromDOM(container, config)), START_BUTTON_SPIN_MS);
  });
}

/** Wires every radio input: on change, reads the config and refreshes the preview and footer. */
function bindRadioChanges(container: HTMLElement, config: GameConfig): void {
  container.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      readConfigFromDOM(container, config);
      updatePreview(container, config.theme, config.startingPlayer);
      updateFooter(container, config);
    });
  });
}

/** Wires all settings interactions (Start button + radio changes). */
function bindSettingsEvents(
  container: HTMLElement,
  config: GameConfig,
  onStart: (config: GameConfig) => void
): void {
  bindStartButton(container, config, onStart);
  bindRadioChanges(container, config);
}

/** Builds the full Settings screen HTML string for the given config. */
function buildSettingsTemplate(config: GameConfig): string {
  return `
    <main class="settings">
      ${renderSettingsLeft(config)}
      ${renderSettingsRight(config)}
    </main>
  `;
}

/**
 * Render the Settings screen (theme, player colour, board size) and wire it up.
 * Calls onStart with the chosen config when the user clicks Start.
 */
export function renderSettings(
  container: HTMLElement,
  onStart: (config: GameConfig) => void
): void {
  const config: GameConfig = { theme: 'coding', boardSize: 16, startingPlayer: 'blue' };
  container.innerHTML = buildSettingsTemplate(config);
  bindSettingsEvents(container, config, onStart);
}
