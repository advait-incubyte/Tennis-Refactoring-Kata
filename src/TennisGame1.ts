import type { TennisGame } from './types/tennis-game';
import type { Player } from './types/player';

const DEUCE_THRESHOLD = 3;
const WIN_THRESHOLD = 3;

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

    if (this.arePlayersPointsTied(playerOneScore, playerTwoScore)) 
      return this.deuceScore(playerOneScore);

    if (this.isAdvantageOrWinPhase(playerOneScore, playerTwoScore)) {
      return this.advantageOrWinScore(playerOneScore, playerTwoScore);
    } 

    return this.regularScore(playerOneScore, playerTwoScore);
  }
  
  private regularScore(playerOneScore: number, playerTwoScore: number): string {
    return this.getScoreString(playerOneScore) + '-' + this.getScoreString(playerTwoScore);
  }

  private isAdvantageOrWinPhase(playerOneScore: number, playerTwoScore: number) {
    return playerOneScore > WIN_THRESHOLD || playerTwoScore > WIN_THRESHOLD;
  }
  
  private advantageOrWinScore(playerOneScore: number, playerTwoScore: number) {
    let score: string = '';
    const difference: number = Math.abs(playerOneScore - playerTwoScore);
    const playerWithHigherScore = (playerOneScore > playerTwoScore) ? this.playerOne : this.playerTwo;

    if (difference > 1) {
      score = `Win for ${playerWithHigherScore.name}`;
    } else {
      score = `Advantage ${playerWithHigherScore.name}`;
    }

    return score;
  }

  private arePlayersPointsTied(playerOneScore: number, playerTwoScore: number): boolean {
    return playerOneScore === playerTwoScore;
  }

  private deuceScore(playerPoints: number): string {
    return (playerPoints < DEUCE_THRESHOLD) 
      ? (this.getScoreString(playerPoints) + '-All') 
      : 'Deuce';
  }

  private getScoreString(score: number): string {
    const scorePointsToString = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    return scorePointsToString[score];
  }

  private getPlayerFromName(name: string): Player {
    return this.playerOne.name === name ? this.playerOne : this.playerTwo;
  }
}
