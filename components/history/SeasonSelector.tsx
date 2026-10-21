"use client";

import { SeasonInfo } from "@/types/historical";

interface SeasonSelectorProps {
  seasons: SeasonInfo[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export default function SeasonSelector({
  seasons,
  selectedYear,
  onSelectYear,
}: SeasonSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-text-muted px-1">
        <span className="font-bold flex items-center gap-1.5 text-white">
          <span>📅</span> 시즌 선택 (2004 ~ 2026)
        </span>
        <div className="flex items-center gap-2">
          <select
            id="season-dropdown-select"
            value={selectedYear}
            onChange={(e) => onSelectYear(Number(e.target.value))}
            className="rounded-lg bg-black/60 border border-white/10 px-2 py-1 text-xs font-bold text-blue-300 focus:outline-none focus:border-blue-500"
          >
            {seasons.map((s) => (
              <option key={s.year} value={s.year}>
                {s.year}시즌 ({s.incheonRank === 2 ? "준우승" : `${s.incheonRank}위`})
              </option>
            ))}
          </select>
          <span className="text-[11px] text-text-muted hidden sm:inline">총 23개 시즌</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 pt-1">
        {seasons.map((s) => {
          const isSelected = s.year === selectedYear;
          return (
            <button
              key={s.year}
              id={`season-pill-${s.year}`}
              type="button"
              onClick={() => onSelectYear(s.year)}
              className={`group relative flex flex-col items-center justify-center min-w-[76px] sm:min-w-[84px] py-2 px-2.5 rounded-2xl border transition-all shrink-0 ${
                isSelected
                  ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-105 z-10"
                  : "bg-[#141822]/90 border-border/80 text-text-secondary hover:text-white hover:border-blue-500/50 hover:bg-[#1a202d]"
              }`}
            >
              <span className="text-xs sm:text-sm font-black tracking-tight">{s.year}</span>
              <span className={`text-[10px] mt-0.5 font-bold ${
                isSelected ? "text-blue-100" : "text-text-muted group-hover:text-text-secondary"
              }`}>
                {s.incheonRank === 2 ? "🏆 준우승" : s.incheonRank === 4 ? "⭐ 4위(ACL)" : `${s.incheonRank}위`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
