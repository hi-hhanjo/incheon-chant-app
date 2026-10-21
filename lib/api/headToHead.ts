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

export async function getHeadToHead(
  opponentKoreanName: string,
): Promise<HeadToHeadMatch[]> {
  if (!supabase) {
    return fallbackHeadToHead[opponentKoreanName] ?? [];
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
