import { NextRequest, NextResponse } from "next/server";
import { getAllSeasons, getRoundsBySeason } from "@/lib/api/historical";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const yearParam = searchParams.get("year");

  if (!yearParam) {
    const seasons = getAllSeasons();
    return NextResponse.json({ seasons });
  }

  const year = parseInt(yearParam, 10);
  if (isNaN(year)) {
    return NextResponse.json({ error: "Invalid year parameter" }, { status: 400 });
  }

  const rounds = getRoundsBySeason(year);
  return NextResponse.json({ year, rounds });
}
