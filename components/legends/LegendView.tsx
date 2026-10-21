"use client";

import { useState, useMemo, useEffect } from "react";
import { Legend, LegendPosition, LegendEra } from "@/types/legend";
import LegendCard from "./LegendCard";
import LegendModal from "./LegendModal";

interface LegendViewProps {
  initialLegends: Legend[];
}

export default function LegendView({ initialLegends }: LegendViewProps) {
  const [selectedPosition, setSelectedPosition] = useState<LegendPosition | "ALL">("ALL");
  const [selectedEra, setSelectedEra] = useState<LegendEra | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLegend, setActiveLegend] = useState<Legend | null>(null);

  // URL 쿼리에 ?highlight=... 파라미터가 있을 경우 자동 모달 오픈
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const highlightId = params.get("highlight");
        if (highlightId) {
          const found = initialLegends.find((l) => l.id === highlightId);
          if (found) {
            setActiveLegend(found);
          }
        }
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [initialLegends]);

  const positionFilters: { key: LegendPosition | "ALL"; label: string }[] = [
    { key: "ALL", label: "전체" },
    { key: "FW", label: "공격수 (FW)" },
    { key: "MF", label: "미드필더 (MF)" },
    { key: "DF", label: "수비수 (DF)" },
    { key: "GK", label: "골키퍼 (GK)" },
    { key: "MGR", label: "사령탑 (감독)" },
  ];

  const eraFilters: { key: LegendEra | "ALL"; label: string }[] = [
    { key: "ALL", label: "전체 시대" },
    { key: "FOUNDATION", label: "창단 & 늑대축구 (2004~2011)" },
    { key: "SUNGUI_STABILITY", label: "숭의 개장 & 잔류 신화 (2012~2020)" },
    { key: "ACL_MODERN", label: "ACL 개척 & 현대 (2021~)" },
  ];

  const filteredLegends = useMemo(() => {
    return initialLegends.filter((l) => {
      if (selectedPosition !== "ALL" && l.position !== selectedPosition) return false;
      if (selectedEra !== "ALL" && l.era !== selectedEra) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = l.name.toLowerCase().includes(q);
        const matchEn = l.nameEn.toLowerCase().includes(q);
        const matchNick = l.lore.nickname.toLowerCase().includes(q);
        const matchTags = l.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchEn && !matchNick && !matchTags) return false;
      }
      return true;
    });
  }, [initialLegends, selectedPosition, selectedEra, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      {/* 1. 상단 히어로 인트로 배너 */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#0c1322] via-[#090d16] to-[#06080e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute right-6 top-6 hidden md:block opacity-10 text-9xl font-black text-white select-none pointer-events-none">
          IUFC
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-bold text-blue-300 mb-3">
            <span>⭐ 파랑검정 명예의 전당</span>
            <span className="text-white/40">·</span>
            <span>2004 ~ 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            인천 유나이티드 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">레전드 아카이브</span>
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            2003년 창단 이래 K리그 역사의 한 페이지를 장식한 인천의 상징들입니다. 
            <strong> 객관적인 경기 기록과 수상 실적</strong>뿐만 아니라, 
            <strong> 서포터즈와 축구 커뮤니티에서 사랑받은 별명·스토리·명장면</strong>을 한자리에서 확인하세요.
          </p>

          {/* 주요 카운터 지표 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div>
              <span className="block text-[11px] text-text-muted">등재 레전드</span>
              <span className="text-lg sm:text-xl font-black text-white">{initialLegends.length}인</span>
            </div>
            <div>
              <span className="block text-[11px] text-text-muted">창단 연도</span>
              <span className="text-lg sm:text-xl font-black text-blue-400">2003년 12월</span>
            </div>
            <div>
              <span className="block text-[11px] text-text-muted">역대 최다 득점</span>
              <span className="text-lg sm:text-xl font-black text-amber-300">무고사 (88골+)</span>
            </div>
            <div>
              <span className="block text-[11px] text-text-muted">역대 최고 성적</span>
              <span className="text-lg sm:text-xl font-black text-emerald-400">2005 준우승 · ACL</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 인터랙티브 필터 컨트롤러 */}
      <div className="flex flex-col gap-4 rounded-2xl bg-[#121620]/90 border border-border/80 p-4 sm:p-5 backdrop-blur-md">
        {/* 검색창 */}
        <div className="relative">
          <input
            type="text"
            placeholder="선수 이름, 별명(인천의 왕, 하프스타, 시우타임 등) 또는 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-text-muted focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <span className="absolute left-3.5 top-2.5 text-text-muted text-sm">🔍</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-2.5 text-xs text-text-muted hover:text-white"
            >
              지우기
            </button>
          )}
        </div>

        {/* 포지션 탭 필터 (가로 스크롤 가능) */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
          <span className="text-xs font-bold text-text-muted shrink-0 mr-1 hidden sm:inline">포지션:</span>
          {positionFilters.map((pos) => {
            const active = selectedPosition === pos.key;
            return (
              <button
                key={pos.key}
                type="button"
                onClick={() => setSelectedPosition(pos.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-white/5 text-text-secondary hover:text-white hover:bg-white/10"
                }`}
              >
                {pos.label}
              </button>
            );
          })}
        </div>

        {/* 시대별 탭 필터 */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-1 border-t border-white/5">
          <span className="text-xs font-bold text-text-muted shrink-0 mr-1 hidden sm:inline">시대:</span>
          {eraFilters.map((era) => {
            const active = selectedEra === era.key;
            return (
              <button
                key={era.key}
                type="button"
                onClick={() => setSelectedEra(era.key)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-transparent text-text-muted hover:text-white"
                }`}
              >
                {era.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 검색 결과 수 및 정렬 */}
      <div className="flex items-center justify-between text-xs text-text-muted px-1">
        <span>총 <strong className="text-white font-bold">{filteredLegends.length}</strong>명의 레전드가 표시 중입니다.</span>
        <span>카드를 클릭하면 상세 비하인드 스토리와 명장면을 확인할 수 있습니다.</span>
      </div>

      {/* 4. 레전드 카드 그리드 (반응형 1열 / 2열 / 3열) */}
      {filteredLegends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLegends.map((legend) => (
            <LegendCard
              key={legend.id}
              legend={legend}
              onSelect={(l) => setActiveLegend(l)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-bg-surface border border-border">
          <span className="text-3xl mb-2">🔍</span>
          <p className="text-sm font-bold text-white mb-1">검색 조건에 일치하는 레전드가 없습니다</p>
          <p className="text-xs text-text-muted">선수명, 별칭 또는 필터 조건을 변경해 보세요.</p>
        </div>
      )}

      {/* 5. 상세 스토리 모달 */}
      <LegendModal
        legend={activeLegend}
        onClose={() => setActiveLegend(null)}
      />
    </div>
  );
}
