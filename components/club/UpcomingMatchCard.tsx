import type { Match } from "@/lib/api/matches";
import type { HeadToHeadSummary } from "@/lib/api/headToHead";
import TeamEmblem from "./TeamEmblem";
import MatchCountdown from "./MatchCountdown";

function formatKickoff(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// 다가오는 매치 카드 — 정갈하고 가독성이 극대화된 프리미엄 히어로 카드
export default function UpcomingMatchCard({
  match,
  h2hSummary,
}: {
  match: Match;
  h2hSummary?: HeadToHeadSummary;
}) {
  const home = match.isHome ? "인천 유나이티드" : match.opponent;
  const away = match.isHome ? match.opponent : "인천 유나이티드";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B1324] border border-blue-500/25 p-5 sm:p-6 text-white shadow-xl">
      {/* 배경 네온 앰비언트 글로우 */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

      {/* 상단: 라운드 / 장소 / 홈·원정 배지 */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-blue-400" />
          <span className="font-bold text-xs sm:text-sm text-blue-200">
            {match.round}
          </span>
          <span className="text-xs text-white/30">|</span>
          <span className="text-xs text-white/70">{match.venue || "인천 축구 전용경기장"}</span>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${
            match.isHome
              ? "bg-blue-600/30 text-blue-300 border border-blue-400/30"
              : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
          }`}
        >
          {match.isHome ? "HOME" : "AWAY"}
        </span>
      </div>

      {/* 중앙: 대진 엠블럼 매치업 */}
      <div className="relative z-10 my-5 flex items-center justify-around">
        <div className="flex flex-1 flex-col items-center gap-2 text-center">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-black/40 border border-white/10 p-2 shadow-inner">
            <TeamEmblem teamName={home} size="lg" linked={false} />
          </div>
          <span className="text-sm sm:text-base font-bold text-white">
            {home}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center px-3">
          <span className="font-mono text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400">
            VS
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2 text-center">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-black/40 border border-white/10 p-2 shadow-inner">
            <TeamEmblem teamName={away} size="lg" linked={false} />
          </div>
          <span className="text-sm sm:text-base font-bold text-white">
            {away}
          </span>
        </div>
      </div>

      {/* 실시간 킥오프 카운트다운 타이머 */}
      <div className="relative z-10 my-3 rounded-xl bg-black/35 border border-white/10 p-3 shadow-inner">
        <MatchCountdown kickoffAt={match.kickoffAt} />
      </div>

      {/* 하단 정보 바: 킥오프 일시 & 역대 전적 & 바로가기 버튼 */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white text-sm">
            <span>📅</span>
            <span>{formatKickoff(match.kickoffAt)}</span>
          </div>
          {h2hSummary && (
            <span className="text-[11px] text-blue-300 font-medium">
              (상대전적: {h2hSummary.total.win}승 {h2hSummary.total.draw}무 {h2hSummary.total.loss}패)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href={`https://sports.daum.net/match/${match.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <span>전력분석 ↗</span>
          </a>

          {match.isHome && (
            <a
              href="https://www.ticketlink.co.kr/sports/football/66#reservation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-md shadow-blue-600/30"
            >
              <span>티켓 예매 ↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
