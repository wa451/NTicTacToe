interface RulesModalProps {
  onClose: () => void;
}

export default function RulesModal({ onClose }: RulesModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📖 ゲームルール</h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg text-purple-600 mb-2">🎯 目的</h3>
            <p className="text-sm">
              10×10の盤面で、ランダムに決まる目標数(3〜10個)を先に並べたプレイヤーが勝利！
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-purple-600 mb-2">🎮 遊び方</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>明るく表示されたエリア(ウィンドウ)内のみ石を置けます</li>
              <li>プレイヤー1(黒)とプレイヤー2(白)が交互に手を打ちます</li>
              <li>両プレイヤーが1手ずつ打つと、次のラウンドへ</li>
              <li>新ラウンドでは目標数とウィンドウがランダムに変わります</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-purple-600 mb-2">🏆 勝利条件</h3>
            <p className="text-sm">
              ウィンドウ内で、縦・横・斜めのいずれかに目標数の石を並べると勝利！
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-200"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
