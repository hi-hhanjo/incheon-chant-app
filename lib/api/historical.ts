import seasonsData from "@/data/historical/seasons.json";
import { SeasonInfo, HistoricalRound } from "@/types/historical";
import fs from "fs";
import path from "path";

export function getAllSeasons(): SeasonInfo[] {
  return seasonsData as SeasonInfo[];
}

export function getSeasonByYear(year: number): SeasonInfo | undefined {
  return (seasonsData as SeasonInfo[]).find((s) => s.year === year);
}

export function getRoundsBySeason(year: number): HistoricalRound[] {
  try {
    const filePath = path.join(process.cwd(), "data", "historical", "rounds", `season_${year}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as HistoricalRound[];
    }
  } catch (e) {
    console.error(`Failed to load rounds for season ${year}:`, e);
  }
  return [];
}
