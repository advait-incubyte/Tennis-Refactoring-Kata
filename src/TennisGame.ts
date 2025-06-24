export interface TennisGame {
  grantPointToPlayer(playerName: string): void;
  getScore(): string;
}

export interface Player {
  name: string;
  score: number;
}