"use client";

import { useState } from "react";
import { HistoricalRound } from "@/types/historical";
import MatchVideoModal from "@/components/history/MatchVideoModal";

interface RoundMatchResultsProps {
  roundData: HistoricalRound;
}

export default function RoundMatchResults({ roundData }: RoundMatchResultsProps) {
  const { incheonMatch, allMatches, roundLabel } = roundData;
  const [showVideoModal, setShowVideoModal] = useState(false);

  const hasCuratedVideo = !!incheonMatch.highlightVideo;

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

        {/* 경기 정보 푸터 & YouTube 하이라이트 연동 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-muted mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span>📅 {incheonMatch.date}</span>
            <span>🏟️ {incheonMatch.venue}</span>
          </div>

          <div className="flex items-center gap-2">
            {hasCuratedVideo ? (
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-950/50 transition-all hover:scale-105"
                title="인앱 플레이어로 공식 명장면 하이라이트 시청"
              >
                <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
                <span>🎬 공식 명장면 영상 보기 (HD)</span>
              </button>
            ) : null}

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                `${incheonMatch.date.slice(0, 4)} K리그 인천 ${incheonMatch.opponent} 하이라이트`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 ${
                hasCuratedVideo
                  ? "bg-white/5 hover:bg-white/10 text-text-muted border border-white/10"
                  : "bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30"
              }`}
              title="YouTube에서 풀영상/하이라이트 검색"
            >
              <span className="text-red-400">▶</span>
              <span>{hasCuratedVideo ? "YouTube 검색" : "공식 하이라이트 시청"}</span>
              <span className="text-[10px] text-red-400">↗</span>
            </a>
          </div>
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

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/40 font-mono font-black text-white">
                    <span>{m.homeScore}</span>
                    <span className="text-text-muted text-[10px]">:</span>
                    <span>{m.awayScore}</span>
                  </div>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      `${roundData.incheonMatch.date.slice(0, 4)} K리그 ${m.homeTeam} ${m.awayTeam} 하이라이트`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-red-400 transition-colors p-1"
                    title={`${m.homeTeam} vs ${m.awayTeam} 하이라이트 검색`}
                  >
                    ▶
                  </a>
                </div>

                <span className={`truncate max-w-[100px] sm:max-w-[120px] text-right ${m.awayTeam.includes("인천") ? "text-blue-400 font-black" : "text-text-primary"}`}>
                  {m.awayTeam}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 인앱 공식 하이라이트 영상 모달 */}
      {showVideoModal && (
        <MatchVideoModal
          match={incheonMatch}
          roundLabel={roundLabel}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </div>
  );
}
