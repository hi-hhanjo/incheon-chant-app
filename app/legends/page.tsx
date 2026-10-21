import { Metadata } from "next";
import Layout from "@/components/Layout";
import LegendView from "@/components/legends/LegendView";
import { getAllLegends } from "@/lib/api/legends";

export const metadata: Metadata = {
  title: "인천 유나이티드 레전드 명예의 전당 | IUFC Legends",
  description:
    "2003년 창단부터 현재까지 인천 유나이티드를 빛낸 레전드 선수와 사령탑들의 객관적 경기 기록, 팬덤 커뮤니티 스토리, 애칭 및 응원가 아카이브",
  openGraph: {
    title: "인천 유나이티드 레전드 명예의 전당",
    description: "인천 유나이티드 역사를 빛낸 레전드 선수들의 스탯과 팬덤 스토리",
  },
};

export default function LegendsPage() {
  const legends = getAllLegends();

  return (
    <Layout wide={true}>
      <LegendView initialLegends={legends} />
    </Layout>
  );
}
