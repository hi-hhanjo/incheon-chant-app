"use client";

import Link from "next/link";
import { Legend } from "@/types/legend";

interface LegendCardProps {
  legend: Legend;
  onSelect: (legend: Legend) => void;
}

export default function LegendCard({ legend, onSelect }: LegendCardProps) {
  const isManager = legend.position === "MGR";
  const isMemorial = legend.status === "MEMORIAL";
  const isActive = legend.status === "ACTIVE";

  // 포지션별 뱃지 스타일
  const positionBadgeMap: Record<string, { bg: string; text: string; label: string }> = {
    FW: { bg: "bg-red-500/20 text-red-300 border-red-500/30", text: "공격수", label: "FW" },
    MF: { bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", text: "미드필더", label: "MF" },
    DF: { bg: "bg-blue-500/20 text-blue-300 border-blue-500/30", text: "수비수", label: "DF" },
    GK: { bg: "bg-amber-500/20 text-amber-300 border-amber-500/30", text: "골키퍼", label: "GK" },
    MGR: { bg: "bg-purple-500/20 text-purple-300 border-purple-500/30", text: "사령탑", label: "MGR" },
  };

  const posBadge = positionBadgeMap[legend.position] || positionBadgeMap.FW;

  return (
    <article
      onClick={() => onSelect(legend)}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer p-5 flex flex-col justify-between ${
        isMemorial
          ? "border-amber-400/40 bg-gradient-to-b from-[#1c1813] to-[#12141a] hover:border-amber-400 shadow-lg shadow-amber-950/20"
          : "border-border/80 bg-gradient-to-b from-[#181d26] to-[#10131a] hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-900/20"
      }`}
    >
      {/* 배경 은은한 등번호 워터마크 */}
      <span className="absolute -right-2 -top-4 text-7xl font-black tracking-tighter text-white/[0.03] select-none group-hover:text-white/[0.06] transition-colors pointer-events-none">
        {legend.number ? (legend.number < 10 ? `0${legend.number}` : legend.number) : "★"}
      </span>

      {/* 상단 뱃지 라인 */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${posBadge.bg}`}>
            {posBadge.label} · {posBadge.text}
          </span>
          {legend.number && (
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[11px] font-extrabold">
              No.{legend.number}
            </span>
          )}
        </div>

        {/* 상태 라벨 */}
        {isMemorial ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
            🕊️ 영원한 영웅
          </span>
        ) : isActive ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
            현역 레전드
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
            명예의 전당
          </span>
        )}
      </div>

      {/* 선수 프로필 사진 + 이름 및 활동 기간 */}
      <div className="relative z-10 flex items-center gap-3.5 mb-3">
        {/* 원형/스퀘어 사진 액자 */}
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 via-blue-900 to-[#0a0e16] border border-blue-400/40 shadow-md shadow-blue-950/50 overflow-hidden group-hover:border-blue-400 group-hover:scale-105 transition-all">
          {legend.imageUrl ? (
            <img
              src={legend.imageUrl}
              alt={legend.name}
              className="h-full w-full object-cover relative z-10"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-xs font-black text-white/80 font-mono">
              {legend.number ? `#${legend.number}` : "IUFC"}
            </span>
          )}
        </div>

        {/* 이름, 영문, 기간 및 비디오 태그 */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight truncate">
              {legend.name}
            </h3>
            <span className="text-xs text-text-muted font-medium truncate">{legend.nameEn}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-text-secondary font-mono">{legend.period}</p>
            {legend.primeSeason && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {legend.primeSeason} 전성기
              </span>
            )}
          </div>
          {legend.video && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 mt-1">
              <span>🎬</span> {legend.video.label || "명장면 영상 수록"}
            </span>
          )}
        </div>
      </div>

      {/* 팬덤 대표 별명 & 명언 */}
      <div className="relative z-10 rounded-xl bg-black/40 border border-white/5 p-3 mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-sm">👑</span>
          <span className="text-xs font-black text-amber-300 tracking-tight">
            {legend.lore.nickname}
          </span>
        </div>
        <p className="text-xs text-text-muted line-clamp-2 italic leading-relaxed">
          &ldquo;{legend.lore.quote}&rdquo;
        </p>
      </div>

      {/* 객관적 스탯 요약 그리드 */}
      <div className="relative z-10 grid grid-cols-3 gap-2 py-2 border-y border-border/50 text-center mb-4 bg-white/[0.01] rounded-lg">
        <div>
          <span className="block text-[10px] text-text-muted">출장 / 지휘</span>
          <span className="text-sm font-extrabold text-white">
            {typeof legend.stats.appearances === "number" ? `${legend.stats.appearances}G` : legend.stats.appearances}
          </span>
        </div>

        <div>
          <span className="block text-[10px] text-text-muted">
            {isManager ? "상징 전술" : legend.position === "GK" ? "클린시트" : "골 (득점)"}
          </span>
          <span className="text-sm font-extrabold text-blue-400">
            {isManager
              ? "늑대축구"
              : legend.position === "GK"
              ? `${legend.stats.cleanSheets ?? 0}CS`
              : `${legend.stats.goals ?? 0}골`}
          </span>
        </div>

        <div>
          <span className="block text-[10px] text-text-muted">
            {isManager ? "기적 잔류" : legend.position === "GK" ? "선방 쇼" : "도움 (AS)"}
          </span>
          <span className="text-sm font-extrabold text-emerald-400">
            {isManager ? "신화" : legend.position === "GK" ? "수호신" : `${legend.stats.assists ?? 0}도움`}
          </span>
        </div>
      </div>

      {/* 대표 타이틀 한 줄 요약 */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary truncate">
          <span className="text-amber-400 text-[10px]">🏆</span>
          <span className="truncate font-medium">{legend.stats.titles[0]}</span>
        </div>
      </div>

      {/* 하단 액션 버튼 그룹 */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2">
        {legend.chantId ? (
          <Link
            href={`/songs`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/15 border border-blue-400/30 text-xs font-bold text-blue-300 hover:bg-blue-500/30 transition-colors"
            title="개인 응원가 제창 모드로 이동"
          >
            <span>📢 응원가</span>
          </Link>
        ) : (
          <span className="text-[11px] text-text-muted flex items-center gap-1">
            <span>🏷️</span> {legend.tags[0]}
          </span>
        )}

        <button
          type="button"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all group-hover:bg-blue-600"
        >
          <span>스토리 보기</span>
          <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </article>
  );
}
