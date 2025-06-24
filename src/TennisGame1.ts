import type { TennisGame } from './types/tennis-game';
import type { Player } from './types/player';

export class TennisGame1 implements TennisGame {
  private playerOne: Player;
  private playerTwo: Player;

  constructor(playerOneName: string, playerTwoName: string) {
    this.playerOne = { name: playerOneName, score: 0 };
    this.playerTwo = { name: playerTwoName, score: 0 };
  }

  grantPointToPlayer(playerName: string): void {
    const player = this.getPlayerFromName(playerName);
    player.score += 1;
  }

  getScore(): string {
    const [playerOneScore, playerTwoScore] = [this.playerOne.score, this.playerTwo.score];

    if (playerOneScore === playerTwoScore) {
      const score = (playerOneScore < 3) ? (this.getScoreString(playerOneScore) + '-All') : 'Deuce';
      return score;
    }

    if (playerOneScore >= 4 || playerTwoScore >= 4) {
      let score: string = '';
      const minusResult: number = playerOneScore - playerTwoScore;
      if (minusResult === 1) score = 'Advantage player1';
      else if (minusResult === -1) score = 'Advantage player2';
      else if (minusResult >= 2) score = 'Win for player1';
      else score = 'Win for player2';
      return score;
    } 

    const score = this.getScoreString(playerOneScore) + '-' + this.getScoreString(playerTwoScore);
    return score;
  }

  private getScoreString(score: number): string {
    const scorePointsToString = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    return scorePointsToString[score];
  }

  private getPlayerFromName(name: string): Player {
    return this.playerOne.name === name ? this.playerOne : this.playerTwo;
  }
}
