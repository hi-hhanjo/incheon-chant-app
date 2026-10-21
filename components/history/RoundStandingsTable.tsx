"use client";

import { StandingRow } from "@/types/historical";

interface RoundStandingsTableProps {
  standings: StandingRow[];
  roundLabel: string;
}

export default function RoundStandingsTable({
  standings,
  roundLabel,
}: RoundStandingsTableProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#121620]/90 border border-border/80 p-4 sm:p-5 shadow-lg">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 bg-blue-500 rounded-full" />
          <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
            {roundLabel} 종료 시점 리그 순위표
          </h3>
        </div>
        <span className="text-[11px] text-text-muted">실시간 승점 반영</span>
      </div>

      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-text-muted text-[11px] font-bold">
              <th className="py-2 px-2 text-center w-8">#</th>
              <th className="py-2 px-2">클럽</th>
              <th className="py-2 px-1 text-center w-8">경기</th>
              <th className="py-2 px-1 text-center w-7">승</th>
              <th className="py-2 px-1 text-center w-7">무</th>
              <th className="py-2 px-1 text-center w-7">패</th>
              <th className="py-2 px-1 text-center hidden sm:table-cell w-9">득</th>
              <th className="py-2 px-1 text-center hidden sm:table-cell w-9">실</th>
              <th className="py-2 px-1 text-center hidden sm:table-cell w-9">차</th>
              <th className="py-2 px-2 text-center w-10 text-blue-400 font-black">승점</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {standings.map((row) => {
              const isIncheon = row.team.includes("인천");
              return (
                <tr
                  key={row.team}
                  className={`transition-colors ${
                    isIncheon
                      ? "bg-blue-600/25 text-white font-extrabold border-l-4 border-l-blue-400"
                      : "hover:bg-white/[0.03] text-text-secondary"
                  }`}
                >
                  <td className="py-2 px-2 text-center font-bold">
                    <span
                      className={`inline-flex items-center justify-center h-5 w-5 rounded-md text-[11px] ${
                        row.rank === 1
                          ? "bg-amber-400 text-black font-black"
                          : row.rank <= 3
                          ? "bg-blue-500/20 text-blue-300 font-bold"
                          : "text-text-muted"
                      }`}
                    >
                      {row.rank}
                    </span>
                  </td>

                  <td className="py-2 px-2">
                    <span className={`truncate max-w-[120px] inline-block ${isIncheon ? "text-blue-300 font-black" : "text-white"}`}>
                      {row.team}
                    </span>
                  </td>

                  <td className="py-2 px-1 text-center font-mono text-text-muted">{row.played}</td>
                  <td className="py-2 px-1 text-center font-mono">{row.win}</td>
                  <td className="py-2 px-1 text-center font-mono text-text-muted">{row.draw}</td>
                  <td className="py-2 px-1 text-center font-mono text-text-muted">{row.lose}</td>
                  <td className="py-2 px-1 text-center font-mono hidden sm:table-cell text-emerald-400">{row.goalsFor}</td>
                  <td className="py-2 px-1 text-center font-mono hidden sm:table-cell text-red-400">{row.goalsAgainst}</td>
                  <td className="py-2 px-1 text-center font-mono hidden sm:table-cell text-text-muted">
                    {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                  </td>
                  <td className="py-2 px-2 text-center font-mono font-black text-white bg-white/[0.02]">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
