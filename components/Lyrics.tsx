"use client";

import { useState } from "react";

// docs/design/components/lyrics.md — 가사 표시: 큰 글자·넓은 행간, S석 직관 모드(점보 텍스트) 토글 지원
export default function Lyrics({ text }: { text: string }) {
  const [isJumbo, setIsJumbo] = useState(false);

  return (
    <div
      className={`rounded-xl transition-all duration-200 ${
        isJumbo
          ? "bg-[#0b101b] border-2 border-brand/50 p-6 shadow-lg shadow-brand/10"
          : "bg-border-light px-5 py-6"
      }`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <span className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <span>🔵⚫</span>
          <span>{isJumbo ? "S석 직관 가사 모드 ON" : "응원가 가사"}</span>
        </span>
        <button
          type="button"
          onClick={() => setIsJumbo(!isJumbo)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isJumbo
              ? "bg-brand text-white shadow-sm"
              : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
          }`}
          aria-pressed={isJumbo}
        >
          <span>{isJumbo ? "🔍 기본 글씨" : "📢 직관 모드 (크게)"}</span>
        </button>
      </div>

      <p
        className={`whitespace-pre-line text-center transition-all ${
          isJumbo
            ? "text-[23px] sm:text-[26px] font-bold leading-[2.2] tracking-wide text-white drop-shadow"
            : "text-[17px] leading-[1.75] text-white"
        }`}
      >
        {text}
      </p>

      {isJumbo && (
        <p className="mt-6 text-center text-xs text-brand/80 font-medium">
          경기장에서 함께 뛰며 목청껏 외쳐주세요! 파랑검정 우리 인천!
        </p>
      )}
    </div>
  );
}
