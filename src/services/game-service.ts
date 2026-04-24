import type { ThemeName, GameOutcome } from '../types/types';
import type { Game } from '../models/game';
import type { Card } from '../models/card';

const FLIP_BACK_DELAY_MS = 1000;

type EndCallback = (outcome: GameOutcome, scores: { blue: number; orange: number }) => void;

/**
 * Orchestrates gameplay: handles card clicks, match detection, score updates,
 * and end-of-game transitions. Bridges the Game model to the rendered DOM.
 */
export class GameService {
  private game: Game;
  private container: HTMLElement;
  private theme: ThemeName;
  private onEnd: EndCallback;
  private locked = false;
  private flippedCards: Card[] = [];

  /**
   * Wires the service to a concrete game session. `container` is the root
   * Game-screen element the service queries and mutates; `theme` governs the
   * badge order when updating scores; `onEnd` fires once every card is matched.
   */
  constructor(
    game: Game,
    container: HTMLElement,
    theme: ThemeName,
    onEnd: EndCallback
  ) {
    this.game = game;
    this.container = container;
    this.theme = theme;
    this.onEnd = onEnd;
  }

  /** Handle a card click: flip the card, check for a match once two are face-up. */
  handleCardClick(cardId: number): void {
    if (this.locked) return;

    const card = this.game.board.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    card.flip();
    this.flipCardDOM(card);
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  /** Compare the two flipped cards and route to success or failure handling. */
  private checkMatch(): void {
    this.locked = true;
    const [first, second] = this.flippedCards;

    if (first.pairId === second.pairId) {
      this.handleMatchSuccess(first, second);
    } else {
      setTimeout(() => this.handleMatchFailure(first, second), FLIP_BACK_DELAY_MS);
    }
  }

  /** Mark both cards as matched, award a point and check for game end. */
  private handleMatchSuccess(card1: Card, card2: Card): void {
    card1.match();
    card2.match();
    this.markCardMatched(card1);
    this.markCardMatched(card2);

    this.game.currentPlayer.addPoint();
    this.updateScores();
    this.flippedCards = [];
    this.locked = false;

    this.checkGameEnd();
  }

  /** Flip the two cards face-down and hand the turn to the other player. */
  private handleMatchFailure(card1: Card, card2: Card): void {
    card1.unflip();
    card2.unflip();
    this.flipCardDOM(card1);
    this.flipCardDOM(card2);

    this.game.switchPlayer();
    this.updateCurrentPlayer();
    this.flippedCards = [];
    this.locked = false;
  }

  /** Sync a card's face-up/face-down state to the DOM. */
  private flipCardDOM(card: Card): void {
    const el = this.container.querySelector<HTMLElement>(`.card[data-id="${card.id}"]`);
    if (!el) return;

    if (card.isFlipped) {
      el.classList.add('card--flipped');
    } else {
      el.classList.remove('card--flipped');
    }
  }

  /** Add the matched modifier to a card element so it stays face-up. */
  private markCardMatched(card: Card): void {
    const el = this.container.querySelector<HTMLElement>(`.card[data-id="${card.id}"]`);
    if (!el) return;
    el.classList.add('card--matched');
  }

  /** Refresh score numbers in the header, respecting per-theme badge order. */
  private updateScores(): void {
    const [blue, orange] = this.game.players;
    const nums = this.container.querySelectorAll<HTMLElement>('.score-badge__num');
    const blueFirst = this.theme === 'coding';

    if (blueFirst) {
      if (nums[0]) nums[0].textContent = String(blue.score);
      if (nums[1]) nums[1].textContent = String(orange.score);
    } else {
      if (nums[0]) nums[0].textContent = String(orange.score);
      if (nums[1]) nums[1].textContent = String(blue.score);
    }
  }

  /** Update the current-player badge colour and trigger the pulse animation. */
  private updateCurrentPlayer(): void {
    const box = this.container.querySelector<HTMLElement>('.game__current-box');
    if (!box) return;
    box.classList.remove('game__current-box--blue', 'game__current-box--orange');
    box.classList.add(`game__current-box--${this.game.currentPlayer.color}`);
    box.classList.remove('game__current-box--pulse');
    void box.offsetWidth;
    box.classList.add('game__current-box--pulse');
  }

  /** Fire the end-of-game callback once every card is matched. */
  private checkGameEnd(): void {
    if (!this.game.isOver) return;
    const result = this.game.getResult();
    if (!result) return;
    this.onEnd(result.winner, { blue: result.blueScore, orange: result.orangeScore });
  }
}
