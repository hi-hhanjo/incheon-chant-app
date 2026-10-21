"use client";

import { useEffect } from "react";
import YoutubePlayer from "@/components/YoutubePlayer";
import { IncheonMatchDetail } from "@/types/historical";

interface MatchVideoModalProps {
  match: IncheonMatchDetail | null;
  roundLabel: string;
  onClose: () => void;
}

export default function MatchVideoModal({ match, roundLabel, onClose }: MatchVideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!match || !match.highlightVideo) return null;

  const video = match.highlightVideo;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-[#141a26] to-[#0a0e16] border border-blue-500/30 p-5 sm:p-7 shadow-2xl text-left overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="모달 닫기"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* 헤더 섹션 */}
        <div className="mb-4 pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-600/20 text-red-300 border border-red-500/30 flex items-center gap-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              {video.tag || "공식 하이라이트 영상"}
            </span>
            <span className="text-xs text-text-muted font-bold">
              인천 {roundLabel} · {match.date}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {video.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
            <span>🏟️ {match.venue}</span>
            <span>·</span>
            <span className="font-bold text-blue-400">
              인천 {match.score.incheon} : {match.score.opponent} {match.opponent}
            </span>
          </div>
        </div>

        {/* 내장 YouTube 플레이어 */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner">
          <YoutubePlayer youtubeId={video.youtubeId} title={video.title} />
        </div>

        {/* 모달 푸터 안내 */}
        <div className="flex items-center justify-between text-xs text-text-muted mt-4 pt-3 border-t border-white/5">
          <span className="flex items-center gap-1">
            <span>📺</span> YouTube HD 공식 스트리밍
          </span>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
              `${match.date.slice(0, 4)} K리그 인천 ${match.opponent} 풀경기 하이라이트`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors underline decoration-white/20"
          >
            관련 풀영상/하이라이트 더보기 ↗
          </a>
        </div>
      </div>
    </div>
  );
}
