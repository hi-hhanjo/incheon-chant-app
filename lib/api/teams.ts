/**
 * K리그1 구단 메타데이터 — 엠블럼 URL + 다음 스포츠 팀 페이지 링크.
 *
 * 앱 전체에서 팀명(standings.json·matches.json 등의 "team"/"opponent" 값)을 키로 써서
 * 엠블럼 이미지와 외부 링크를 가져온다. 매핑은 다음 스포츠 순위 API 응답에서 추출했다.
 *
 * - 엠블럼: t1.daumcdn.net CDN의 300×300 PNG (next.config.ts remotePatterns 필요)
 * - 팀 페이지: https://sports.daum.net/team/kl/{teamId} (숫자 teamId 사용)
 *
 * ⚠ cpTeamId·teamId는 반드시 다음 순위 API(rank.json) 응답에서 그대로 옮긴다.
 *   cpTeamId 숫자와 teamId는 다르다(예: 안양 cpTeamId K27 · teamId 163984). 과거
 *   teamId를 cpTeamId 숫자로 잘못 채워 안양·김천 엠블럼이 뒤바뀌고 강원·부천·광주
 *   팀 링크가 깨졌던 이력이 있어 2026-07-20 API 기준으로 전수 교정했다.
 */

export interface TeamMeta {
  /** 다음 스포츠의 cpTeamId (예: "K18"). 엠블럼 URL 패턴의 키. */
  cpTeamId: string;
  /** 다음 스포츠의 숫자 teamId. 팀 상세 페이지 URL에 쓴다. */
  teamId: number;
  /** 300×300 엠블럼 이미지 URL (다음 CDN). */
  emblemUrl: string;
  /** 다음 스포츠 팀 상세 페이지 URL. */
  daumUrl: string;
  /** 구단 공식 홈페이지 선수단 페이지 URL. */
  officialSquadUrl: string;
}

const EMBLEM_BASE = "https://t1.daumcdn.net/media/img-section/sports13/logo/team/6";
const TEAM_PAGE_BASE = "https://sports.daum.net/team/kl";

