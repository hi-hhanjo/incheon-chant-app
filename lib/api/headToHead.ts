import { supabase } from "../supabase";
import fallbackHeadToHeadData from "@/data/head-to-head.json";
import fallbackHeadToHeadMeta from "@/data/head-to-head-meta.json";

export interface HeadToHeadMatch {
  date: string;
  round: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  gameId?: number;
  venue?: string;
}

export interface HeadToHeadSummary {
  total: { win: number; draw: number; loss: number };
  perVenue: Record<string, { win: number; draw: number; loss: number }>;
}

const fallbackHeadToHead = fallbackHeadToHeadData as Record<string, HeadToHeadMatch[]>;

const TEAM_ALIASES: Record<string, string> = {
  "제주 유나이티드": "제주SK",
  "제주": "제주SK",
  "전북 현대": "전북 현대모터스",
  "전북": "전북 현대모터스",
  "FC안양": "안양FC",
  "안양": "안양FC",
  "부천FC 1995": "부천FC",
  "부천": "부천FC",
  "대전 하나시티즌": "대전하나시티즌",
  "대전": "대전하나시티즌",
  "수원 삼성": "수원",
  "수원삼성": "수원",
  "대구FC": "대구",
  "김포FC": "김포",
  "전남 드래곤즈": "전남",
  "부산 아이파크": "부산",
  "경남FC": "경남",
  "성남FC": "성남",
  "안산 그리너스": "안산",
};

export async function getHeadToHead(
  opponentKoreanName: string,
): Promise<HeadToHeadMatch[]> {
  const normalized = TEAM_ALIASES[opponentKoreanName?.trim()] ?? opponentKoreanName?.trim();
  if (!supabase) {
    return fallbackHeadToHead[normalized] ?? fallbackHeadToHead[opponentKoreanName] ?? [];
  }

  try {
    const { data, error } = await supabase
      .from("head_to_head")
      .select("*")
      .eq("opponent", opponentKoreanName)
      .order("date", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackHeadToHead[opponentKoreanName] ?? [];
    }

    return data.map(row => ({
      date: row.date,
      round: "",
      homeTeam: row.home_team,
      awayTeam: row.away_team,
      homeScore: row.home_score,
      awayScore: row.away_score,
      gameId: row.game_id,
      venue: row.venue,
    }));
  } catch {
    return fallbackHeadToHead[opponentKoreanName] ?? [];
  }
}

export async function getHeadToHeadSummary(opponentKoreanName: string): Promise<{ matches: HeadToHeadMatch[], summary: HeadToHeadSummary }> {
  const matches = await getHeadToHead(opponentKoreanName);
  const summary: HeadToHeadSummary = {
    total: { win: 0, draw: 0, loss: 0 },
    perVenue: {}
  };

  matches.forEach(m => {
    const isHome = m.homeTeam === "인천 유나이티드";
    const incheonScore = isHome ? m.homeScore : m.awayScore;
    const opponentScore = isHome ? m.awayScore : m.homeScore;
    
    let result: "win" | "draw" | "loss";
    if (incheonScore > opponentScore) result = "win";
    else if (incheonScore < opponentScore) result = "loss";
    else result = "draw";

    summary.total[result]++;

    if (m.venue) {
      if (!summary.perVenue[m.venue]) {
        summary.perVenue[m.venue] = { win: 0, draw: 0, loss: 0 };
      }
      summary.perVenue[m.venue][result]++;
    }
  });

  return { matches, summary };
}

export async function getHeadToHeadUpdatedAt(): Promise<string | null> {
  if (!supabase) {
    return (fallbackHeadToHeadMeta as { updatedAt: string | null }).updatedAt ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("head_to_head")
      .select("updated_at")
      .limit(1)
      .single();

    if (error || !data) return (fallbackHeadToHeadMeta as { updatedAt: string | null }).updatedAt ?? null;
    return data.updated_at;
  } catch {
    return (fallbackHeadToHeadMeta as { updatedAt: string | null }).updatedAt ?? null;
  }
}
