// ゲームの型定義

export type CellState = null | 'player1' | 'player2';
export type Player = 'player1' | 'player2';
export type GameStatus = 'playing' | 'player1-won' | 'player2-won';

export interface WindowConfig {
  x: number; // 目標の並び数 (3-10)
  top: number; // ウィンドウの左上のY座標
  left: number; // ウィンドウの左上のX座標
}

export interface GameState {
  board: CellState[][]; // 10x10の盤面
  currentPlayer: Player; // 現在のプレイヤー
  window: WindowConfig; // 現在のウィンドウ設定
  status: GameStatus; // ゲームの状態
  message: string; // システムメッセージ
  turnInRound: 1 | 2; // ラウンド内のターン (1 or 2)
}
