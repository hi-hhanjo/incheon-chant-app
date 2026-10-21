"use client";

import { useState } from "react";
import type { Match } from "@/lib/api/matches";
import type { MatchWeather } from "@/lib/api/weather";
import foodTrucksData from "@/data/food-trucks.json";
import StadiumArena3D from "@/components/club/StadiumArena3D";

interface FoodTruck {
  id: string;
  name: string;
  category: string;
  icon: string;
  signatureMenu: string;
  location: string;
  instagramHandle: string;
  instagramUrl: string;
}

const foodTrucks = foodTrucksData as FoodTruck[];

interface MatchdayGuideCardProps {
  match: Match;
  weather: MatchWeather | null;
}

type GuideTab = "timeline" | "foodtruck" | "transport" | "seats";

export default function MatchdayGuideCard({ match, weather }: MatchdayGuideCardProps) {
  const isHome = match.isHome;
  const [activeTab, setActiveTab] = useState<GuideTab>("timeline");

  if (!isHome) {
    return (
      <section id="matchday-guide" className="scroll-mt-20 rounded-2xl bg-[#0B1324] border border-blue-500/20 p-4 shadow-xl text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              {match.opponent} 원정 경기 직관 가이드
            </h2>
          </div>
          {weather && (
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-2.5 py-1 rounded-lg text-[11px] text-text-muted">
              <span>{weather.weatherIcon}</span>
              <span className="font-bold text-white">{weather.temperature}°C</span>
              <span>({weather.weatherLabel})</span>
            </div>
          )}
        </div>
        <div className="rounded-xl bg-blue-950/40 border border-blue-500/30 p-3.5 flex flex-col gap-1.5">
          <span className="font-bold text-blue-300">🔵⚫ 원정 서포터즈 관람 팁</span>
          <p className="text-text-secondary leading-relaxed">
            원정 경기 관람 시 반드시 <strong>원정 전용 구역(N석)</strong>을 예매해주세요. 상대팀 홈 응원석에서는 인천 유니폼 및 응원용품 착용 시 입장이 제한될 수 있습니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="matchday-guide" className="scroll-mt-20 rounded-2xl bg-[#0B1324] border border-blue-500/20 p-4 sm:p-5 shadow-xl flex flex-col gap-4">
      {/* 1. 상단 헤더: 타이틀 + 날씨 콤팩트 배지 */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-4.5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>숭의아레나 매치데이 허브</span>
            <span className="text-[11px] font-normal text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-500/30">
              인천 축구전용경기장
            </span>
          </h2>
        </div>

        {weather && (
          <div className="flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-1 rounded-xl text-xs">
            <span className="text-base">{weather.weatherIcon}</span>
            <span className="font-bold text-white">{weather.temperature}°C</span>
            <span className="text-text-muted text-[11px]">
              체감 {weather.apparentTemperature}°C · {weather.weatherLabel}
            </span>
          </div>
        )}
      </div>

      {/* 2. 획기적인 동선 탭 스위처 (공간 효율 극대화) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-black/50 rounded-xl border border-white/10 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("timeline")}
          className={`py-2 px-1 sm:px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "timeline"
              ? "bg-blue-600 text-white shadow-md font-bold"
              : "text-text-muted hover:text-white hover:bg-white/5"
          }`}
        >
          <span>⏱️</span>
          <span className="truncate">타임라인</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("foodtruck")}
          className={`py-2 px-1 sm:px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "foodtruck"
              ? "bg-blue-600 text-white shadow-md font-bold"
              : "text-text-muted hover:text-white hover:bg-white/5"
          }`}
        >
          <span>🚚</span>
          <span className="truncate">푸드트럭 ({foodTrucks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("transport")}
          className={`py-2 px-1 sm:px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "transport"
              ? "bg-blue-600 text-white shadow-md font-bold"
              : "text-text-muted hover:text-white hover:bg-white/5"
          }`}
        >
          <span>🚇</span>
          <span className="truncate">교통·주차</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seats")}
          className={`py-2 px-1 sm:px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "seats"
              ? "bg-blue-600 text-white shadow-md font-bold"
              : "text-text-muted hover:text-white hover:bg-white/5"
          }`}
        >
          <span>🏟️</span>
          <span className="truncate">3D 스타디움</span>
        </button>
      </div>

      {/* 3. 탭별 인터랙티브 콘텐츠 영역 */}
      <div className="min-h-[160px]">
        {/* TAB 1: 직관 동선 타임라인 */}
        {activeTab === "timeline" && (
          <div className="flex flex-col gap-2.5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="rounded-xl bg-black/40 border border-white/10 p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                    12:00 (D-2h)
                  </span>
                  <span className="text-xs">🎟️</span>
                </div>
                <h4 className="font-bold text-white text-xs">광장 & 부스 오픈</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  게이트 오픈, E석 푸드트럭 로드 시작, 블루마켓 팬샵 영업 개시
                </p>
              </div>

              <div className="rounded-xl bg-black/40 border border-white/10 p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded">
                    13:10 (D-50m)
                  </span>
                  <span className="text-xs">⚽</span>
                </div>
                <h4 className="font-bold text-white text-xs">선수단 그라운드 웜업</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  골키퍼 및 필드 플레이어 피치 입장, 전광판 공식 선발 명단 발표
                </p>
              </div>

              <div className="rounded-xl bg-black/40 border border-white/10 p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                    13:50 (D-10m)
                  </span>
                  <span className="text-xs">🔵⚫</span>
                </div>
                <h4 className="font-bold text-white text-xs">오프닝 콜 & 구단가</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  S석 파랑검정 서포터즈 오프닝 콜, 구단가 &apos;새벽&apos; 전 관중 떼창
                </p>
              </div>

              <div className="rounded-xl bg-blue-950/30 border border-blue-500/30 p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded">
                    14:00 (KICK OFF)
                  </span>
                  <span className="text-xs">🔥</span>
                </div>
                <h4 className="font-bold text-white text-xs">전반전 킥오프!</h4>
                <p className="text-[11px] text-blue-200 leading-relaxed">
                  90분 뜨거운 승부! 숭의아레나를 뒤흔드는 인천 응원가 제창
                </p>
              </div>
            </div>

            {weather && (
              <div className="rounded-xl bg-black/30 border border-white/10 px-3.5 py-2 flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <span>💡 <strong>관람 복장 팁:</strong></span>
                  <span className="text-white">
                    {weather.apparentTemperature <= 12
                      ? "야간 또는 경기 후반부 체감온도가 떨어지니 따뜻한 겉옷을 준비하세요."
                      : "일교차에 대비해 가벼운 바람막이나 겉옷 지참을 추천합니다."}
                  </span>
                </div>
                <span className="text-[11px] text-blue-300 shrink-0">풍속 {weather.windSpeed}km/h</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 푸드트럭 라인업 */}
        {activeTab === "foodtruck" && (
          <div className="flex flex-col gap-3 animate-fadeIn">
            <div className="rounded-xl bg-pink-950/20 border border-pink-500/25 px-3.5 py-2 flex items-center justify-between text-xs text-pink-200">
              <div className="flex items-center gap-1.5">
                <span>📢</span>
                <span>
                  <strong>위치: E석 야외 광장</strong> (킥오프 2시간 전 오픈 · 좌석 반입 취식 가능)
                </span>
              </div>
              <span className="text-[11px] text-pink-300/80 hidden sm:inline">
                *당일 현장 재고는 인스타그램 스토리에서 확인
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {foodTrucks.map((truck) => (
                <div
                  key={truck.id}
                  className="rounded-xl bg-black/40 border border-white/10 p-3 flex flex-col justify-between gap-2 hover:border-pink-500/30 transition-all text-xs"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span>{truck.icon}</span>
                        <span>{truck.name}</span>
                      </div>
                      <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded">
                        {truck.category}
                      </span>
                    </div>

                    <div className="text-[11px] text-text-muted flex items-center gap-1.5 mt-0.5">
                      <span>대표 메뉴:</span>
                      <strong className="text-white">{truck.signatureMenu}</strong>
                    </div>
                  </div>

                  <a
                    href={truck.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-pink-600/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-[11px] transition-all"
                  >
                    <span>인스타그램 스토리 확인 ↗</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 교통 & 주차 */}
        {activeTab === "transport" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn text-xs">
            <div className="rounded-xl bg-blue-950/30 border border-blue-500/30 p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">1</span>
                  <span>1호선 도원역</span>
                </div>
                <span className="text-[10px] font-bold text-blue-300 bg-blue-950 px-2 py-0.5 rounded">
                  도보 1분 (강력 추천)
                </span>
              </div>
              <p className="text-text-secondary text-[11px] leading-relaxed">
                1번 출구로 나오면 경기장 남측 광장(S석/E석)과 바로 연결됩니다. 경기 종료 후에도 가장 빠르고 쾌적하게 귀가할 수 있습니다.
              </p>
            </div>

            <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-[10px] text-black">수</span>
                  <span>수인분당선 숭의역</span>
                </div>
                <span className="text-[10px] font-bold text-text-muted bg-white/5 px-2 py-0.5 rounded">
                  도보 10분
                </span>
              </div>
              <p className="text-text-secondary text-[11px] leading-relaxed">
                4번 출구에서 직진하여 북측 광장 방면으로 이동합니다. 수인선이나 인천 남부권에서 접근 시 편리합니다.
              </p>
            </div>

            <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span>🚗</span>
                  <span>경기장 주차 안내</span>
                </div>
                <span className="text-[10px] font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded">
                  조기 만차 주의
                </span>
              </div>
              <p className="text-text-secondary text-[11px] leading-relaxed">
                경기장 지하주차장은 킥오프 2시간 전 조기 만차됩니다. 만차 시 도원역 공영주차장 또는 홈플러스 인하점 주차장을 이용하세요.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: 인터랙티브 3D 스타디움 아레나 */}
        {activeTab === "seats" && (
          <div className="w-full animate-fadeIn">
            <StadiumArena3D />
          </div>
        )}
      </div>
    </section>
  );
}
