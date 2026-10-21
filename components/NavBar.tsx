"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "구단 정보" },
  { href: "/songs", label: "응원가" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-dim/60 bg-[#080C14]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* 구단 엠블럼 심볼 & 타이틀 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-[#0A1120] border border-blue-400/40 shadow-sm shadow-blue-500/20 group-hover:border-blue-400 transition-colors">
            <span className="text-[11px] sm:text-xs font-black tracking-wider text-white">IUFC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
              인천 유나이티드 <span className="text-xs font-bold text-blue-400 hidden sm:inline">팬 플랫폼</span>
            </span>
            <span className="text-[10px] text-text-muted hidden md:inline">파랑검정의 열정을 하나로</span>
          </div>
        </Link>

        {/* 탭 내비게이션 */}
        <nav className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-full shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" 
                    : "text-text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 데스크톱 우측 퀵 액션 (예매 & 공식몰) */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://www.ticketlink.co.kr/sports/football/66#reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-400/30 text-xs font-bold text-blue-300 hover:bg-blue-500/25 transition-all shadow-sm"
          >
            <span>🎟️ 티켓 예매</span>
          </a>
          <a
            href="https://www.incheonutdmarket.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-text-muted hover:text-white hover:bg-white/10 transition-all"
          >
            <span>🛍️ 공식 MD샵</span>
          </a>
        </div>
      </div>
    </header>
  );
}