// 앱 표기 팀명 → 메타데이터. 2026 K리그1 12팀 기준.
// cpTeamId·teamId는 다음 순위 API(2026-07-17)에서 추출.
const TEAM_META: Record<string, TeamMeta> = {
  "FC서울": {
    cpTeamId: "K09", teamId: 9,
    emblemUrl: `${EMBLEM_BASE}/K09_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/9`,
    officialSquadUrl: "https://www.fcseoul.com",
  },
  "전북 현대모터스": {
    cpTeamId: "K05", teamId: 5,
    emblemUrl: `${EMBLEM_BASE}/K05_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/5`,
    officialSquadUrl: "https://hyundai-motorsfc.com/player/player_list.asp",
  },
  "강원FC": {
    cpTeamId: "K21", teamId: 20,
    emblemUrl: `${EMBLEM_BASE}/K21_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/20`,
    officialSquadUrl: "https://gangwon-fc.com",
  },
  "포항 스틸러스": {
    cpTeamId: "K03", teamId: 3,
    emblemUrl: `${EMBLEM_BASE}/K03_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/3`,
    officialSquadUrl: "https://www.steelers.kr",
  },
  "울산 HD": {
    cpTeamId: "K01", teamId: 1,
    emblemUrl: `${EMBLEM_BASE}/K01_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/1`,
    officialSquadUrl: "https://www.uhfc.tv",
  },
  "안양FC": {
    cpTeamId: "K27", teamId: 163984,
    emblemUrl: `${EMBLEM_BASE}/K27_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/163984`,
    officialSquadUrl: "https://www.fcanyang.com",
  },
  "인천 유나이티드": {
    cpTeamId: "K18", teamId: 18,
    emblemUrl: `${EMBLEM_BASE}/K18_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/18`,
    officialSquadUrl: "https://www.incheonutd.com",
  },
  "제주SK": {
    cpTeamId: "K04", teamId: 4,
    emblemUrl: `${EMBLEM_BASE}/K04_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/4`,
    officialSquadUrl: "https://www.jeju-utd.com",
  },
  "부천FC": {
    cpTeamId: "K26", teamId: 163983,
    emblemUrl: `${EMBLEM_BASE}/K26_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/163983`,
    officialSquadUrl: "https://www.bfc1995.com/player/pro.php",
  },
  "대전하나시티즌": {
    cpTeamId: "K10", teamId: 10,
    emblemUrl: `${EMBLEM_BASE}/K10_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/10`,
    officialSquadUrl: "https://www.dhcfc.kr",
  },
  "김천 상무": {
    cpTeamId: "K35", teamId: 601032,
    emblemUrl: `${EMBLEM_BASE}/K35_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/601032`,
    officialSquadUrl: "https://www.gimcheonfc.com",
  },
  "광주FC": {
    cpTeamId: "K22", teamId: 3035,
    emblemUrl: `${EMBLEM_BASE}/K22_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/3035`,
    officialSquadUrl: "https://www.gwangjufc.com/player/pro.php",
  },
  // K리그 주요 타 구단 메타데이터
  "수원 삼성": {
    cpTeamId: "K02", teamId: 2,
    emblemUrl: `${EMBLEM_BASE}/K02_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/2`,
    officialSquadUrl: "https://www.bluewings.kr",
  },
  "대구FC": {
    cpTeamId: "K17", teamId: 17,
    emblemUrl: `${EMBLEM_BASE}/K17_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/17`,
    officialSquadUrl: "https://www.daegufc.com",
  },
  "수원FC": {
    cpTeamId: "K29", teamId: 163986,
    emblemUrl: `${EMBLEM_BASE}/K29_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/163986`,
    officialSquadUrl: "https://www.suwonfc.com",
  },
  "김포FC": {
    cpTeamId: "K34", teamId: 601031,
    emblemUrl: `${EMBLEM_BASE}/K34_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/601031`,
    officialSquadUrl: "https://www.gimpofc.com",
  },
  "부산 아이파크": {
    cpTeamId: "K06", teamId: 6,
    emblemUrl: `${EMBLEM_BASE}/K06_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/6`,
    officialSquadUrl: "https://www.busanipark.com",
  },
  "전남 드래곤즈": {
    cpTeamId: "K07", teamId: 7,
    emblemUrl: `${EMBLEM_BASE}/K07_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/7`,
    officialSquadUrl: "https://www.dragons.co.kr",
  },
  "경남FC": {
    cpTeamId: "K20", teamId: 19,
    emblemUrl: `${EMBLEM_BASE}/K20_300300.png`,
    daumUrl: `${TEAM_PAGE_BASE}/19`,
    officialSquadUrl: "https://www.gyeongnamfc.com",
  },
};

const ALIAS_MAP: Record<string, string> = {
  "전북 현대": "전북 현대모터스",
  "전북": "전북 현대모터스",
  "제주 유나이티드": "제주SK",
  "제주": "제주SK",
  "FC안양": "안양FC",
  "안양": "안양FC",
  "부천FC 1995": "부천FC",
  "부천": "부천FC",
  "대전 하나시티즌": "대전하나시티즌",
  "대전": "대전하나시티즌",
  "서울": "FC서울",
  "포항": "포항 스틸러스",
  "울산": "울산 HD",
  "광주": "광주FC",
  "강원": "강원FC",
  "김천": "김천 상무",
  "김천상무": "김천 상무",
  "수원삼성": "수원 삼성",
  "부산아이파크": "부산 아이파크",
  "전남드래곤즈": "전남 드래곤즈",
};

/** 앱 표기 팀명으로 메타데이터 전체를 가져온다. 별칭 및 띄어쓰기 정규화 지원. */
export function getTeamMeta(teamName: string): TeamMeta | null {
  const trimmed = teamName.trim();
  const resolved = ALIAS_MAP[trimmed] ?? trimmed;
  return TEAM_META[resolved] ?? null;
}

/** 앱 표기 팀명으로 엠블럼 URL만 가져온다. 매핑에 없으면 null. */
export function getEmblemUrl(teamName: string): string | null {
  return getTeamMeta(teamName)?.emblemUrl ?? null;
}

/** 앱 표기 팀명으로 다음 스포츠 팀 상세 페이지 URL만 가져온다. 매핑에 없으면 null. */
export function getDaumTeamUrl(teamName: string): string | null {
  return getTeamMeta(teamName)?.daumUrl ?? null;
}

/** 앱 표기 팀명으로 공식 홈페이지 선수단 페이지 URL을 가져온다. 매핑에 없으면 null. */
export function getOfficialSquadUrl(teamName: string): string | null {
  return getTeamMeta(teamName)?.officialSquadUrl ?? null;
}

