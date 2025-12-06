import { Difficulty } from '@/lib/types';

interface DifficultySelectProps {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelect({
  difficulty,
  onSelect,
}: DifficultySelectProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
        🤖 AI難易度
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelect('easy')}
          className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            difficulty === 'easy'
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          EASY
        </button>
        <button
          onClick={() => onSelect('normal')}
          className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            difficulty === 'normal'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          NORMAL
        </button>
      </div>
      <div className="mt-3 text-xs text-gray-600 text-center">
        {difficulty === 'easy' ? '勝ち/負け防止' : '評価関数ベース'}
      </div>
    </div>
  );
}
