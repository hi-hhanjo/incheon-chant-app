"use client";

import { useState, useMemo } from "react";
import { PLAYER_CATEGORY, UNUSED_TAG, type Song } from "@/lib/api/songs.schema";
import { findLyricLine, matchesSong, normalizeKeyword } from "@/lib/search";
import { useFavorites } from "@/lib/favorites";
import SongCard from "./SongCard";
import SearchBar from "./SearchBar";
import LyricsSnippet from "./LyricsSnippet";
import Feedback from "./Feedback";

// 제목 비교는 항상 한국어 로케일로 한다 — 코드포인트 순서로 정렬하면 영어 제목이 한글보다
// 앞서 버린다("Bandiera" < "회상"). localeCompare(ko)는 한글 → 영어 순으로 놓는다.
const byTitle = (a: Song, b: Song) => a.title.localeCompare(b.title, "ko");

// 정렬 그룹: 팀 응원가(0) → 선수 응원가·현역(1) → 미사용(2). 묶음 안에서는 제목 가나다순.
// 미사용 곡(팀을 떠난 선수의 응원가)이 맨 아래인 이유는, 신규팬이 지금 불리지 않는 곡을
// 목록 상단에서 먼저 만나지 않게 하기 위함이다(PRD 핵심 타겟).
function groupOf(song: Song): number {
  if (song.tags.includes(UNUSED_TAG)) return 2;
  return song.category === PLAYER_CATEGORY ? 1 : 0;
}

type TabType = "all" | "featured" | "favorites";

// F-01 목록 화면: 검색 및 세트리스트(즐겨찾기) 탭 상태를 들고 있는 클라이언트 컴포넌트
export default function SongList({ songs }: { songs: Song[] }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { favoriteIds } = useFavorites();

  // 공백만 친 경우는 검색하지 않은 것과 같게 다룬다.
  const keyword = normalizeKeyword(query);

  const featuredCount = useMemo(
    () => songs.filter((s) => s.tags.includes("대표곡")).length,
    [songs]
  );

  // 1. 탭 필터링 (전체 / 대표곡 / 내 세트리스트)
  const tabFilteredSongs = useMemo(() => {
    if (activeTab === "featured") {
      return songs.filter((s) => s.tags.includes("대표곡"));
    }
    if (activeTab === "favorites") {
      return songs.filter((s) => favoriteIds.includes(s.id));
    }
    return songs;
  }, [songs, activeTab, favoriteIds]);

  // 2. 검색어 필터링 및 정렬 메모이제이션
  const sortedSongs = useMemo(() => {
    const visible = keyword
      ? tabFilteredSongs.filter((song) => matchesSong(song, keyword))
      : tabFilteredSongs;

    return [...visible].sort(
      (a, b) => groupOf(a) - groupOf(b) || byTitle(a, b)
    );
  }, [tabFilteredSongs, keyword]);

  return (
    <div className="flex flex-col gap-4">
      {/* 검색창 */}
      <SearchBar query={query} onChange={setQuery} />

      {/* 매치데이 세트리스트 & 빠른 필터 탭 바 */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-sm font-semibold scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors whitespace-nowrap min-h-[38px] ${
            activeTab === "all"
              ? "bg-brand text-white shadow-sm"
              : "bg-bg-interactive text-text-secondary hover:text-white"
          }`}
        >
          <span>전체</span>
          <span className="rounded-full bg-black/20 px-1.5 py-0.5 text-xs">
            {songs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("featured")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors whitespace-nowrap min-h-[38px] ${
            activeTab === "featured"
              ? "bg-brand text-white shadow-sm"
              : "bg-bg-interactive text-text-secondary hover:text-white"
          }`}
        >
          <span>⭐ 대표곡</span>
          <span className="rounded-full bg-black/20 px-1.5 py-0.5 text-xs">
            {featuredCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors whitespace-nowrap min-h-[38px] ${
            activeTab === "favorites"
              ? "bg-brand text-white shadow-sm"
              : "bg-bg-interactive text-text-secondary hover:text-white"
          }`}
        >
          <span>💙 내 세트리스트</span>
          <span className="rounded-full bg-black/20 px-1.5 py-0.5 text-xs">
            {favoriteIds.length}
          </span>
        </button>
      </div>

      {/* 목록 또는 빈 상태 안내 */}
      {activeTab === "favorites" && favoriteIds.length === 0 ? (
        <Feedback
          type="empty"
          message="내 세트리스트에 담긴 응원가가 없습니다. 곡 우측의 별표(★)를 눌러 오늘 직관에서 부를 곡들을 모아보세요!"
        />
      ) : sortedSongs.length === 0 ? (
        <Feedback
          type="empty"
          message={`"${query.trim()}" 검색 결과가 없습니다`}
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {sortedSongs.map((song, index) => {
            const segments = keyword
              ? findLyricLine(song.lyrics, keyword)
              : null;

            return (
              <li key={song.id} className="flex flex-col">
                <SongCard
                  id={song.id}
                  title={song.title}
                  tags={song.tags}
                  index={index}
                />
                {segments && <LyricsSnippet segments={segments} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
