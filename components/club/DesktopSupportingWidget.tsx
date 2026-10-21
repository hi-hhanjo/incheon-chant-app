"use client";

import Link from "next/link";

const CORE_CHANTS = [
  { id: 1, title: "새벽", tag: "대표곡 / 경기 시작" },
  { id: 3, title: "나의 사랑 나의 인천", tag: "대표곡 / 앤섬" },
  { id: 4, title: "승리의 함성", tag: "대표곡 / 승리 시" },
  { id: 5, title: "파랑검정", tag: "서포터즈 테마" },
];

export default function DesktopSupportingWidget() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#0B1324] to-[#0A0D14] border border-blue-500/20 p-5 shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            숭의아레나 S석 서포팅 세트리스트
          </h3>
        </div>
        <Link
          href="/songs"
          className="text-xs font-semibold text-blue-400 hover:text-white transition-colors"
        >
          전체보기 &gt;
        </Link>
      </div>

      <p className="text-xs text-text-muted leading-relaxed">
        경기장 S석에서 울려 퍼지는 인천 유나이티드 대표 응원가를 미리 듣고 가사를 확인하세요.
      </p>

      <div className="grid grid-cols-1 gap-2">
        {CORE_CHANTS.map((chant) => (
          <Link
            key={chant.id}
            href={`/songs/${chant.id}`}
            className="group flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 hover:bg-blue-900/20 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-xs font-bold text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                🎵
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                  {chant.title}
                </span>
                <span className="text-[10px] text-text-muted">
                  {chant.tag}
                </span>
              </div>
            </div>
            <span className="text-xs text-text-muted group-hover:text-white transition-colors">
              가사보기 →
            </span>
          </Link>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted">
        <span>🏟️ 인천 축구 전용경기장 S석</span>
        <a
          href="https://www.incheonutd.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          구단 공식 안내 ↗
        </a>
      </div>
    </div>
  );
}
