import { CellState, WindowConfig, Player } from './types';
import { checkWinner, isCellInWindow } from './gameLogic';

export type Difficulty = 'easy' | 'normal';

// ウィンドウ内の空きマスを取得
function getEmptyPositionsInWindow(
  board: CellState[][],
  window: WindowConfig
): Array<{ row: number; col: number }> {
  const positions: Array<{ row: number; col: number }> = [];
  const { x, top, left } = window;

  for (let row = top; row < top + x; row++) {
    for (let col = left; col < left + x; col++) {
      if (board[row][col] === null) {
        positions.push({ row, col });
      }
    }
  }

  return positions;
}

// 指定位置に石を置いた場合の盤面をシミュレート
function simulateMove(
  board: CellState[][],
  row: number,
  col: number,
  player: Player
): CellState[][] {
  return board.map((r, i) =>
    r.map((cell, j) => (i === row && j === col ? player : cell))
  );
}

// EASY: 勝ち/負け防止アルゴリズム
function getEasyMove(
  board: CellState[][],
  window: WindowConfig,
  aiPlayer: Player
): { row: number; col: number } {
  const emptyPositions = getEmptyPositionsInWindow(board, window);
  const opponent: Player = aiPlayer === 'player1' ? 'player2' : 'player1';

  // 1. 勝てる手があるか探す
  for (const pos of emptyPositions) {
    const newBoard = simulateMove(board, pos.row, pos.col, aiPlayer);
    const winner = checkWinner(newBoard, window);
    if (winner === aiPlayer) {
      return pos;
    }
  }

  // 2. 相手が次に勝てる手を防ぐ
  for (const pos of emptyPositions) {
    const newBoard = simulateMove(board, pos.row, pos.col, opponent);
    const winner = checkWinner(newBoard, window);
    if (winner === opponent) {
      return pos;
    }
  }

  // 3. どちらでもなければランダム
  const randomIndex = Math.floor(Math.random() * emptyPositions.length);
  return emptyPositions[randomIndex];
}

// 特定方向に連続している石の数をカウント
function countConsecutive(
  board: CellState[][],
  row: number,
  col: number,
  dRow: number,
  dCol: number,
  player: Player,
  window: WindowConfig
): number {
  let count = 0;
  let r = row + dRow;
  let c = col + dCol;

  while (
    isCellInWindow(r, c, window) &&
    board[r] &&
    board[r][c] === player
  ) {
    count++;
    r += dRow;
    c += dCol;
  }

  return count;
}

// 評価関数: 指定位置のスコアを計算
function evaluatePosition(
  board: CellState[][],
  row: number,
  col: number,
  player: Player,
  window: WindowConfig,
  targetX: number
): number {
  let score = 0;
  const opponent: Player = player === 'player1' ? 'player2' : 'player1';

  // 仮に石を置く
  const testBoard = simulateMove(board, row, col, player);

  // 8方向（縦、横、斜め）をチェック
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1], // 右、下、右下、右上
  ];

  for (const [dRow, dCol] of directions) {
    // この方向と逆方向の連続数を数える
    const forward = countConsecutive(testBoard, row, col, dRow, dCol, player, window);
    const backward = countConsecutive(testBoard, row, col, -dRow, -dCol, player, window);
    const total = forward + backward + 1; // 自分自身を含む

    // N連が作れる（勝利）
    if (total >= targetX) {
      score += 10000;
    }
    // N-1連（リーチ）
    else if (total === targetX - 1) {
      score += 500;
    }
    // N-2連
    else if (total === targetX - 2) {
      score += 100;
    }
    // それ以下
    else {
      score += total * 10;
    }
  }

  // 相手の脅威もチェック（防御）
  const opponentBoard = simulateMove(board, row, col, opponent);
  for (const [dRow, dCol] of directions) {
    const forward = countConsecutive(opponentBoard, row, col, dRow, dCol, opponent, window);
    const backward = countConsecutive(opponentBoard, row, col, -dRow, -dCol, opponent, window);
    const total = forward + backward + 1;

    // 相手のN-1連を防ぐ
    if (total === targetX - 1) {
      score += 400;
    }
    // 相手のN-2連を防ぐ
    else if (total === targetX - 2) {
      score += 80;
    }
  }

  // 中央寄りのボーナス
  const { x, top, left } = window;
  const centerRow = top + Math.floor(x / 2);
  const centerCol = left + Math.floor(x / 2);
  const distanceToCenter = Math.abs(row - centerRow) + Math.abs(col - centerCol);
  score += Math.max(0, 20 - distanceToCenter * 2);

  return score;
}

// NORMAL: 評価関数ベースアルゴリズム
function getNormalMove(
  board: CellState[][],
  window: WindowConfig,
  aiPlayer: Player
): { row: number; col: number } {
  const emptyPositions = getEmptyPositionsInWindow(board, window);
  const targetX = window.x;

  let bestScore = -Infinity;
  let bestMoves: Array<{ row: number; col: number }> = [];

  // 各空きマスを評価
  for (const pos of emptyPositions) {
    const score = evaluatePosition(board, pos.row, pos.col, aiPlayer, window, targetX);

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [pos];
    } else if (score === bestScore) {
      bestMoves.push(pos);
    }
  }

  // 同じスコアの手が複数ある場合はランダムに選択
  const randomIndex = Math.floor(Math.random() * bestMoves.length);
  return bestMoves[randomIndex];
}

// AIの手を取得
export function getAIMove(
  board: CellState[][],
  window: WindowConfig,
  aiPlayer: Player,
  difficulty: Difficulty
): { row: number; col: number } {
  if (difficulty === 'easy') {
    return getEasyMove(board, window, aiPlayer);
  } else {
    return getNormalMove(board, window, aiPlayer);
  }
}
