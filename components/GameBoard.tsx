import { CellState, WindowConfig } from '@/lib/types';
import { isCellInWindow } from '@/lib/gameLogic';

interface GameBoardProps {
  board: CellState[][];
  window: WindowConfig;
  onCellClick: (row: number, col: number) => void;
  isGameOver: boolean;
}

export default function GameBoard({ 
  board, 
  window, 
  onCellClick,
  isGameOver 
}: GameBoardProps) {
  const getCellClassName = (row: number, col: number): string => {
    const cell = board[row][col];
    const inWindow = isCellInWindow(row, col, window);
    const isEmpty = cell === null;
    const isClickable = inWindow && isEmpty && !isGameOver;
    
    let classes = 'aspect-square flex items-center justify-center border transition-all duration-200 ';
    
    // ウィンドウ内外のスタイル
    if (inWindow) {
      classes += 'bg-white border-gray-400 ';
    } else {
      classes += 'bg-gray-200 border-gray-300 opacity-50 ';
    }
    
    // クリック可能な場合
    if (isClickable) {
      classes += 'cursor-pointer hover:bg-blue-50 hover:border-blue-400 ';
    } else {
      classes += 'cursor-not-allowed ';
    }
    
    return classes;
  };
  
  const getCellContent = (cell: CellState) => {
    if (cell === 'player1') {
      return (
        <div className="w-4/5 h-4/5 rounded-full bg-gray-800 shadow-lg flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-gray-900" />
        </div>
      );
    }
    if (cell === 'player2') {
      return (
        <div className="w-4/5 h-4/5 rounded-full bg-white border-4 border-gray-800 shadow-lg" />
      );
    }
    return null;
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-10 gap-0.5 bg-gray-400 p-1 rounded-lg shadow-xl">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClassName(rowIndex, colIndex)}
              onClick={() => {
                if (
                  isCellInWindow(rowIndex, colIndex, window) &&
                  cell === null &&
                  !isGameOver
                ) {
                  onCellClick(rowIndex, colIndex);
                }
              }}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
