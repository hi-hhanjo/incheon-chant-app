import { Metadata } from "next";
import Layout from "@/components/Layout";
import HistoryView from "@/components/history/HistoryView";
import { getAllSeasons, getRoundsBySeason } from "@/lib/api/historical";

export const metadata: Metadata = {
  title: "인천 유나이티드 역대 기록실 | K리그 2004~2026 전 구단 성적",
  description:
    "인천 유나이티드 창단 원년인 2004년부터 2026년 현재까지 K리그 전 구단의 연도별, 라운드별 경기 결과와 실시간 누적 순위표를 확인할 수 있는 공식 아카이브",
  openGraph: {
    title: "인천 유나이티드 역대 기록실 (2004~2026)",
    description: "연도별·라운드별 K리그 전 구단 성적 및 인천 유나이티드 순위 변동 아카이브",
  },
};

export default function HistoryPage() {
  const seasons = getAllSeasons();
  const initialYear = seasons[0]?.year ?? 2026;
  const initialRounds = getRoundsBySeason(initialYear);

  return (
    <Layout wide={true}>
      <HistoryView
        initialSeasons={seasons}
        initialYear={initialYear}
        initialRounds={initialRounds}
      />
    </Layout>
  );
}
