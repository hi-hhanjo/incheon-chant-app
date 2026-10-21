"use client";

import { useState } from "react";

type SectorId = "S" | "E" | "W" | "N";

interface SectorInfo {
  id: SectorId;
  name: string;
  subName: string;
  color: string;
  neonBorder: string;
  tag: string;
  vibe: string;
  tips: string[];
  features: string[];
  ticketLink?: string;
  foodTruckAccess: string;
}

const SECTOR_DETAILS: Record<SectorId, SectorInfo> = {
  S: {
    id: "S",
    name: "S석 (남측)",
    subName: "파랑검정 코어 서포터즈 스탠딩 존",
    color: "#2E7DFF",
    neonBorder: "rgba(46, 125, 255, 0.8)",
    tag: "🔵⚫ 파랑검정 심장부",
    vibe: "90분 내내 서서 목청 높여 응원가를 부르고 깃발을 흔드는 인천의 심장입니다. 경기장 내에서 가장 뜨거운 열기를 온몸으로 체감할 수 있습니다.",
    tips: [
      "편한 운동화 착용 필수 (90분간 서포터즈 스탠딩 응원 진행)",
      "현장 콜리더와 소모임의 리드에 맞춰 떼창과 슬램 참여",
      "유니폼 및 파랑검정 머플러 착용 강력 권장",
    ],
    features: ["콜리더 타워 & 응원단상", "대형 깃발 펄럭임 존", "열광적인 골 셀러브레이션"],
    foodTruckAccess: "도원역 1번 출구 광장 및 S석 매점 바로 연결 (도보 1분)",
    ticketLink: "https://www.ticketlink.co.kr/sports/football/66#reservation",
  },
  E: {
    id: "E",
    name: "E석 (동측)",
    subName: "푸드트럭 로드 & 와이드 피치 뷰",
    color: "#F59E0B",
    neonBorder: "rgba(245, 158, 11, 0.8)",
    tag: "🍔 푸드트럭 & 최고의 시야",
    vibe: "경기장 전체가 한눈에 들어오는 환상적인 파노라마 시야와 다채로운 먹거리가 공존합니다. 친구, 연인, 가족 직관 시 가장 만족도가 높습니다.",
    tips: [
      "E석 2층 출구 야외 광장에 푸드트럭 로드가 바로 연결되어 킥오프 전 식사 편리",
      "하이네켄 펍에서 시원한 생맥주와 스낵 구매 가능",
      "피치 전체의 전술적 움직임과 선수단 워밍업을 정면에서 조망",
    ],
    features: ["푸드트럭 로드 직결", "하이네켄 펍 & F&B 부스", "선수단 워밍업 정면 조망"],
    foodTruckAccess: "E석 2층 출구 바로 앞 야외 광장 (도보 30초, 최단 동선)",
    ticketLink: "https://www.ticketlink.co.kr/sports/football/66#reservation",
  },
  W: {
    id: "W",
    name: "W석 (서측)",
    subName: "본부석 프리미엄 & 블루마켓 본점",
    color: "#38BDF8",
    neonBorder: "rgba(56, 189, 248, 0.8)",
    tag: "👑 선수단 벤치뷰 & 공식 MD샵",
    vibe: "선수단 벤치 바로 뒤에서 감독의 지시와 교체 선수들의 워밍업을 초근접 관람할 수 있습니다. 쾌적한 관람 환경을 자랑합니다.",
    tips: [
      "인천 구단 공식 상품 매장 '블루마켓 본점'이 2층 중앙에 위치",
      "비나 눈이 와도 지붕 캐노피가 가장 완벽하게 커버되는 전천후 프리미엄 구역",
      "경기 종료 후 믹스트존 퇴근길 선수단 배웅 동선과 인접",
    ],
    features: ["선수단 벤치 바로 뒤", "블루마켓 공식 팬샵 본점", "캐노피 완벽 비가림"],
    foodTruckAccess: "W석 중앙 홀 매점 및 W-S 연결 게이트 이용 (도보 2분)",
    ticketLink: "https://www.ticketlink.co.kr/sports/football/66#reservation",
  },
  N: {
    id: "N",
    name: "N석 (북측)",
    subName: "원정팀 서포터즈 관람석",
    color: "#EF4444",
    neonBorder: "rgba(239, 68, 68, 0.8)",
    tag: "🚩 원정 응원석",
    vibe: "원정팀 서포터즈 전용 구역입니다. 홈 팬은 입장이 불가하며, 원정 유니폼 및 응원용품 착용자만 출입할 수 있습니다.",
    tips: [
      "인천 유나이티드 유니폼 및 응원용품 착용 시 입장이 엄격히 제한됩니다.",
      "수인분당선 숭의역(4번 출구)에서 북측 광장 방면 접근이 편리합니다.",
      "원정 전용 티켓 구매자만 출입 가능",
    ],
    features: ["원정 서포터즈 전용 게이트", "원정 전용 F&B 매점", "수인분당선 숭의역 도보 10분"],
    foodTruckAccess: "원정 게이트 전용 매점 이용 가능 (E석 푸드트럭 접근 제한)",
    ticketLink: "https://www.ticketlink.co.kr/sports/football/66#reservation",
  },
};

