"use client";

import { useState, useEffect } from "react";
import { SeasonInfo, HistoricalRound } from "@/types/historical";
import SeasonSelector from "./SeasonSelector";
import SeasonSummaryCard from "./SeasonSummaryCard";
import RoundSlider from "./RoundSlider";
import RoundMatchResults from "./RoundMatchResults";
import RoundStandingsTable from "./RoundStandingsTable";

interface HistoryViewProps {
  initialSeasons: SeasonInfo[];
  initialYear: number;
  initialRounds: HistoricalRound[];
}

export default function HistoryView({
  initialSeasons,
  initialYear,
  initialRounds,
}: HistoryViewProps) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [rounds, setRounds] = useState<HistoricalRound[]>(initialRounds);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedSeason = initialSeasons.find((s) => s.year === selectedYear) || initialSeasons[0];

  // 시즌 변경 시 비동기로 해당 연도의 라운드 데이터 로드
  useEffect(() => {
    if (selectedYear === initialYear && initialRounds.length > 0) {
      setRounds(initialRounds);
      setSelectedRound(1);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    fetch(`/api/history?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.rounds) {
          setRounds(data.rounds);
          setSelectedRound(1);
        }
      })
      .catch((err) => {
        console.error("Failed to load season rounds:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedYear, initialYear, initialRounds]);

  const currentRoundData = rounds.find((r) => r.round === selectedRound) || rounds[0];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. 상단 인트로 헤더 */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#0c1322] via-[#090d16] to-[#06080e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-bold text-blue-300 mb-3">
            <span>📚 K리그 공식 아카이브</span>
            <span className="text-white/40">·</span>
            <span>2004 ~ 2026 전 구단 기록실</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            인천 유나이티드 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">역대 성적 및 경기 기록실</span>
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            인천 유나이티드가 K리그에 첫발을 내디딘 <strong>2004 시즌부터 2026 현재까지</strong>, 
            23년간 펼쳐진 <strong>전 구단의 라운드별 경기 결과와 순위표 변동 추이</strong>를 실시간으로 탐색할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 2. 시즌 셀렉터 (2004 ~ 2026) */}
      <SeasonSelector
        seasons={initialSeasons}
        selectedYear={selectedYear}
        onSelectYear={(year) => setSelectedYear(year)}
      />

      {/* 3. 선택된 시즌 요약 카드 및 궤적 그래프 */}
      <SeasonSummaryCard season={selectedSeason} />

      {/* 4. 라운드 슬라이더 컨트롤러 */}
      <RoundSlider
        currentRound={selectedRound}
        totalRounds={selectedSeason.totalRounds}
        onSelectRound={(r) => setSelectedRound(r)}
      />

      {/* 5. 라운드별 경기 결과 및 순위표 (2열 와이드 그리드) */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-16 rounded-2xl bg-bg-surface border border-border">
          <span className="flex h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-3" />
          <p className="text-sm font-bold text-white">{selectedYear}시즌 라운드 데이터 불러오는 중...</p>
        </div>
      ) : currentRoundData ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 좌측: 인천 경기 하이라이트 & 전 구단 스코어보드 (7컬럼) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <RoundMatchResults roundData={currentRoundData} />
          </div>

          {/* 우측: 해당 라운드 종료 시점 순위표 (5컬럼) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <RoundStandingsTable
              standings={currentRoundData.standings}
              roundLabel={currentRoundData.roundLabel}
            />
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-text-muted rounded-2xl bg-bg-surface border border-border">
          해당 라운드의 경기 데이터가 존재하지 않습니다.
        </div>
      )}
    </div>
  );
}
