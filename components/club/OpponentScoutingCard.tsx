import type { OpponentScouting } from "@/lib/api/opponentScouting";
import { getOfficialSquadUrl } from "@/lib/api/teams";
import Badge from "../Badge";
import { snapshotLabel } from "@/lib/format";
import TeamEmblem from "./TeamEmblem";
import { translatePlayerName, translateInjuryStatus } from "@/lib/translation";

const RESULT_LABEL: Record<"W" | "D" | "L", string> = { W: "승", D: "무", L: "패" };
const RESULT_STYLE: Record<"W" | "D" | "L", string> = {
  W: "bg-brand text-white",
  D: "bg-border-light text-white",
  L: "bg-negative text-white",
};

// 다가오는 상대 스카우팅 정보 — 최근 폼(크롤 스냅샷) / 주요 선수 · 부상·결장(예시 데이터)
// 배지는 섹션마다 데이터 출처를 그대로 반영한다: 최근 폼은 "○○ 기준", 나머지는 "예시 데이터".
export default function OpponentScoutingCard({
  scouting,
  incheonScouting,
  formsUpdatedAt,
}: {
  scouting: OpponentScouting;
  incheonScouting: Pick<OpponentScouting, "keyPlayers" | "injuries" | "probableLineup">;
  formsUpdatedAt: string | null;
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <section id="opponent-form" className="scroll-mt-20 flex flex-col gap-4 bg-bg-surface p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-brand rounded-full" />
            <h2 className="text-lg font-bold">상대팀 최근 경기</h2>
          </div>
          <Badge text={snapshotLabel(formsUpdatedAt)} variant="neutral" />
        </div>
        {scouting.recentForm.length === 0 ? (
          <p className="text-text-muted">최근 경기 정보가 없습니다</p>
        ) : (
          <div className="flex gap-2 overflow-x-auto">
            {scouting.recentForm.map((entry) => (
              <a
                key={entry.date}
                href={entry.gameId ? `https://sports.daum.net/match/${entry.gameId}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-1 min-w-[64px] flex-col items-center gap-1 rounded-md bg-[#0E1116] border border-border-dim p-2 ${entry.gameId ? "hover:opacity-80 transition-opacity" : ""}`}
              >
                <span className="text-[10px] text-text-muted whitespace-nowrap">
                  {entry.date}
                </span>
                <span className="text-[10px] text-text-muted whitespace-nowrap">
                  {entry.round ? entry.round.replace("K리그1 ", "") : ""}
                </span>
                <span className={`mt-0.5 rounded px-1.5 py-0.5 text-[8px] font-bold ${entry.isHome ? "bg-border-light text-text-primary" : "bg-bg-interactive text-text-primary"}`}>
                  {entry.isHome ? "HOME" : "AWAY"}
                </span>
                <div className="mt-1 flex flex-col items-center gap-1">
                  <TeamEmblem teamName={entry.opponentFaced} size="sm" />
                  <span className="w-full truncate text-center text-[10px] font-medium text-text-muted">
                    {entry.opponentFaced}
                  </span>
                </div>
                <span className="mt-1 text-xs font-bold whitespace-nowrap">
                  {entry.score || "vs"}
                </span>
                <span
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${RESULT_STYLE[entry.result]}`}
                >
                  {RESULT_LABEL[entry.result]}
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      <section id="key-players" className="scroll-mt-20 flex flex-col gap-4 bg-bg-surface p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-border-light rounded-full" />
            <h2 className="text-lg font-bold">주요 선수</h2>
          </div>
          <Badge text="구단 공식 홈페이지" variant="neutral" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-brand">
              <TeamEmblem teamName="인천 유나이티드" size="sm" /> 인천 유나이티드
            </h3>
            <ul className="flex flex-col gap-2">
              {incheonScouting.keyPlayers.map((player) => (
                <li key={player.name} className="rounded-md bg-brand/10 border border-brand/20 px-4 py-3">
                  <p className="font-semibold">
                    <a
                      href={player.profileUrl || getOfficialSquadUrl("인천 유나이티드") || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-brand transition-colors"
                      title="선수 정보 보기"
                    >
                      {translatePlayerName(player.name)}
                    </a> <span className="text-text-muted">({player.position})</span>
                  </p>
                  <p className="text-sm text-text-secondary">{player.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-text-muted">
              <TeamEmblem teamName={scouting.opponent} size="sm" /> {scouting.opponent}
            </h3>
            <ul className="flex flex-col gap-2">
              {scouting.keyPlayers.map((player) => (
                <li key={player.name} className="rounded-md bg-[#0E1116] border border-border-dim px-4 py-3">
                  <p className="font-semibold">
                    <a
                      href={player.profileUrl || getOfficialSquadUrl(scouting.opponent) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-brand transition-colors"
                      title="선수 정보 보기"
                    >
                      {translatePlayerName(player.name)}
                    </a> <span className="text-text-muted">({player.position})</span>
                  </p>
                  <p className="text-sm text-text-secondary">{player.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="lineup" className="scroll-mt-20 flex flex-col gap-4 bg-bg-surface p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-brand rounded-full" />
            <h2 className="text-lg font-bold">라인업 (선발 명단)</h2>
          </div>
          <Badge 
            text={(incheonScouting.probableLineup && incheonScouting.probableLineup.length > 0) || (scouting.probableLineup && scouting.probableLineup.length > 0) ? "공식 발표" : "킥오프 60분 전 발표"} 
            variant="neutral" 
          />
        </div>
        
        {(incheonScouting.probableLineup && incheonScouting.probableLineup.length > 0) || (scouting.probableLineup && scouting.probableLineup.length > 0) ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 text-brand">
                <TeamEmblem teamName="인천 유나이티드" size="sm" /> 인천 유나이티드
              </h3>
              <ol className="flex flex-col gap-1.5 list-decimal list-inside text-sm">
                {(incheonScouting.probableLineup || []).map((player, idx) => (
                  <li key={`${player}-${idx}`} className="rounded bg-brand/10 border border-brand/20 px-3 py-1.5 text-text-primary">
                    <span className="font-medium">{player}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 text-text-muted">
                <TeamEmblem teamName={scouting.opponent} size="sm" /> {scouting.opponent}
              </h3>
              <ol className="flex flex-col gap-1.5 list-decimal list-inside text-sm">
                {(scouting.probableLineup || []).map((player, idx) => (
                  <li key={`${player}-${idx}`} className="rounded bg-[#0E1116] border border-border-dim px-3 py-1.5 text-text-primary">
                    <span className="font-medium">{player}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-[#0E1116] border border-border-dim p-4 flex flex-col items-center justify-center gap-1.5 text-center">
            <span className="text-2xl">📋</span>
            <p className="text-sm font-semibold text-text-primary">공식 선발 라인업 대기 중</p>
            <p className="text-xs text-text-muted max-w-md">
              K리그 규정에 따라 경기 시작 60~70분 전 경기 감독관 승인 후 양 팀 선발 11명 및 후보 명단이 공시됩니다.
            </p>
          </div>
        )}
      </section>

      <section id="injuries" className="scroll-mt-20 flex flex-col gap-4 bg-bg-surface p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-brand rounded-full" />
            <h2 className="text-lg font-bold">결장 및 징계 이슈</h2>
          </div>
          <Badge text="한국프로축구연맹 공식 공시" variant="neutral" />
        </div>
        
        {incheonScouting.injuries.length === 0 && scouting.injuries.length === 0 ? (
          <div className="rounded-xl bg-[#0E1116] border border-border-dim p-4 flex flex-col items-center justify-center gap-1.5 text-center">
            <span className="text-2xl">✅</span>
            <p className="text-sm font-bold text-white">공식 결장·출전 정지 징계 선수 없음</p>
            <p className="text-xs text-text-muted max-w-md">
              양 팀 모두 연맹 공식 징계(누적 경고·퇴장) 결장자가 없습니다. 양 팀 18인 공식 출전 명단은 경기 시작 60분 전 확정 발표됩니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 text-brand">
                <TeamEmblem teamName="인천 유나이티드" size="sm" /> 인천 유나이티드
              </h3>
              {incheonScouting.injuries.length === 0 ? (
                <div className="rounded-lg bg-brand/5 border border-brand/20 p-3 text-xs text-brand/80">
                  공식 출전 정지 선수 없음
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {incheonScouting.injuries.map((injury) => {
                    const translatedStatus = translateInjuryStatus(injury.status);
                    const isSuspension = translatedStatus.includes("정지") || translatedStatus.includes("징계");
                    return (
                      <li key={injury.name} className="rounded-md bg-brand/10 border border-brand/20 px-4 py-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold">
                            <a
                              href={getOfficialSquadUrl("인천 유나이티드") || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-brand transition-colors"
                              title="구단 공식 홈페이지 선수단 보기"
                            >
                              {translatePlayerName(injury.name)}
                            </a>
                          </p>
                          {isSuspension && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                              출전 정지
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {translatedStatus} · {isSuspension ? "대상 경기" : "복귀 예상"}: {injury.expectedReturn}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 text-text-muted">
                <TeamEmblem teamName={scouting.opponent} size="sm" /> {scouting.opponent}
              </h3>
              {scouting.injuries.length === 0 ? (
                <div className="rounded-lg bg-[#0E1116] border border-border-dim p-3 text-xs text-text-muted">
                  공식 출전 정지 선수 없음
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {scouting.injuries.map((injury) => {
                    const translatedStatus = translateInjuryStatus(injury.status);
                    const isSuspension = translatedStatus.includes("정지") || translatedStatus.includes("징계");
                    return (
                      <li key={injury.name} className="rounded-md bg-[#0E1116] border border-border-dim px-4 py-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold">
                            <a
                              href={getOfficialSquadUrl(scouting.opponent) || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-brand transition-colors"
                              title="구단 공식 홈페이지 선수단 보기"
                            >
                              {translatePlayerName(injury.name)}
                            </a>
                          </p>
                          {isSuspension && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                              출전 정지
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {translatedStatus} · {isSuspension ? "대상 경기" : "복귀 예상"}: {injury.expectedReturn}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
