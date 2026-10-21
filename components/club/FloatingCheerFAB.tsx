"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingCheerFAB() {
  const [visible, setVisible] = useState(true);

  // 스크롤 시 부드러운 인터랙션
  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="S석 서포팅 퀵 모드" className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center">
      <Link
        href="/songs"
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-1.5 pr-4 text-white shadow-2xl shadow-blue-600/40 hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all border border-blue-400/40"
        title="S석 서포팅 응원가 제창 모드로 이동"
      >
        {/* 네온 펄스 글로우 링 */}
        <span className="absolute -inset-1 rounded-full bg-blue-500 opacity-40 blur group-hover:opacity-75 animate-pulse" />

        {/* 원형 아이콘 */}
        <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/50 border border-white/20 text-base shadow-inner">
          📢
        </span>

        {/* 텍스트 라벨 */}
        <div className="relative flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
            S-Stand
          </span>
          <span className="text-xs sm:text-sm font-black tracking-tight text-white whitespace-nowrap">
            응원가 제창 모드
          </span>
        </div>
      </Link>
    </aside>
  );
}
