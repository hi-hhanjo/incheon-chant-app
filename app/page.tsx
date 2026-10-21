import { getRecentMatches, getUpcomingMatch, getMatchesUpdatedAt } from "@/lib/api/matches";
import {
  getUpcomingOpponentScouting,
  getOpponentFormsUpdatedAt,
  getIncheonScouting,
} from "@/lib/api/opponentScouting";
import { getHeadToHeadSummary, getHeadToHeadUpdatedAt } from "@/lib/api/headToHead";
import { getStandings, getStandingsUpdatedAt } from "@/lib/api/standings";
import { getMatchWeather } from "@/lib/api/weather";
import Layout from "@/components/Layout";
import Badge from "@/components/Badge";
import MatchResultCard from "@/components/club/MatchResultCard";
import RecentMatchesList from "@/components/club/RecentMatchesList";
import UpcomingMatchCard from "@/components/club/UpcomingMatchCard";
import MatchdayGuideCard from "@/components/club/MatchdayGuideCard";
import OpponentScoutingCard from "@/components/club/OpponentScoutingCard";
import HeadToHeadList from "@/components/club/HeadToHeadList";
import StandingsTable from "@/components/club/StandingsTable";
import FloatingNav from "@/components/club/FloatingNav";
import FloatingCheerFAB from "@/components/club/FloatingCheerFAB";
import DesktopSupportingWidget from "@/components/club/DesktopSupportingWidget";
import SourceNote from "@/components/SourceNote";
import { DAUM_SPORTS } from "@/lib/api/sources";
import { snapshotLabel } from "@/lib/format";

export const revalidate = 3600; // 1시간 단위 정적 재생성 (ISR)

