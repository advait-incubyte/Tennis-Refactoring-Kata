export interface TennisGame {
  grantPointToPlayer(playerName: string): void;
  getScore(): string;
}