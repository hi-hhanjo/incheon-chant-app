import { supabase } from "../supabase";
import fallbackScoutingData from "@/data/opponent-scouting.json";
import fallbackOpponentForms from "@/data/opponent-forms.json";
import fallbackOpponentFormsMeta from "@/data/opponent-forms-meta.json";

export interface RecentFormEntry {
  date: string;
  round: string;
  opponentFaced: string;
  isHome: boolean;
  result: "W" | "D" | "L";
  score: string;
  gameId?: number;
}

export interface KeyPlayer {
  name: string;
  position: string;
  note: string;
  profileUrl?: string;
}

export interface InjuryReport {
  name: string;
  status: string;
  expectedReturn: string;
  profileUrl?: string;
}

export interface OpponentScouting {
  opponent: string;
  recentForm: RecentFormEntry[];
  keyPlayers: KeyPlayer[];
  injuries: InjuryReport[];
  probableLineup: string[];
}

const RECENT_FORM_COUNT = 5;

const forms = fallbackOpponentForms as Record<string, RecentFormEntry[]>;
const scoutingData = fallbackScoutingData as Record<
  string,
  Pick<OpponentScouting, "keyPlayers" | "injuries" | "probableLineup">
>;

export async function getOpponentFormsUpdatedAt(): Promise<string | null> {
  if (!supabase) {
    return (fallbackOpponentFormsMeta as { updatedAt: string | null }).updatedAt ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("opponent_scouting")
      .select("updated_at")
      .limit(1)
      .single();

    if (error || !data) return (fallbackOpponentFormsMeta as { updatedAt: string | null }).updatedAt ?? null;
    return data.updated_at;
  } catch {
    return (fallbackOpponentFormsMeta as { updatedAt: string | null }).updatedAt ?? null;
  }
}

export async function getUpcomingOpponentScouting(
  opponentName: string
): Promise<OpponentScouting> {
  if (!supabase) {
    return getFallbackOpponentScouting(opponentName);
  }

  try {
    const { data, error } = await supabase
      .from("opponent_scouting")
      .select(`
        opponent,
        opponent_recent_form (*),
        opponent_key_players (*),
        opponent_injuries (*),
        opponent_probable_lineup (*)
      `)
      .eq("opponent", opponentName)
      .single();

    if (error || !data) {
      return getFallbackOpponentScouting(opponentName);
    }

    const recentForm = (data.opponent_recent_form || [])
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, RECENT_FORM_COUNT)
      .map((f: any) => ({
        date: f.date,
        round: "",
        opponentFaced: f.opponent_faced,
        isHome: false,
        result: f.result,
        score: f.score,
        gameId: f.game_id
      }));

    const probableLineup = (data.opponent_probable_lineup || [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((l: any) => l.player_name);

    const keyPlayers = (data.opponent_key_players || []).map((kp: any) => ({
      name: kp.name,
      position: kp.position,
      note: kp.note,
      profileUrl: kp.profile_url
    }));

    const injuries = (data.opponent_injuries || []).map((inj: any) => ({
      name: inj.name,
      status: inj.status,
      expectedReturn: inj.expected_return,
      profileUrl: inj.profile_url
    }));

    return {
      opponent: opponentName,
      recentForm: recentForm.length > 0 ? recentForm : ((forms[opponentName] ?? []).slice(0, RECENT_FORM_COUNT)),
      keyPlayers: keyPlayers.length > 0 ? keyPlayers : (scoutingData[opponentName]?.keyPlayers ?? []),
      injuries: injuries.length > 0 ? injuries : (scoutingData[opponentName]?.injuries ?? []),
      probableLineup: probableLineup.length > 0 ? probableLineup : (scoutingData[opponentName]?.probableLineup ?? [])
    };
  } catch {
    return getFallbackOpponentScouting(opponentName);
  }
}

const OPPONENT_ALIASES: Record<string, string> = {
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
};

function getFallbackOpponentScouting(opponentName: string): OpponentScouting {
  const normalized = OPPONENT_ALIASES[opponentName?.trim()] ?? opponentName?.trim();
  const teamData = scoutingData[normalized] ?? scoutingData[opponentName] ?? { keyPlayers: [], injuries: [], probableLineup: [] };
  const teamForms = forms[normalized] ?? forms[opponentName] ?? [];
  return {
    opponent: opponentName,
    recentForm: teamForms.slice(0, RECENT_FORM_COUNT),
    keyPlayers: teamData.keyPlayers,
    injuries: teamData.injuries,
    probableLineup: teamData.probableLineup,
  };
}

export async function getIncheonScouting(): Promise<Pick<OpponentScouting, "keyPlayers" | "injuries" | "probableLineup">> {
  if (!supabase) {
    const teamData = scoutingData["인천 유나이티드"] ?? { keyPlayers: [], injuries: [], probableLineup: [] };
    return {
      keyPlayers: teamData.keyPlayers,
      injuries: teamData.injuries,
      probableLineup: teamData.probableLineup,
    };
  }

  try {
    const { data, error } = await supabase
      .from("opponent_scouting")
      .select(`
        opponent_key_players (*),
        opponent_injuries (*),
        opponent_probable_lineup (*)
      `)
      .eq("opponent", "인천 유나이티드")
      .single();

    if (error || !data) {
      const teamData = scoutingData["인천 유나이티드"] ?? { keyPlayers: [], injuries: [], probableLineup: [] };
      return {
        keyPlayers: teamData.keyPlayers,
        injuries: teamData.injuries,
        probableLineup: teamData.probableLineup,
      };
    }

    const keyPlayers = (data.opponent_key_players || []).map((kp: any) => ({
      name: kp.name,
      position: kp.position,
      note: kp.note,
      profileUrl: kp.profile_url
    }));

    const injuries = (data.opponent_injuries || []).map((inj: any) => ({
      name: inj.name,
      status: inj.status,
      expectedReturn: inj.expected_return,
      profileUrl: inj.profile_url
    }));

    const probableLineup = (data.opponent_probable_lineup || [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((l: any) => l.player_name);

    return {
      keyPlayers: keyPlayers.length > 0 ? keyPlayers : (scoutingData["인천 유나이티드"]?.keyPlayers ?? []),
      injuries: injuries.length > 0 ? injuries : (scoutingData["인천 유나이티드"]?.injuries ?? []),
      probableLineup: probableLineup.length > 0 ? probableLineup : (scoutingData["인천 유나이티드"]?.probableLineup ?? []),
    };
  } catch {
    const teamData = scoutingData["인천 유나이티드"] ?? { keyPlayers: [], injuries: [], probableLineup: [] };
    return {
      keyPlayers: teamData.keyPlayers,
      injuries: teamData.injuries,
      probableLineup: teamData.probableLineup,
    };
  }
}
