import type { ThemeName, PlayerColor } from '../types/types';
import type { Game } from '../models/Game';
import type { Card } from '../models/Card';

const FLIP_BACK_DELAY_MS = 1000;

type GameOverCallback = (scores: { blue: number; orange: number }) => void;
type WinnerCallback = (winner: PlayerColor, scores: { blue: number; orange: number }) => void;

export class GameService {
  private game: Game;
  private container: HTMLElement;
  private theme: ThemeName;
  private onGameOver: GameOverCallback;
  private onWinner: WinnerCallback;
  private locked = false;
  private flippedCards: Card[] = [];

  constructor(
    game: Game,
    container: HTMLElement,
    theme: ThemeName,
    onGameOver: GameOverCallback,
    onWinner: WinnerCallback
  ) {
    this.game = game;
    this.container = container;
    this.theme = theme;
    this.onGameOver = onGameOver;
    this.onWinner = onWinner;
  }

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

  private checkMatch(): void {
    this.locked = true;
    const [first, second] = this.flippedCards;

    if (first.pairId === second.pairId) {
      this.handleMatchSuccess(first, second);
    } else {
      setTimeout(() => this.handleMatchFailure(first, second), FLIP_BACK_DELAY_MS);
    }
  }

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

  private flipCardDOM(card: Card): void {
    const el = this.container.querySelector<HTMLElement>(`.card[data-id="${card.id}"]`);
    if (!el) return;

    if (card.isFlipped) {
      el.classList.add('card--flipped');
    } else {
      el.classList.remove('card--flipped');
    }
  }

  private markCardMatched(card: Card): void {
    const el = this.container.querySelector<HTMLElement>(`.card[data-id="${card.id}"]`);
    if (!el) return;
    el.classList.add('card--matched');
  }

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

  private updateCurrentPlayer(): void {
    const box = this.container.querySelector<HTMLElement>('.game__current-box');
    if (!box) return;
    box.classList.remove('game__current-box--blue', 'game__current-box--orange');
    box.classList.add(`game__current-box--${this.game.currentPlayer.color}`);
  }

  private checkGameEnd(): void {
    if (!this.game.isOver) return;

    const result = this.game.getResult();
    if (!result) return;

    const scores = { blue: result.blueScore, orange: result.orangeScore };

    if (result.isDraw) {
      this.onGameOver(scores);
    } else if (result.winner) {
      this.onWinner(result.winner, scores);
    }
  }
}
