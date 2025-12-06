import { CellState, WindowConfig, Player } from './types';

const BOARD_SIZE = 10;

// 10x10の空の盤面を生成
export function createEmptyBoard(): CellState[][] {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
}

// ランダムなウィンドウ設定を生成
export function generateRandomWindow(): WindowConfig {
  const x = Math.floor(Math.random() * 8) + 3; // 3-10のランダムな整数
  const maxPos = BOARD_SIZE - x;
  const top = Math.floor(Math.random() * (maxPos + 1));
  const left = Math.floor(Math.random() * (maxPos + 1));
  
  return { x, top, left };
}

// ウィンドウ内に空きマスがあるかチェック
export function hasEmptySpaceInWindow(
  board: CellState[][],
  window: WindowConfig
): boolean {
  const { x, top, left } = window;
  
  for (let row = top; row < top + x; row++) {
    for (let col = left; col < left + x; col++) {
      if (board[row][col] === null) {
        return true;
      }
    }
  }
  
  return false;
}

// セルがウィンドウ内にあるかチェック
export function isCellInWindow(
  row: number,
  col: number,
  window: WindowConfig
): boolean {
  const { x, top, left } = window;
  return row >= top && row < top + x && col >= left && col < left + x;
}

// 勝利判定ロジック（ウィンドウ内のみで判定）
export function checkWinner(
  board: CellState[][],
  window: WindowConfig
): Player | null {
  const { x, top, left } = window;
  
  // 横方向のチェック
  for (let row = top; row < top + x; row++) {
    for (let col = left; col <= left + x - x; col++) {
      const player = board[row][col];
      if (player === null) continue;
      
      let count = 0;
      for (let i = 0; i < x; i++) {
        if (board[row][col + i] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count === x) {
        return player;
      }
    }
  }
  
  // 縦方向のチェック
  for (let col = left; col < left + x; col++) {
    for (let row = top; row <= top + x - x; row++) {
      const player = board[row][col];
      if (player === null) continue;
      
      let count = 0;
      for (let i = 0; i < x; i++) {
        if (board[row + i][col] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count === x) {
        return player;
      }
    }
  }
  
  // 右下がり斜めのチェック
  for (let row = top; row <= top + x - x; row++) {
    for (let col = left; col <= left + x - x; col++) {
      const player = board[row][col];
      if (player === null) continue;
      
      let count = 0;
      for (let i = 0; i < x; i++) {
        if (board[row + i][col + i] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count === x) {
        return player;
      }
    }
  }
  
  // 右上がり斜めのチェック
  for (let row = top + x - 1; row >= top + x - 1; row--) {
    for (let col = left; col <= left + x - x; col++) {
      if (row < top + x - 1) continue;
      
      const player = board[row][col];
      if (player === null) continue;
      
      let count = 0;
      for (let i = 0; i < x; i++) {
        if (row - i >= 0 && board[row - i][col + i] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count === x) {
        return player;
      }
    }
  }
  
  return null;
}

// 有効なウィンドウを生成（空きマスがあるまで再試行）
export function generateValidWindow(board: CellState[][]): WindowConfig {
  let window = generateRandomWindow();
  let attempts = 0;
  const maxAttempts = 100;
  
  while (!hasEmptySpaceInWindow(board, window) && attempts < maxAttempts) {
    window = generateRandomWindow();
    attempts++;
  }
  
  return window;
}
