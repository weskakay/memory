import type { ThemeName } from '../types/types';

interface BtnStyle {
  width: number;
  height: number;
  bg: string;
  border: string;
  color: string;
  radius: number;
  shadow: string;
  bgHover?: string;
  borderHover?: string;
  colorHover?: string;
}

interface PopupConfig {
  width: number;
  bg: string;
  radius: number;
  textColor: string;
  backLabel: string;
  exitLabel: string;
  back: BtnStyle;
  exit: BtnStyle;
}

const POPUP_CONFIGS: Record<ThemeName, PopupConfig> = {
  coding: {
    width: 539,
    bg: '#ffffff',
    radius: 0,
    textColor: '#303131',
    backLabel: 'Back to game',
    exitLabel: 'Exit game',
    back: {
      width: 182, height: 57, bg: '#66CFBC', border: '#66CFBC',
      color: '#fff', radius: 5, shadow: 'none',
    },
    exit: {
      width: 148, height: 57, bg: 'transparent', border: '#66CFBC',
      color: '#66CFBC', radius: 5, shadow: 'none',
    },
  },
  gaming: {
    width: 481,
    bg: '#F0F6F9',
    radius: 20,
    textColor: '#294F60',
    backLabel: 'No, back to game',
    exitLabel: 'Yes, quit game',
    back: {
      width: 200, height: 43, bg: '#ED1B76', border: '#E71C4F',
      color: '#fff', radius: 10, shadow: 'none',
      bgHover: '#FFE8F1', borderHover: '#E71C4F', colorHover: '#ED1B76',
    },
    exit: {
      width: 174, height: 42, bg: 'rgba(237,27,118,0.08)', border: '#E71C4F',
      color: '#ED1B76', radius: 9, shadow: 'none',
      bgHover: '#ED1B76', borderHover: '#E71C4F', colorHover: '#fff',
    },
  },
  daprojects: {
    width: 456,
    bg: '#F0F6F9',
    radius: 20,
    textColor: '#294F60',
    backLabel: 'Back to game',
    exitLabel: 'Exit game',
    back: {
      width: 140, height: 43, bg: '#BFE5F2', border: 'transparent',
      color: '#1E7594', radius: 10, shadow: '3px 3px 5px rgba(47,46,46,0.2)',
    },
    exit: {
      width: 114, height: 43, bg: '#FD8A81', border: 'transparent',
      color: '#fff', radius: 10, shadow: '3px 3px 5px rgba(47,46,46,0.2)',
    },
  },
  foods: {
    width: 456,
    bg: '#F6F6F6',
    radius: 20,
    textColor: '#294F60',
    backLabel: 'No, back to game',
    exitLabel: 'Exit game',
    back: {
      width: 211, height: 45, bg: '#FFAB3E', border: 'transparent',
      color: '#fff', radius: 10, shadow: 'none',
    },
    exit: {
      width: 141, height: 46, bg: '#FFF9F2', border: '#F3832D',
      color: '#F3832D', radius: 10, shadow: 'none',
    },
  },
};

/** Serializes a BtnStyle into inline CSS (including hover custom properties). */
function btnStyles(s: BtnStyle): string {
  const hasHover = Boolean(s.bgHover);
  return [
    `width:${s.width}px`,
    `height:${s.height}px`,
    `--btn-bg:${s.bg}`,
    `--btn-border:${s.border}`,
    `--btn-color:${s.color}`,
    `--btn-bg-hover:${s.bgHover ?? s.bg}`,
    `--btn-border-hover:${s.borderHover ?? s.border}`,
    `--btn-color-hover:${s.colorHover ?? s.color}`,
    `--btn-filter-hover:${hasHover ? 'none' : 'brightness(0.92)'}`,
    `border-radius:${s.radius}px`,
    `box-shadow:${s.shadow}`,
  ].join(';') + ';';
}

/** Builds the popup dialog HTML for the given theme. */
function buildPopupHTML(theme: ThemeName, c: PopupConfig): string {
  return `
    <div class="popup__dialog popup__dialog--${theme}" style="width: ${c.width}px; background: ${c.bg}; border-radius: ${c.radius}px;">
      <p class="popup__text" style="color: ${c.textColor};">Are you sure you want to quit the game?</p>
      <div class="popup__actions">
        <button class="popup__btn popup__btn--back" type="button" style="${btnStyles(c.back)}">${c.backLabel}</button>
        <button class="popup__btn popup__btn--exit" type="button" style="${btnStyles(c.exit)}">${c.exitLabel}</button>
      </div>
    </div>
  `;
}

/** Wires the Back and Exit buttons to close the popup and fire their callbacks. */
function bindButtons(overlay: HTMLElement, close: () => void, onBack: () => void, onExit: () => void): void {
  overlay.querySelector<HTMLButtonElement>('.popup__btn--back')
    ?.addEventListener('click', () => { close(); onBack(); });
  overlay.querySelector<HTMLButtonElement>('.popup__btn--exit')
    ?.addEventListener('click', () => { close(); onExit(); });
}

/** Wires Escape key and overlay-click dismissal. Returns the keydown handler so the caller can unbind it. */
function bindDismissal(overlay: HTMLElement, close: () => void, onBack: () => void): (e: KeyboardEvent) => void {
  const dialog = overlay.querySelector<HTMLElement>('.popup__dialog');
  const handleKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { close(); onBack(); }
  };
  overlay.addEventListener('click', (e) => { if (e.target === overlay) { close(); onBack(); } });
  dialog?.addEventListener('click', (e) => e.stopPropagation());
  return handleKey;
}

/** Wires all interaction handlers (buttons, overlay click, Escape) for the popup. */
function bindPopupEvents(overlay: HTMLElement, onBack: () => void, onExit: () => void): void {
  const close = (): void => {
    overlay.remove();
    document.removeEventListener('keydown', handleKey);
  };
  const handleKey = bindDismissal(overlay, close, onBack);
  bindButtons(overlay, close, onBack, onExit);
  document.addEventListener('keydown', handleKey);
}

/**
 * Show the exit confirmation popup for the current theme.
 * Invokes onBack when dismissed (back button, overlay click, Escape) or onExit when exit is confirmed.
 */
export function showExitPopup(
  container: HTMLElement,
  theme: ThemeName,
  onBack: () => void,
  onExit: () => void
): void {
  const overlay = document.createElement('div');
  overlay.className = 'popup';
  overlay.innerHTML = buildPopupHTML(theme, POPUP_CONFIGS[theme]);
  container.appendChild(overlay);
  bindPopupEvents(overlay, onBack, onExit);
}
