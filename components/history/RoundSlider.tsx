"use client";

interface RoundSliderProps {
  currentRound: number;
  totalRounds: number;
  onSelectRound: (round: number) => void;
}

export default function RoundSlider({
  currentRound,
  totalRounds,
  onSelectRound,
}: RoundSliderProps) {
  const handlePrev = () => {
    if (currentRound > 1) onSelectRound(currentRound - 1);
  };

  const handleNext = () => {
    if (currentRound < totalRounds) onSelectRound(currentRound + 1);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#141822]/90 border border-border/80 p-4 sm:p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🎯</span>
          <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
            라운드 탐색기
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white shadow-sm shadow-blue-600/30">
            {currentRound}R
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentRound <= 1}
            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            ◀ 이전
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentRound >= totalRounds}
            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            다음 ▶
          </button>
        </div>
      </div>

      {/* 슬라이더 컨트롤 */}
      <div className="flex flex-col gap-1.5">
        <input
          type="range"
          min={1}
          max={totalRounds}
          value={currentRound}
          onChange={(e) => onSelectRound(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-white/10"
        />
        <div className="flex justify-between text-[11px] text-text-muted font-mono">
          <button type="button" onClick={() => onSelectRound(1)} className="hover:text-blue-400">1R (개막전)</button>
          <button type="button" onClick={() => onSelectRound(Math.round(totalRounds / 2))} className="hover:text-blue-400">
            {Math.round(totalRounds / 2)}R (반환점)
          </button>
          <button type="button" onClick={() => onSelectRound(totalRounds)} className="hover:text-blue-400">
            {totalRounds}R (최종전)
          </button>
        </div>
      </div>
    </div>
  );
}
