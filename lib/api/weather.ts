export interface MatchWeather {
  temperature: number; // 기온 (°C)
  apparentTemperature: number; // 체감온도 (°C)
  precipitation: number; // 강수량 (mm)
  weatherCode: number; // WMO 코드
  weatherLabel: string; // 날씨 설명
  weatherIcon: string; // 이모지
  windSpeed: number; // 풍속 (km/h)
}

// K리그 주요 구장 좌표 (위도, 경도)
const STADIUM_COORDINATES: Record<string, { lat: number; lon: number; name: string }> = {
  // 홈: 숭의 아레나 (인천축구전용경기장)
  incheon: { lat: 37.4661, lon: 126.6432, name: "인천축구전용경기장(숭의아레나)" },
  // K리그1/2 원정 구장
  "울산 HD": { lat: 35.5353, lon: 129.2595, name: "울산문수축구경기장" },
  "FC서울": { lat: 37.5683, lon: 126.8972, name: "서울월드컵경기장" },
  "전북 현대": { lat: 35.8681, lon: 127.0644, name: "전주월드컵경기장" },
  "포항 스틸러스": { lat: 35.9977, lon: 129.3845, name: "포항스틸야드" },
  "광주FC": { lat: 35.1386, lon: 126.8778, name: "광주축구전용구장" },
  "대구FC": { lat: 35.8812, lon: 128.5882, name: "DGB대구은행파크" },
  "대전 하나시티즌": { lat: 36.3653, lon: 127.3248, name: "대전월드컵경기장" },
  "제주 유나이티드": { lat: 33.2462, lon: 126.5093, name: "제주월드컵경기장" },
  "강원FC": { lat: 37.8548, lon: 127.6905, name: "춘천송암스포츠타운" },
  "수원FC": { lat: 37.2997, lon: 127.0112, name: "수원종합운동장" },
  "김천 상무": { lat: 36.1428, lon: 128.0935, name: "김천종합운동장" },
  "부천FC 1995": { lat: 37.5031, lon: 126.7984, name: "부천종합운동장" },
  "FC안양": { lat: 37.4048, lon: 126.9478, name: "안양종합운동장" },
};

function parseWmoCode(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "맑음", icon: "☀️" };
  if (code === 1) return { label: "대체로 맑음", icon: "🌤️" };
  if (code === 2) return { label: "구름 조금", icon: "⛅" };
  if (code === 3) return { label: "흐림", icon: "☁️" };
  if ([45, 48].includes(code)) return { label: "안개", icon: "🌫️" };
  if ([51, 53, 55].includes(code)) return { label: "이슬비", icon: "🌦️" };
  if ([61, 63, 65, 80, 81, 82].includes(code)) return { label: "비", icon: "🌧️" };
  if ([71, 73, 75, 85, 86].includes(code)) return { label: "눈", icon: "❄️" };
  if ([95, 96, 99].includes(code)) return { label: "뇌우", icon: "⛈️" };
  return { label: "구름", icon: "☁️" };
}

export async function getMatchWeather(isHome: boolean, opponent?: string): Promise<MatchWeather | null> {
  try {
    const coords = isHome || !opponent
      ? STADIUM_COORDINATES.incheon
      : (STADIUM_COORDINATES[opponent] || STADIUM_COORDINATES.incheon);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FSeoul`;

    const res = await fetch(url, {
      next: { revalidate: 1800 }, // 30분 캐시
    });

    if (!res.ok) return null;
    const json = await res.json();
    const cur = json.current;
    if (!cur) return null;

    const { label, icon } = parseWmoCode(cur.weather_code);

    return {
      temperature: Math.round(cur.temperature_2m),
      apparentTemperature: Math.round(cur.apparent_temperature),
      precipitation: cur.precipitation,
      weatherCode: cur.weather_code,
      weatherLabel: label,
      weatherIcon: icon,
      windSpeed: Math.round(cur.wind_speed_10m),
    };
  } catch (e) {
    console.error("Match weather fetch failed:", e);
    return null;
  }
}
