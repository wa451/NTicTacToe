import { Player, GameStatus, WindowConfig } from '@/lib/types';

interface InfoPanelProps {
  currentPlayer: Player;
  window: WindowConfig;
  status: GameStatus;
  message: string;
  turnInRound: 1 | 2;
  onShowRules?: () => void;
}

export default function InfoPanel({
  currentPlayer,
  window,
  status,
  message,
  turnInRound,
  onShowRules,
}: InfoPanelProps) {
  const getPlayerName = (player: Player): string => {
    return player === 'player1' ? 'プレイヤー1 (黒)' : 'プレイヤー2 (白)';
  };

  return (
    <div className="space-y-3">
      {/* デスクトップ用レイアウト */}
      <div className="hidden lg:block">
        {/* ゲームタイトル */}
        <div className="text-center mb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            変則N目並べ
          </h1>
        </div>

        {/* 目標数 - 大きく表示 */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-4 text-center mb-3">
          <div className="text-white text-sm mb-1">目標</div>
          <div className="text-5xl md:text-6xl font-bold text-white">
            {window.x}
          </div>
          <div className="text-white text-lg mt-1">つ並べろ！</div>
        </div>

        {/* 現在の手番 */}
        {status === 'playing' && (
          <div className="bg-white rounded-lg shadow-md p-4 text-center mb-3">
            <div className="text-sm text-gray-600 mb-2">現在の手番</div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className={`w-8 h-8 rounded-full ${
                  currentPlayer === 'player1'
                    ? 'bg-gray-800'
                    : 'bg-white border-3 border-gray-800'
                }`}
              />
              <span className="text-xl font-semibold">
                {getPlayerName(currentPlayer)}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              ターン: {turnInRound}/2
            </div>
          </div>
        )}

        {/* ルール説明 - コンパクト */}
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700">
          <h3 className="font-semibold mb-2 text-gray-800">📖 ゲームルール</h3>
          
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-purple-600 mb-1">🎯 目的</h4>
              <p className="text-xs">
                10×10の盤面で、ランダムに決まる目標数(3〜10個)を先に並べたプレイヤーが勝利！
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-600 mb-1">🎮 遊び方</h4>
              <ul className="text-xs space-y-0.5 list-disc list-inside">
                <li>明るく表示されたエリア(ウィンドウ)内のみ石を置けます</li>
                <li>プレイヤー1(黒)とプレイヤー2(白)が交互に手を打ちます</li>
                <li>両プレイヤーが1手ずつ打つと、次のラウンドへ</li>
                <li>新ラウンドでは目標数とウィンドウがランダムに変わります</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-purple-600 mb-1">🏆 勝利条件</h4>
              <p className="text-xs">
                ウィンドウ内で、縦・横・斜めのいずれかに目標数の石を並べると勝利！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* スマホ用レイアウト（盤面の上に表示） */}
      <div className="lg:hidden">
        {/* ゲームタイトル + ルールアイコン */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <h1 className="text-xl font-bold text-gray-800">
            変則N目並べ
          </h1>
          {onShowRules && (
            <button
              onClick={onShowRules}
              className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 active:scale-95 transition-all"
              aria-label="ルール説明"
            >
              <span className="text-lg font-bold">?</span>
            </button>
          )}
        </div>

        {/* 目標と手番を横並び */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* 目標数 */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-3 text-center">
            <div className="text-white text-xs mb-1">目標</div>
            <div className="text-4xl font-bold text-white">
              {window.x}
            </div>
            <div className="text-white text-sm mt-1">つ並べ</div>
          </div>

          {/* 現在の手番 */}
          {status === 'playing' && (
            <div className="bg-white rounded-lg shadow-md p-3 text-center flex flex-col justify-center">
              <div className="text-xs text-gray-600 mb-1">手番</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <div
                  className={`w-6 h-6 rounded-full ${
                    currentPlayer === 'player1'
                      ? 'bg-gray-800'
                      : 'bg-white border-2 border-gray-800'
                  }`}
                />
              </div>
              <div className="text-xs font-semibold">
                {currentPlayer === 'player1' ? '黒' : '白'}
              </div>
              <div className="text-xs text-gray-500">
                {turnInRound}/2
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