export default function StadiumArena3D() {
  const [selectedSector, setSelectedSector] = useState<SectorId>("S");
  const [viewMode, setViewMode] = useState<"isometric" | "topdown">("isometric");

  const sector = SECTOR_DETAILS[selectedSector];

  // 3D 뷰모드일 때 선택된 구역에 따라 카메라 각도를 자연스럽게 변경
  const getCameraTransform = () => {
    if (viewMode === "topdown") {
      return "perspective(1200px) rotateX(0deg) rotateZ(0deg) scale(0.95)";
    }
    switch (selectedSector) {
      case "S":
        return "perspective(950px) rotateX(54deg) rotateZ(-16deg) scale(1)";
      case "E":
        return "perspective(950px) rotateX(48deg) rotateZ(-34deg) scale(1.02)";
      case "W":
        return "perspective(950px) rotateX(48deg) rotateZ(-6deg) scale(1.02)";
      case "N":
        return "perspective(950px) rotateX(40deg) rotateZ(-20deg) scale(0.98)";
      default:
        return "perspective(950px) rotateX(50deg) rotateZ(-20deg) scale(1)";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. 상단 컨트롤 바: 3D 뷰어 헤더 & 시점 모드 토글 */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 border border-white/10 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
            🏟️ 숭의아레나 3D 스타디움 뷰어
          </span>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-semibold hidden md:inline">
            CSS 3D 하드웨어 가속
          </span>
        </div>

        {/* 입체 / 평면 시점 전환 */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setViewMode("isometric")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              viewMode === "isometric"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "text-text-muted hover:text-white"
            }`}
          >
            🎮 3D 입체 뷰
          </button>
          <button
            type="button"
            onClick={() => setViewMode("topdown")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              viewMode === "topdown"
                ? "bg-blue-600 text-white shadow-sm font-bold"
                : "text-text-muted hover:text-white"
            }`}
          >
            📐 2D 평면 뷰
          </button>
        </div>
      </div>

      {/* 2. 모바일 친화 원터치 구역 탭 (엄지손가락으로 손쉽게 전환) */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {(["S", "E", "W", "N"] as SectorId[]).map((secId) => {
          const item = SECTOR_DETAILS[secId];
          const isSelected = selectedSector === secId;
          return (
            <button
              key={secId}
              type="button"
              onClick={() => setSelectedSector(secId)}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border flex flex-col sm:flex-row items-center justify-center gap-1 ${
                isSelected
                  ? "bg-white/15 text-white shadow-lg scale-[1.02]"
                  : "bg-black/30 text-text-muted border-white/5 hover:bg-white/5 hover:text-white"
              }`}
              style={{
                borderColor: isSelected ? item.color : "rgba(255,255,255,0.08)",
                boxShadow: isSelected ? `0 0 16px ${item.color}40` : "none",
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name.split(" ")[0]}</span>
              <span className="text-[10px] opacity-75 font-normal hidden sm:inline">
                {secId === "S" ? "서포터즈" : secId === "E" ? "푸드트럭" : secId === "W" ? "본부석" : "원정석"}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. 인터랙티브 3D 경기장 피치 캔버스 영역 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#050C1B] via-[#081329] to-[#040812] border border-blue-500/25 p-5 sm:p-7 flex flex-col items-center justify-center min-h-[310px] sm:min-h-[350px] shadow-2xl">
        {/* 경기장 바닥 조명 글로우 & 축구장 필드 안개 */}
        <div
          className="pointer-events-none absolute inset-0 blur-3xl opacity-40 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at center, ${sector.color}50 0%, transparent 70%)`,
          }}
        />

        {/* 3D 스타디움 피치 박스 */}
        <div
          className="relative w-full max-w-[320px] sm:max-w-[410px] aspect-[4/3] flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: getCameraTransform(),
          }}
        >
          {/* 코너 라이트 타워 (4개 모서리 조명 기둥) */}
          <div className="absolute -top-3 -left-3 w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_15px_#fff]" />
          <div className="absolute -top-3 -right-3 w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_15px_#fff]" />
          <div className="absolute -bottom-3 -left-3 w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_15px_#fff]" />
          <div className="absolute -bottom-3 -right-3 w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_15px_#fff]" />

          {/* 천연 잔디 피치 (Pitch) */}
          <div
            className="relative w-[78%] h-[68%] rounded-xl bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-900 border-2 border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden flex items-center justify-center"
            style={{
              transform: "translateZ(0px)",
            }}
          >
            {/* 잔디 스트라이프 패턴 */}
            <div className="absolute inset-0 flex flex-col opacity-25">
              <div className="flex-1 bg-white/15" />
              <div className="flex-1 bg-transparent" />
              <div className="flex-1 bg-white/15" />
              <div className="flex-1 bg-transparent" />
              <div className="flex-1 bg-white/15" />
            </div>

            {/* 피치 라인: 센터라인 & 센터서클 */}
            <div className="absolute w-full h-[1.5px] bg-white/70" />
            <div className="absolute w-14 h-14 rounded-full border-[1.5px] border-white/70" />
            <div className="absolute w-2 h-2 rounded-full bg-white/80" />

            {/* 골에어리어 및 페널티 박스 (북측 / 남측) */}
            <div className="absolute top-0 w-22 h-9 border-b-[1.5px] border-x-[1.5px] border-white/70" />
            <div className="absolute bottom-0 w-22 h-9 border-t-[1.5px] border-x-[1.5px] border-white/70" />

            {/* 잔디 위 구단 엠블럼 워터마크 */}
            <span className="font-black text-2xl sm:text-3xl text-white/20 select-none tracking-widest font-mono">
              INCHEON
            </span>
          </div>

          {/* 4대 스탠드 관람석 구역 버튼들 */}
          {/* 1. S석 (남측 하단) */}
          <button
            type="button"
            onClick={() => setSelectedSector("S")}
            className={`absolute bottom-[-18px] w-[84%] py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xl ${
              selectedSector === "S"
                ? "bg-blue-600 text-white border-2 border-blue-300 shadow-[0_0_30px_rgba(46,125,255,0.85)] scale-105"
                : "bg-blue-950/80 text-blue-200 border border-blue-500/40 hover:bg-blue-800/80 hover:text-white"
            }`}
            style={{
              transform: "translateZ(18px)",
            }}
          >
            <span>🔵⚫ S석</span>
            <span className="text-[10px] font-normal opacity-90 hidden sm:inline">
              (파랑검정 서포팅존)
            </span>
            {selectedSector === "S" && (
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping ml-1" />
            )}
          </button>

          {/* 2. N석 (북측 상단) */}
          <button
            type="button"
            onClick={() => setSelectedSector("N")}
            className={`absolute top-[-18px] w-[84%] py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xl ${
              selectedSector === "N"
                ? "bg-red-600 text-white border-2 border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.85)] scale-105"
                : "bg-red-950/80 text-red-200 border border-red-500/40 hover:bg-red-800/80 hover:text-white"
            }`}
            style={{
              transform: "translateZ(18px)",
            }}
          >
            <span>🚩 N석</span>
            <span className="text-[10px] font-normal opacity-90 hidden sm:inline">
              (원정석)
            </span>
            {selectedSector === "N" && (
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping ml-1" />
            )}
          </button>

          {/* 3. W석 (서측 좌측) */}
          <button
            type="button"
            onClick={() => setSelectedSector("W")}
            className={`absolute left-[-16px] h-[72%] px-2.5 sm:px-3 rounded-xl font-black text-xs sm:text-sm tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer shadow-xl [writing-mode:vertical-rl] rotate-180 ${
              selectedSector === "W"
                ? "bg-sky-600 text-white border-2 border-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.85)] scale-105"
                : "bg-sky-950/80 text-sky-200 border border-sky-500/40 hover:bg-sky-800/80 hover:text-white"
            }`}
            style={{
              transform: "translateZ(18px)",
            }}
          >
            <span>👑 W석 (본부석)</span>
          </button>

          {/* 4. E석 (동측 우측) */}
          <button
            type="button"
            onClick={() => setSelectedSector("E")}
            className={`absolute right-[-16px] h-[72%] px-2.5 sm:px-3 rounded-xl font-black text-xs sm:text-sm tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer shadow-xl [writing-mode:vertical-rl] ${
              selectedSector === "E"
                ? "bg-amber-600 text-white border-2 border-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.85)] scale-105"
                : "bg-amber-950/80 text-amber-200 border border-amber-500/40 hover:bg-amber-800/80 hover:text-white"
            }`}
            style={{
              transform: "translateZ(18px)",
            }}
          >
            <span>🍔 E석 (푸드트럭)</span>
          </button>
        </div>

        {/* 힌트 캡션 */}
        <p className="relative z-10 text-[11px] text-text-muted mt-5 text-center">
          💡 각 구역(S / E / W / N)을 클릭하면 3D 카메라 앵글이 이동하며 상세 직관 가이드가 펼쳐집니다.
        </p>
      </div>

      {/* 4. 모바일 & 데스크톱 공용: 선택된 구역 상세 가이드 카드 */}
      <div className="rounded-2xl bg-[#0E1528] border border-blue-500/30 p-4 sm:p-6 shadow-xl flex flex-col gap-4 animate-in fade-in duration-300">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-3.5 w-3.5 rounded-full shadow-md"
              style={{ backgroundColor: sector.color }}
            />
            <h3 className="text-base sm:text-lg font-black text-white">
              {sector.name} — {sector.subName}
            </h3>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full border"
            style={{
              borderColor: `${sector.color}50`,
              backgroundColor: `${sector.color}20`,
              color: sector.color,
            }}
          >
            {sector.tag}
          </span>
        </div>

        {/* 구역 분위기 설명 */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5">
          {sector.vibe}
        </p>

        {/* 직관 팁 & 주요 시설 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 flex flex-col gap-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>📌</span> 직관 필수 체크포인트
            </span>
            <ul className="flex flex-col gap-1.5 text-text-muted">
              {sector.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 flex flex-col gap-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>🍔</span> 먹거리 & 편의시설 동선
            </span>
            <p className="text-text-muted leading-relaxed">
              {sector.foodTruckAccess}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {sector.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-text-secondary"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 티켓 링크 바로가기 */}
        {sector.ticketLink && (
          <div className="pt-2 flex justify-end">
            <a
              href={sector.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
            >
              <span>{sector.name} 티켓 예매하기 ↗</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
