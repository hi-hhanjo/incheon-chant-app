import legendsData from "@/data/legends.json";
import { Legend, LegendPosition, LegendEra } from "@/types/legend";

export function getAllLegends(): Legend[] {
  return legendsData as Legend[];
}

export function getLegendById(id: string): Legend | undefined {
  return (legendsData as Legend[]).find((l) => l.id === id);
}

export function filterLegends(
  position: LegendPosition | "ALL" = "ALL",
  era: LegendEra | "ALL" = "ALL",
  searchQuery: string = ""
): Legend[] {
  return (legendsData as Legend[]).filter((legend) => {
    // Position filter
    if (position !== "ALL" && legend.position !== position) {
      return false;
    }
    // Era filter
    if (era !== "ALL" && legend.era !== era) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = legend.name.toLowerCase().includes(q);
      const matchEn = legend.nameEn.toLowerCase().includes(q);
      const matchNick = legend.lore.nickname.toLowerCase().includes(q);
      const matchTags = legend.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchEn && !matchNick && !matchTags) {
        return false;
      }
    }
    return true;
  });
}
