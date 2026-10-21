"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Legend } from "@/types/legend";

interface LegendModalProps {
  legend: Legend | null;
  onClose: () => void;
}

export default function LegendModal({ legend, onClose }: LegendModalProps) {
  // ESC 키 닫기 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (legend) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // 배경 스크롤 방지
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [legend, onClose]);

  if (!legend) return null;

  const isMemorial = legend.status === "MEMORIAL";
  const isManager = legend.position === "MGR";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legend-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#121620] p-6 sm:p-8 shadow-2xl hide-scrollbar"
      >
        {/* 상단 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all text-sm font-bold"
        >
          ✕
        </button>

        {/* 헤더 섹션 */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600/30 text-blue-300 border border-blue-400/30">
              {legend.position}
            </span>
            {legend.number && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-white/10 text-white">
                No.{legend.number}
              </span>
            )}
            <span className="text-xs text-text-muted font-mono">{legend.period}</span>
          </div>

          <div className="flex items-baseline gap-3">
            <h2 id="legend-modal-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {legend.name}
            </h2>
            <span className="text-sm text-text-muted font-medium">{legend.nameEn}</span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-base">👑</span>
            <span className="text-sm font-black text-amber-300 tracking-tight">
              {legend.lore.nickname}
            </span>
          </div>
        </div>

        {/* 선수의 명언 배너 */}
        <div className={`p-4 rounded-2xl mb-6 border ${
          isMemorial
            ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
            : "bg-blue-950/30 border-blue-500/30 text-blue-100"
        }`}>
          <p className="text-sm sm:text-base font-semibold italic leading-relaxed text-center">
            &ldquo;{legend.lore.quote}&rdquo;
          </p>
        </div>

        {/* 1. 객관적 공식 기록 (스탯 & 주요 업적) */}
        <section className="mb-6 rounded-2xl bg-black/40 border border-white/5 p-4 sm:p-5">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-blue-400 mb-3 flex items-center gap-1.5">
            <span>📊</span> 객관적 경기 기록 및 공식 업적
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center py-3 bg-white/[0.02] rounded-xl mb-4 border border-white/5">
            <div>
              <span className="block text-[11px] text-text-muted mb-1">인천 출장/지휘</span>
              <span className="text-lg font-black text-white">
                {typeof legend.stats.appearances === "number" ? `${legend.stats.appearances}경기` : legend.stats.appearances}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-text-muted mb-1">
                {isManager ? "상징 전술" : legend.position === "GK" ? "클린시트 (무실점)" : "득점 (골)"}
              </span>
              <span className="text-lg font-black text-blue-400">
                {isManager
                  ? "늑대축구"
                  : legend.position === "GK"
                  ? `${legend.stats.cleanSheets ?? 0}경기`
                  : `${legend.stats.goals ?? 0}골`}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-text-muted mb-1">
                {isManager ? "대표 성과" : legend.position === "GK" ? "선방 쇼" : "도움 (어시스트)"}
              </span>
              <span className="text-lg font-black text-emerald-400">
                {isManager ? "준우승·잔류" : legend.position === "GK" ? "수호신" : `${legend.stats.assists ?? 0}도움`}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-bold text-text-secondary mb-1">주요 타이틀 및 훈장:</span>
            {legend.stats.titles.map((title, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-text-primary">
                <span className="text-amber-400">🏆</span>
                <span>{title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 커뮤니티 & SNS 팬덤 반응 (Lore) */}
        <section className="mb-6 rounded-2xl bg-black/40 border border-white/5 p-4 sm:p-5">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-amber-400 mb-3 flex items-center gap-1.5">
            <span>💬</span> 팬 커뮤니티 & SNS 반응 및 상징성
          </h3>

          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-400/20 text-xs font-semibold text-amber-200 leading-relaxed">
              {legend.lore.communitySentiment}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
            {legend.lore.story}
          </p>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="block text-[11px] font-bold text-blue-400 mb-1">✨ 팬들이 꼽는 역대 최고의 명장면</span>
            <p className="text-xs text-text-primary leading-relaxed font-medium">
              {legend.lore.signatureMoment}
            </p>
          </div>
        </section>

        {/* 하단 태그 및 찬트 바로가기 버튼 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/50">
          <div className="flex flex-wrap gap-1.5">
            {legend.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text-muted font-mono">
                #{tag}
              </span>
            ))}
          </div>

          {legend.chantId && (
            <Link
              href={`/songs`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-blue-600/30 transition-all"
            >
              <span>📢 {legend.name} 응원가 제창 모드로 이동</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
