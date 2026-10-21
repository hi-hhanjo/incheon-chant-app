import { supabase } from "../supabase";
import fallbackStandingsData from "@/data/standings.json";
import fallbackStandingsMeta from "@/data/standings-meta.json";

export interface TeamStanding {
  rank: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  rankChange: number | null;
}

const fallbackStandings = fallbackStandingsData as Omit<TeamStanding, "rankChange">[];
const fallbackMeta = fallbackStandingsMeta as {
  updatedAt: string | null;
  rankChange?: Record<string, number | null>;
};

export async function getStandings(): Promise<TeamStanding[]> {
  if (!supabase) {
    return fallbackStandings.map((row) => ({
      ...row,
      rankChange: fallbackMeta.rankChange?.[row.team] ?? null,
    }));
  }

  try {
    const { data, error } = await supabase
      .from("standings")
      .select("*")
      .order("rank", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackStandings.map((row) => ({
        ...row,
        rankChange: fallbackMeta.rankChange?.[row.team] ?? null,
      }));
    }

    return data.map(row => ({
      rank: row.rank,
      team: row.team,
      played: row.played,
      win: row.win,
      draw: row.draw,
      lose: row.lose,
      goalsFor: row.goals_for,
      goalsAgainst: row.goals_against,
      points: row.points,
      rankChange: row.rank_change ?? null
    }));
  } catch {
    return fallbackStandings.map((row) => ({
      ...row,
      rankChange: fallbackMeta.rankChange?.[row.team] ?? null,
    }));
  }
}

export async function getStandingsUpdatedAt(): Promise<string | null> {
  if (!supabase) {
    return fallbackMeta.updatedAt ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("standings")
      .select("updated_at")
      .limit(1)
      .single();

    if (error || !data) return fallbackMeta.updatedAt ?? null;
    return data.updated_at;
  } catch {
    return fallbackMeta.updatedAt ?? null;
  }
}
