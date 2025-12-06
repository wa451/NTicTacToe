'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import InfoPanel from '@/components/InfoPanel';
import WinnerModal from '@/components/WinnerModal';
import RulesModal from '@/components/RulesModal';
import { GameState, Player } from '@/lib/types';
import {
  createEmptyBoard,
  generateValidWindow,
  checkWinner,
  hasEmptySpaceInWindow,
} from '@/lib/gameLogic';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const board = createEmptyBoard();
    const window = generateValidWindow(board);
    return {
      board,
      currentPlayer: 'player1' as Player,
      window,
      status: 'playing',
      message: 'ゲームスタート！プレイヤー1の番です',
      turnInRound: 1,
    };
  });

  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  // セルクリック時の処理
  const handleCellClick = (row: number, col: number) => {
    if (gameState.status !== 'playing') return;

    // 盤面を更新
    const newBoard = gameState.board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? gameState.currentPlayer : cell))
    );

    // 勝利判定
    const winner = checkWinner(newBoard, gameState.window);
    if (winner) {
      setGameState({
        ...gameState,
        board: newBoard,
        status: winner === 'player1' ? 'player1-won' : 'player2-won',
        message: '',
      });
      setShowWinnerModal(true);
      return;
    }

    // ターン進行
    if (gameState.turnInRound === 1) {
      // ラウンド内の1手目が終わった -> プレイヤー2のターン
      setGameState({
        ...gameState,
        board: newBoard,
        currentPlayer: 'player2',
        turnInRound: 2,
        message: 'プレイヤー2の番です',
      });
    } else {
      // ラウンド内の2手目が終わった -> 新しいラウンドへ
      startNewRound(newBoard);
    }
  };

  // 新しいラウンドを開始
  const startNewRound = (board: typeof gameState.board) => {
    let newWindow = generateValidWindow(board);
    let attempts = 0;
    const maxAttempts = 100;

    // 空きマスがあるウィンドウを探す
    while (!hasEmptySpaceInWindow(board, newWindow) && attempts < maxAttempts) {
      newWindow = generateValidWindow(board);
      attempts++;
    }

    // ウィンドウが決まった瞬間に勝利判定
    const immediateWinner = checkWinner(board, newWindow);
    if (immediateWinner) {
      setGameState({
        ...gameState,
        board,
        window: newWindow,
        status: immediateWinner === 'player1' ? 'player1-won' : 'player2-won',
        message: '',
      });
      setShowWinnerModal(true);
      return;
    }

    // 空きマスがない場合はスキップ
    if (!hasEmptySpaceInWindow(board, newWindow)) {
      setGameState({
        ...gameState,
        board,
        window: newWindow,
        currentPlayer: 'player1',
        turnInRound: 1,
        message: 'ウィンドウ内に空きマスがありません！ラウンドをスキップします...',
      });
      // 少し遅延してから次のラウンドへ
      setTimeout(() => startNewRound(board), 1500);
      return;
    }

    setGameState({
      ...gameState,
      board,
      window: newWindow,
      currentPlayer: 'player1',
      turnInRound: 1,
      message: `新しいラウンド！目標: ${newWindow.x}つ並べろ！`,
    });
  };

  // ゲームリセット
  const handleReset = () => {
    const board = createEmptyBoard();
    const window = generateValidWindow(board);
    setGameState({
      board,
      currentPlayer: 'player1',
      window,
      status: 'playing',
      message: 'ゲームスタート！プレイヤー1の番です',
      turnInRound: 1,
    });
    setShowWinnerModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-4 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* 横並びレイアウト - デスクトップ / 縦並び - モバイル */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* 左側: 情報パネル (デスクトップのみ) */}
          <div className="hidden lg:block space-y-3">
            <InfoPanel
              currentPlayer={gameState.currentPlayer}
              window={gameState.window}
              status={gameState.status}
              message={gameState.message}
              turnInRound={gameState.turnInRound}
            />
            
            {/* デスクトップ用リセットボタン */}
            <button
              onClick={handleReset}
              className="w-full px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 active:scale-95 transition-all duration-200"
            >
              ゲームをリセット
            </button>
          </div>

          {/* 右側/中央: ゲームボード */}
          <div>
            {/* スマホ用: 盤面の上に情報パネル */}
            <div className="lg:hidden mb-4">
              <InfoPanel
                currentPlayer={gameState.currentPlayer}
                window={gameState.window}
                status={gameState.status}
                message={gameState.message}
                turnInRound={gameState.turnInRound}
                onShowRules={() => setShowRulesModal(true)}
              />
            </div>
            
            <GameBoard
              board={gameState.board}
              window={gameState.window}
              onCellClick={handleCellClick}
              isGameOver={gameState.status !== 'playing'}
            />

            {/* 盤面の下にリセットボタン (スマホのみ) */}
            <div className="mt-4 lg:hidden">
              <button
                onClick={handleReset}
                className="w-full px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 active:scale-95 transition-all duration-200"
              >
                ゲームをリセット
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 勝利モーダル */}
      {showWinnerModal && gameState.status !== 'playing' && (
        <WinnerModal
          winner={gameState.status === 'player1-won' ? 'player1' : 'player2'}
          onReset={handleReset}
        />
      )}

      {/* ルール説明モーダル */}
      {showRulesModal && (
        <RulesModal onClose={() => setShowRulesModal(false)} />
      )}
    </div>
  );
}
