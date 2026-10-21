"use client";

import { HistoricalRound } from "@/types/historical";

interface RoundMatchResultsProps {
  roundData: HistoricalRound;
}

export default function RoundMatchResults({ roundData }: RoundMatchResultsProps) {
  const { incheonMatch, allMatches, roundLabel } = roundData;

  const resultBadgeStyle = {
    WIN: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    DRAW: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    LOSE: "bg-red-500/20 text-red-300 border-red-500/40",
  }[incheonMatch.result];

  const resultText = {
    WIN: "승리 (WIN)",
    DRAW: "무승부 (DRAW)",
    LOSE: "패배 (LOSE)",
  }[incheonMatch.result];

  return (
    <div className="flex flex-col gap-4">
      {/* 1. 인천 유나이티드 경기 하이라이트 카드 */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-[#121826] to-[#0a0e16] p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <h4 className="text-xs sm:text-sm font-black text-white tracking-tight">
              인천 유나이티드 {roundLabel} 결과
            </h4>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${resultBadgeStyle}`}>
            {resultText}
          </span>
        </div>

        {/* 대형 스코어보드 */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 py-2">
          {/* 홈팀 */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs text-text-muted font-bold mb-1">
              {incheonMatch.isHome ? "HOME" : "AWAY"}
            </span>
            <span className={`text-base sm:text-xl font-black ${incheonMatch.isHome ? "text-blue-400" : "text-white"}`}>
              {incheonMatch.isHome ? "인천 유나이티드" : incheonMatch.opponent}
            </span>
          </div>

          {/* 중앙 스코어 */}
          <div className="flex items-center gap-3 bg-black/60 border border-white/10 px-4 sm:px-6 py-2 rounded-2xl shadow-inner">
            <span className="text-2xl sm:text-4xl font-black text-white font-mono">
              {incheonMatch.isHome ? incheonMatch.score.incheon : incheonMatch.score.opponent}
            </span>
            <span className="text-base sm:text-xl font-bold text-text-muted">:</span>
            <span className="text-2xl sm:text-4xl font-black text-white font-mono">
              {incheonMatch.isHome ? incheonMatch.score.opponent : incheonMatch.score.incheon}
            </span>
          </div>

          {/* 원정팀 */}
          <div className="flex-1 flex flex-col items-center sm:items-end text-center sm:text-right">
            <span className="text-xs text-text-muted font-bold mb-1">
              {!incheonMatch.isHome ? "HOME" : "AWAY"}
            </span>
            <span className={`text-base sm:text-xl font-black ${!incheonMatch.isHome ? "text-blue-400" : "text-white"}`}>
              {!incheonMatch.isHome ? "인천 유나이티드" : incheonMatch.opponent}
            </span>
          </div>
        </div>

        {/* 경기 정보 푸터 */}
        <div className="flex items-center justify-between text-xs text-text-muted mt-4 pt-3 border-t border-white/5">
          <span>📅 {incheonMatch.date}</span>
          <span>🏟️ {incheonMatch.venue}</span>
        </div>
      </div>

      {/* 2. 전 구단 해당 라운드 전체 경기 결과 */}
      <div className="flex flex-col gap-2 rounded-2xl bg-[#121620]/80 border border-border/80 p-4 sm:p-5">
        <h4 className="text-xs font-bold text-text-muted mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-white">
            <span>⚽</span> K리그 전 구단 {roundLabel} 스코어보드
          </span>
          <span className="text-[11px] text-text-muted font-normal">총 {allMatches.length}경기 진행</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allMatches.map((m, idx) => {
            const isIncheon = m.isIncheon;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                  isIncheon
                    ? "bg-blue-950/30 border-blue-500/40 font-bold"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                }`}
              >
                <span className={`truncate max-w-[100px] sm:max-w-[120px] ${m.homeTeam.includes("인천") ? "text-blue-400 font-black" : "text-text-primary"}`}>
                  {m.homeTeam}
                </span>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/40 font-mono font-black text-white">
                  <span>{m.homeScore}</span>
                  <span className="text-text-muted text-[10px]">:</span>
                  <span>{m.awayScore}</span>
                </div>

                <span className={`truncate max-w-[100px] sm:max-w-[120px] text-right ${m.awayTeam.includes("인천") ? "text-blue-400 font-black" : "text-text-primary"}`}>
                  {m.awayTeam}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
