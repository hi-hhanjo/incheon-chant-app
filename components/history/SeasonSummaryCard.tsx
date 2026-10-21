"use client";

import Link from "next/link";
import { SeasonInfo } from "@/types/historical";

interface SeasonSummaryCardProps {
  season: SeasonInfo;
}

const legendNameMap: Record<string, string> = {
  "mugosa": "무고사",
  "lim-joong-yong": "임중용",
  "kim-do-hyuk": "김도혁",
  "yoo-byung-soo": "유병수",
  "song-si-woo": "송시우",
  "kim-yi-sub": "김이섭",
  "radoncic": "라돈치치",
  "nam-joon-jae": "남준재",
  "jeon-jae-ho": "전재호",
  "lee-tae-hee": "이태희",
  "lee-myung-joo": "이명주",
  "chang-woe-ryong": "장외룡",
  "yoo-sang-chul": "故 유상철",
  "moon-seon-min": "문선민",
  "elias-aguilar": "아길라르",
};

export default function SeasonSummaryCard({ season }: SeasonSummaryCardProps) {
  const trajectory = season?.trajectory || [];
  const totalTeams = season?.totalTeams || 12;

  // SVG 차트 좌표 계산 (1위가 상단, N위가 하단)
  const chartWidth = 500;
  const chartHeight = 80;
  const paddingX = 15;
  const paddingY = 10;

  const points = trajectory.map((rank, idx) => {
    const x = paddingX + (idx / Math.max(trajectory.length - 1, 1)) * (chartWidth - paddingX * 2);
    // 1위 = 0, totalTeams위 = 1
    const normalizedY = (rank - 1) / Math.max(totalTeams - 1, 1);
    const y = paddingY + normalizedY * (chartHeight - paddingY * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-[#121722] via-[#0d111a] to-[#080b12] p-5 sm:p-7 shadow-xl">
      {/* 배경 장식 */}
      <div className="absolute -right-8 -top-8 text-8xl font-black text-white/[0.03] select-none pointer-events-none">
        {season.year}
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        {/* 헤더 행 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {season.incheonDivision}
              </span>
              {season.isOngoing || season.year === 2026 ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 animate-pulse">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>LIVE 시즌 진행 중</span>
                </span>
              ) : null}
              <span className="text-xs text-text-muted font-mono">{season.totalTeams}개 구단 · {season.totalRounds}라운드</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {season.name}
            </h2>
          </div>

          {/* 최종/현재 순위 배지 */}
          <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 px-4 py-2 rounded-2xl self-start sm:self-auto">
            <span className="text-sm font-bold text-text-muted">
              {season.isOngoing || season.year === 2026 ? "현재 순위" : "시즌 최종 순위"}
            </span>
            <span className={`text-lg sm:text-xl font-black ${
              season.isOngoing || season.year === 2026
                ? "text-blue-400"
                : season.incheonRank === 1
                ? "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                : season.incheonRank === 2
                ? "text-amber-300"
                : season.incheonRank === 4
                ? "text-blue-300"
                : "text-white"
            }`}>
              {season.isOngoing || season.year === 2026
                ? `현재 ${season.incheonRank}위 (진행 중)`
                : season.incheonRank === 1
                ? "🏆 K리그2 우승 (승격)"
                : season.incheonRank === 2
                ? "🏆 준우승"
                : season.incheonRank === 4
                ? "⭐ 4위 (ACL 진출)"
                : `${season.incheonRank}위`}
            </span>
          </div>
        </div>

        {/* 인천 성적 요약 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/30 border border-white/5 p-4 rounded-2xl text-center">
          <div>
            <span className="block text-[11px] text-text-muted mb-0.5">전적 (승/무/패)</span>
            <span className="text-sm sm:text-base font-extrabold text-white">
              {season.record.win}승 {season.record.draw}무 {season.record.lose}패
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-text-muted mb-0.5">승점</span>
            <span className="text-sm sm:text-base font-black text-blue-400">
              {season.record.points}점
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-text-muted mb-0.5">득점 / 실점 (득실차)</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400">
              {season.record.goalsFor}득 / {season.record.goalsAgainst}실 ({season.record.goalDiff > 0 ? `+${season.record.goalDiff}` : season.record.goalDiff})
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-text-muted mb-0.5">팀내 최다 득점</span>
            <span className="text-sm sm:text-base font-extrabold text-amber-300 truncate block">
              {season.topScorer}
            </span>
          </div>
        </div>

        {/* 감독, 경기장 및 핵심 하이라이트 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-secondary bg-white/[0.02] p-3 rounded-xl border border-white/5">
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>👔 사령탑:</strong> {season.manager}</span>
            <span><strong>🏟️ 홈구장:</strong> {season.stadium}</span>
          </div>
          <div className="text-amber-300 font-medium truncate max-w-md">
            ✨ {season.keyMoment}
          </div>
        </div>

        {/* 해당 시즌을 빛낸 레전드 영웅들 바로가기 */}
        {season.featuredLegends && season.featuredLegends.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs">
            <span className="font-extrabold text-blue-400 flex items-center gap-1 shrink-0">
              <span>👑</span> {season.year} 시즌의 레전드:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {season.featuredLegends.map((lid) => {
                const name = legendNameMap[lid] || lid;
                return (
                  <Link
                    key={lid}
                    href={`/legends?highlight=${lid}`}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-blue-600/40 text-white font-bold transition-all border border-white/10 hover:border-blue-400/50 hover:scale-105"
                    title={`${name} 레전드 명예의 전당 보기`}
                  >
                    <span>{name}</span>
                    <span className="text-[10px] text-blue-300">↗</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 라운드별 순위 변동 궤적 차트 (Rank Trajectory Graph) */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-text-muted mb-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>📈</span> 시즌 라운드별 순위 변동 추이 (1R ~ {season.totalRounds}R)
            </span>
            <span className="text-[11px]">상단: 1위 / 하단: {season.totalTeams}위</span>
          </div>

          <div className="relative w-full rounded-2xl bg-black/40 border border-white/5 p-3 overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-20 overflow-visible"
            >
              {/* 그리드 가이드라인 */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

              {/* 순위 곡선 */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {/* 시작점 & 끝점 서클 */}
              {trajectory.length > 0 && (
                <>
                  <circle
                    cx={paddingX}
                    cy={paddingY + ((trajectory[0] - 1) / Math.max(totalTeams - 1, 1)) * (chartHeight - paddingY * 2)}
                    r="4"
                    fill="#60a5fa"
                  />
                  <circle
                    cx={chartWidth - paddingX}
                    cy={paddingY + ((trajectory[trajectory.length - 1] - 1) / Math.max(totalTeams - 1, 1)) * (chartHeight - paddingY * 2)}
                    r="5"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
