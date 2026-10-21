export type LegendPosition = "FW" | "MF" | "DF" | "GK" | "MGR";
export type LegendEra = "FOUNDATION" | "SUNGUI_STABILITY" | "ACL_MODERN";
export type LegendStatus = "ACTIVE" | "LEGEND" | "MEMORIAL";

export interface LegendStats {
  appearances: number | string; // 경기 수 (감독의 경우 '138경기')
  goals?: number;
  assists?: number;
  cleanSheets?: number; // GK
  titles: string[]; // 주요 수상 / 영예
}

export interface LegendLore {
  nickname: string; // "인천의 왕", "영원한 캡틴", "하프스타", "시우타임"
  signatureMove: string; // 상징적인 세리머니 / 플레이 스타일
  quote: string; // 선수의 명언
  communitySentiment: string; // 팬덤/SNS 반응 요약
  story: string; // 상세 스토리텔링
  signatureMoment: string; // 최고의 명장면
}

export interface Legend {
  id: string;
  name: string;
  nameEn: string;
  number?: number;
  position: LegendPosition;
  era: LegendEra;
  period: string; // e.g. "2018 ~ 현재", "2004 ~ 2011"
  status: LegendStatus;
  chantId?: number; // songs.json ID와 매핑
  stats: LegendStats;
  lore: LegendLore;
  tags: string[];
}
