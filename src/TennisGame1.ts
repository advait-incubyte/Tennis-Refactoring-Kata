import type { TennisGame } from './types/tennis-game';
import type { Player } from './types/player';
import { PLAYERS } from './types/player';

export class TennisGame1 implements TennisGame {
  private playerOne: Player;
  private playerTwo: Player;

  constructor(playerOneName: string, playerTwoName: string) {
    this.playerOne = { name: playerOneName, score: 0 };
    this.playerTwo = { name: playerTwoName, score: 0 };
  }

  grantPointToPlayer(playerName: string): void {
    switch (playerName) {
      case PLAYERS.PLAYER_ONE:
        this.playerOne.score += 1;
        break;
      case PLAYERS.PLAYER_TWO:
        this.playerTwo.score += 1;
        break;
    }
  }

  getScore(): string {
    let score: string = '';
    if (this.playerOne.score === this.playerTwo.score) {
      switch (this.playerOne.score) {
        case 0:
          score = 'Love-All';
          break;
        case 1:
          score = 'Fifteen-All';
          break;
        case 2:
          score = 'Thirty-All';
          break;
        default:
          score = 'Deuce';
          break;
      }
    } else if (this.playerOne.score >= 4 || this.playerTwo.score >= 4) {
      const minusResult: number = this.playerOne.score - this.playerTwo.score;
      if (minusResult === 1) score = 'Advantage player1';
      else if (minusResult === -1) score = 'Advantage player2';
      else if (minusResult >= 2) score = 'Win for player1';
      else score = 'Win for player2';
    } else {
      let tempScore: number = 0;
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.playerOne.score;
        else { score += '-'; tempScore = this.playerTwo.score; }
        switch (tempScore) {
          case 0:
            score += 'Love';
            break;
          case 1:
            score += 'Fifteen';
            break;
          case 2:
            score += 'Thirty';
            break;
          case 3:
            score += 'Forty';
            break;
        }
      }
    }
    return score;
  }
}
