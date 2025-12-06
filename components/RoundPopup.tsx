interface RoundPopupProps {
  targetNumber: number;
  onClose: () => void;
}

export default function RoundPopup({ targetNumber, onClose }: RoundPopupProps) {
  return (
    <div className="fixed top-4 right-4 z-50 animate-scale-in">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            🎯 新しいラウンド！
          </h2>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 mb-4">
            <div className="text-white text-sm mb-1">目標</div>
            <div className="text-6xl font-bold text-white mb-1">
              {targetNumber}
            </div>
            <div className="text-white text-lg">つ並べろ！</div>
          </div>
          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
