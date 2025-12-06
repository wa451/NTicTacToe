import { Player } from '@/lib/types';

interface WinnerModalProps {
  winner: Player;
  onReset: () => void;
}

export default function WinnerModal({ winner, onReset }: WinnerModalProps) {
  const isPlayer1 = winner === 'player1';
  
  return (
    <>
      {/* デスクトップ版 - 画面上部中央 */}
      <div className="hidden lg:block fixed top-4 left-1/3 -translate-x-1/2 z-50 animate-bounce-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
          {/* 勝利アイコン */}
          <div className="text-6xl mb-3 animate-bounce">
            🎉
          </div>
          
          {/* 勝者の石 */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full shadow-xl ${
                isPlayer1
                  ? 'bg-gray-800'
                  : 'bg-white border-6 border-gray-800'
              }`}
            />
          </div>

          {/* 勝利メッセージ */}
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            勝利！
          </h2>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            {isPlayer1 ? 'プレイヤー1 (黒)' : 'プレイヤー2 (白)'}
          </p>

          {/* ボタン */}
          <button
            onClick={onReset}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-200"
          >
            もう一度プレイ
          </button>
        </div>
      </div>

      {/* スマホ版 - 画面上部に横長 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4 animate-scale-in">
        <div className="bg-white rounded-xl shadow-2xl p-4">
          <div className="flex items-center gap-4">
            {/* 左側: アイコンと石 */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl animate-bounce">🎉</div>
              <div
                className={`w-12 h-12 rounded-full shadow-lg ${
                  isPlayer1
                    ? 'bg-gray-800'
                    : 'bg-white border-4 border-gray-800'
                }`}
              />
            </div>

            {/* 中央: メッセージ */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                勝利！
              </h2>
              <p className="text-lg font-semibold text-gray-800">
                {isPlayer1 ? 'プレイヤー1 (黒)' : 'プレイヤー2 (白)'}
              </p>
            </div>

            {/* 右側: ボタン */}
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              再プレイ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
