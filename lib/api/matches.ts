import { supabase } from "../supabase";
import fallbackMatchesData from "@/data/matches.json";
import fallbackMatchesMeta from "@/data/matches-meta.json";

export type MatchStatus = "finished" | "upcoming";

export interface MatchScore {
  incheon: number;
  opponent: number;
}

export interface Match {
  id: number;
  round: string;
  kickoffAt: string;
  status: MatchStatus;
  opponent: string;
  isHome: boolean;
  score: MatchScore | null;
  venue: string;
}

const fallbackMatches = fallbackMatchesData as Match[];

export async function getRecentMatches(count = 5): Promise<Match[]> {
  if (!supabase) {
    return fallbackMatches
      .filter((match) => match.status === "finished")
      .sort((a, b) => b.kickoffAt.localeCompare(a.kickoffAt))
      .slice(0, count);
  }

  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("status", "finished")
      .order("kickoff_at", { ascending: false })
      .limit(count);

    if (error || !data || data.length === 0) {
      return fallbackMatches
        .filter((match) => match.status === "finished")
        .sort((a, b) => b.kickoffAt.localeCompare(a.kickoffAt))
        .slice(0, count);
    }
    return data.map(mapToMatch);
  } catch {
    return fallbackMatches
      .filter((match) => match.status === "finished")
      .sort((a, b) => b.kickoffAt.localeCompare(a.kickoffAt))
      .slice(0, count);
  }
}

export async function getUpcomingMatch(): Promise<Match | undefined> {
  const now = new Date().toISOString();

  if (!supabase) {
    const futureMatches = fallbackMatches
      .filter((match) => match.status === "upcoming" && match.kickoffAt >= now)
      .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt));
    if (futureMatches.length > 0) return futureMatches[0];

    return fallbackMatches
      .filter((match) => match.status === "upcoming")
      .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt))[0];
  }

  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("status", "upcoming")
      .gte("kickoff_at", now)
      .order("kickoff_at", { ascending: true })
      .limit(1)
      .single();

    if (error || !data) {
      const futureMatches = fallbackMatches
        .filter((match) => match.status === "upcoming" && match.kickoffAt >= now)
        .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt));
      if (futureMatches.length > 0) return futureMatches[0];

      return fallbackMatches
        .filter((match) => match.status === "upcoming")
        .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt))[0];
    }
    return mapToMatch(data);
  } catch {
    const futureMatches = fallbackMatches
      .filter((match) => match.status === "upcoming" && match.kickoffAt >= now)
      .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt));
    if (futureMatches.length > 0) return futureMatches[0];

    return fallbackMatches
      .filter((match) => match.status === "upcoming")
      .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt))[0];
  }
}

export async function getMatchesUpdatedAt(): Promise<string | null> {
  if (!supabase) {
    return (fallbackMatchesMeta as { updatedAt: string | null }).updatedAt ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("matches")
      .select("updated_at")
      .limit(1)
      .single();

    if (error || !data) {
      return (fallbackMatchesMeta as { updatedAt: string | null }).updatedAt ?? null;
    }
    return data.updated_at;
  } catch {
    return (fallbackMatchesMeta as { updatedAt: string | null }).updatedAt ?? null;
  }
}

function mapToMatch(row: any): Match {
  return {
    id: row.id,
    round: row.round,
    kickoffAt: row.kickoff_at,
    status: row.status,
    opponent: row.opponent,
    isHome: row.is_home === 1,
    score: (row.score_incheon !== null && row.score_opponent !== null) ? {
      incheon: row.score_incheon,
      opponent: row.score_opponent
    } : null,
    venue: row.venue
  };
}
