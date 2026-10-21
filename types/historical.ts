export interface SeasonInfo {
  year: number;
  name: string;
  division: "K1" | "K2" | "CLASSIC" | "CHALLENGE" | "KLEAGUE";
  incheonDivision: string;
  incheonRank: number;
  totalTeams: number;
  totalRounds: number;
  record: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
    points: number;
  };
  manager: string;
  stadium: string;
  topScorer: string;
  keyMoment: string;
  trajectory: number[];
  featuredLegends?: string[]; // 해당 시즌을 대표하는 레전드 id
}

export interface HistoricalMatch {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  venue: string;
  isIncheon: boolean;
}

export interface IncheonMatchDetail {
  opponent: string;
  isHome: boolean;
  score: {
    incheon: number;
    opponent: number;
  };
  result: "WIN" | "DRAW" | "LOSE";
  date: string;
  venue: string;
  stadium: string;
  highlightVideo?: {
    youtubeId: string;
    title: string;
    tag?: string;
  };
}

export interface StandingRow {
  rank: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export interface HistoricalRound {
  round: number;
  roundLabel: string;
  incheonMatch: IncheonMatchDetail;
  allMatches: HistoricalMatch[];
  standings: StandingRow[];
}