// 구단 정보 메인 — 다가오는 매치 / 상대 전적 및 정보 / 최근 경기 결과 및 전적 / 전체 순위표
export default async function ClubHome() {
  // 1단계: 독립적인 쿼리들을 한 번에 병렬 실행하여 네트워크 워터폴 최소화
  const [
    recentMatches,
    upcomingMatch,
    updatedAt,
    incheonScouting,
    formsUpdatedAt,
    standings,
    standingsUpdatedAt,
    headToHeadUpdatedAt,
  ] = await Promise.all([
    getRecentMatches(5),
    getUpcomingMatch(),
    getMatchesUpdatedAt(),
    getIncheonScouting(),
    getOpponentFormsUpdatedAt(),
    getStandings(),
    getStandingsUpdatedAt(),
    getHeadToHeadUpdatedAt(),
  ]);

  const latestMatch = recentMatches[0];
  const remainingMatches = recentMatches.slice(1, 5);

  // 2단계: 다가오는 상대(upcomingMatch.opponent)에 의존하는 쿼리만 2차 병렬 실행
  const opponentName = upcomingMatch?.opponent ?? "미정";
  const [scouting, { matches: headToHead, summary: h2hSummary }, weather] = await Promise.all([
    getUpcomingOpponentScouting(opponentName),
    getHeadToHeadSummary(opponentName),
    upcomingMatch ? getMatchWeather(upcomingMatch.isHome, upcomingMatch.opponent) : Promise.resolve(null),
  ]);

  const navSections = [
    { id: "upcoming-match", label: "다가오는 매치" },
    { id: "matchday-guide", label: "직관 가이드" },
    { id: "head-to-head", label: "상대전적" },
    { id: "opponent-form", label: "상대팀 최근 경기" },
    { id: "key-players", label: "주요 선수" },
    { id: "lineup", label: "선발 라인업" },
    { id: "injuries", label: "부상 및 결장 이슈" },
    { id: "recent-matches", label: "최근 경기 결과" },
    { id: "standings", label: "K리그1 순위표" },
  ];

  return (
    <Layout wide={true}>
      <FloatingNav sections={navSections} />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">구단 매치데이 허브</h1>
          <Badge text={snapshotLabel(updatedAt)} variant="neutral" />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs text-text-muted">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>2026 K리그1 33R 매치 프리뷰 대시보드</span>
        </div>
      </div>

      {/* 모바일: 1열 순차 스택 / 데스크톱: 2열 와이드 대시보드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측 메인 매치/가이드/스카우팅 영역 (7컬럼 on lg, 8컬럼 on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
          <section id="upcoming-match" className="scroll-mt-20">
            {upcomingMatch ? (
              <UpcomingMatchCard match={upcomingMatch} h2hSummary={h2hSummary} />
            ) : (
              <div className="rounded-2xl bg-bg-surface p-5 text-text-muted">예정된 경기가 없습니다</div>
            )}
          </section>

          {upcomingMatch && (
            <MatchdayGuideCard match={upcomingMatch} weather={weather} />
          )}

          {upcomingMatch && (
            <>
              <section id="head-to-head" className="scroll-mt-20">
                <HeadToHeadList matches={headToHead} updatedAt={headToHeadUpdatedAt} />
              </section>

              <OpponentScoutingCard 
                scouting={scouting} 
                incheonScouting={incheonScouting} 
                formsUpdatedAt={formsUpdatedAt} 
              />
            </>
          )}

          {/* 모바일 전용 (lg 미만에서만 하단 노출) */}
          <section id="recent-matches" className="lg:hidden flex flex-col gap-4 bg-bg-surface p-5 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-brand rounded-full" />
              <h2 className="text-lg font-bold">최근 경기 결과 및 전적</h2>
            </div>
            {latestMatch ? (
              <div className="flex flex-col gap-4">
                <MatchResultCard match={latestMatch} />
                <RecentMatchesList matches={remainingMatches} />
              </div>
            ) : (
              <p className="text-text-muted">최근 경기 결과가 없습니다</p>
            )}
          </section>

          <section id="standings" className="lg:hidden flex flex-col gap-4 bg-bg-surface p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-border-light rounded-full" />
                <h2 className="text-lg font-bold">K리그1 순위표</h2>
              </div>
              <Badge text={snapshotLabel(standingsUpdatedAt)} variant="neutral" />
            </div>
            <StandingsTable standings={standings} />
          </section>
        </div>

        {/* 우측 사이드바 영역 (5컬럼 on lg, 4컬럼 on xl, 데스크톱 전용 sticky) */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-8 sticky top-20">
          {/* 1. K리그1 순위표 (데스크톱 상단 고정 노출) */}
          <section id="standings-desktop" className="flex flex-col gap-4 bg-bg-surface border border-border-dim/80 p-5 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between border-b border-border-dim pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-5 bg-blue-500 rounded-full" />
                <h2 className="text-base font-bold text-white tracking-tight">K리그1 순위표</h2>
              </div>
              <Badge text={snapshotLabel(standingsUpdatedAt)} variant="neutral" />
            </div>
            <StandingsTable standings={standings} />
          </section>

          {/* 2. 최근 경기 결과 및 전적 */}
          <section id="recent-matches-desktop" className="flex flex-col gap-4 bg-bg-surface border border-border-dim/80 p-5 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2.5 border-b border-border-dim pb-3">
              <div className="w-2 h-5 bg-brand rounded-full" />
              <h2 className="text-base font-bold text-white tracking-tight">최근 경기 결과 및 전적</h2>
            </div>
            {latestMatch ? (
              <div className="flex flex-col gap-4">
                <MatchResultCard match={latestMatch} />
                <RecentMatchesList matches={remainingMatches} />
              </div>
            ) : (
              <p className="text-text-muted">최근 경기 결과가 없습니다</p>
            )}
          </section>

          {/* 3. S석 직관 서포팅 세트리스트 퀵 위젯 */}
          <DesktopSupportingWidget />
        </div>
      </div>

      <SourceNote label="경기 데이터 출처" name={DAUM_SPORTS.name} url={DAUM_SPORTS.url} />
      <FloatingCheerFAB />
    </Layout>
  );
}
