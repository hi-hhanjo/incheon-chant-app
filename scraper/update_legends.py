import json
import os

legends_path = r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\data\legends.json"
output_dir = r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\public\images\legends"
os.makedirs(output_dir, exist_ok=True)

with open(legends_path, 'r', encoding='utf-8') as f:
    legends = json.load(f)

# 레전드별 primeSeason 매핑
prime_seasons = {
    "mugosa": 2020,
    "lim-joong-yong": 2005,
    "kim-do-hyuk": 2022,
    "yoo-byung-soo": 2010,
    "song-si-woo": 2016,
    "kim-yi-sub": 2005,
    "radoncic": 2005,
    "nam-joon-jae": 2012,
    "jeon-jae-ho": 2005,
    "lee-tae-hee": 2015,
    "lee-myung-joo": 2022,
    "chang-woe-ryong": 2005,
    "yoo-sang-chul": 2019,
}

for leg in legends:
    lid = leg["id"]
    if lid in prime_seasons:
        leg["primeSeason"] = prime_seasons[lid]
    leg["imageUrl"] = f"/images/legends/{lid}.svg"

# 문선민 & 아길라르 추가
moon_seon_min = {
    "id": "moon-seon-min",
    "name": "문선민",
    "nameEn": "Moon Seon-min",
    "number": 27,
    "position": "FW",
    "era": "SUNGUI_STABILITY",
    "period": "2017 ~ 2018",
    "status": "LEGEND",
    "imageUrl": "/images/legends/moon-seon-min.svg",
    "primeSeason": 2018,
    "video": {
        "youtubeId": "W22kEa643lU",
        "title": "인천의 폭격기 문선민 활약상 & 관제탑 세리머니 모음",
        "label": "🚀 관제탑 세리머니 스페셜"
    },
    "stats": {
        "appearances": 67,
        "goals": 18,
        "assists": 9,
        "titles": [
            "2018 러시아 월드컵 대한민국 국가대표 출전",
            "2018 K리그1 국내 선수 최다 득점 2위 (14골)",
            "인천 시민구단 소속 월드컵 본선 활약 레전드"
        ]
    },
    "lore": {
        "nickname": "관제탑 / 문스타",
        "signatureMove": "골을 넣은 직후 코너 플래그로 달려가 두 팔을 흔드는 유쾌한 '관제탑 댄스'",
        "quote": "인천 팬들의 열정적인 응원이 있었기에 제가 꿈에 그리던 월드컵 무대까지 뛸 수 있었습니다.",
        "communitySentiment": "K리그 무대에서 폭발적인 스피드와 드리블로 팬들의 가슴을 시원하게 뚫어준 크랙. 그가 관제탑 춤을 출 때마다 숭의 아레나는 웃음과 환희로 가득 찼습니다.",
        "story": "2017년 인천에 합류하여 무서운 성장세를 보였으며, 2018년 한 해 동안 14골 6도움을 몰아치며 K리그 최고의 윙어로 군림했습니다. 이 활약으로 인천 소속으로 2018 러시아 월드컵 최종 명단에 승선, 멕시코전과 독일전에 출전하며 구단의 큰 자랑이 되었습니다.",
        "signatureMoment": "2018년 12월 1일 전남과의 최종전에서 쐐기골을 터뜨리며 팀 잔류를 확정하고 화려한 관제탑 댄스를 선보인 순간."
    },
    "tags": ["관제탑", "월드컵스타", "폭격기", "2018잔류영웅"]
}

elias_aguilar = {
    "id": "elias-aguilar",
    "name": "엘리아스 아길라르",
    "nameEn": "Elías Aguilar",
    "number": 10,
    "position": "MF",
    "era": "ACL_MODERN",
    "period": "2018, 2020 ~ 2022",
    "status": "LEGEND",
    "imageUrl": "/images/legends/elias-aguilar.svg",
    "primeSeason": 2020,
    "video": {
        "youtubeId": "W7_VpP3Ww_U",
        "title": "[IUFC] 파검의 마법사 아길라르 명품 왼발 패스 & 결승골 모음",
        "label": "🪄 왼발 마술사 스페셜"
    },
    "stats": {
        "appearances": 112,
        "goals": 17,
        "assists": 23,
        "titles": [
            "2018 K리그1 베스트11 미드필더(MF)",
            "2018 K리그1 도움 2위 (10도움)",
            "2020 최종전 결승골 (기적의 잔류)",
            "2022 창단 첫 ACL 진출 주역"
        ]
    },
    "lore": {
        "nickname": "파검의 마법사 (El Mago)",
        "signatureMove": "수비수 3명을 바보로 만드는 마법 같은 노룩 스루패스와 왼발 감아차기 프리킥",
        "quote": "인천에 돌아왔을 때, 팬들이 보내준 환호는 제게 다시 뛸 수 있는 최고의 마법이었습니다.",
        "communitySentiment": "역대 인천 유니폼을 입은 외국인 미드필더 중 가장 천재적인 테크니션. 2020년 최하위 위기에서 여름 복귀 후 팀을 멱살 잡고 잔류시켰던 활약은 전설로 남아있습니다.",
        "story": "2018년 입단 첫해 35경기 3골 10도움으로 K리그1 베스트11에 선정되며 리그 최고의 플레이메이커로 공인받았습니다. 2020년 여름 인천이 강등 위기에 처했을 때 전격 임대 복귀하여 마법 같은 플레이로 기적의 잔류를 이끌었습니다.",
        "signatureMoment": "2020년 10월 31일 서울과의 원정 최종전에서 감각적인 왼발 결승골을 터뜨려 1-0 승리와 기적의 잔류를 완성한 순간."
    },
    "tags": ["파검의마법사", "왼발스페셜리스트", "2020잔류결승골", "베스트11"]
}

# 존재 확인 후 추가
existing_ids = [l["id"] for l in legends]
if "moon-seon-min" not in existing_ids:
    legends.append(moon_seon_min)
if "elias-aguilar" not in existing_ids:
    legends.append(elias_aguilar)

# 저장
with open(legends_path, 'w', encoding='utf-8') as f:
    json.dump(legends, f, ensure_ascii=False, indent=2)

print(f"legends.json updated. Total legends: {len(legends)}")

# 각 선수별 프리미엄 SVG 아바타 에셋 생성
def generate_legend_svg(legend):
    lid = legend["id"]
    name = legend["name"]
    pos = legend["position"]
    num = legend.get("number", "★")
    is_memorial = legend.get("status") == "MEMORIAL"
    is_mgr = pos == "MGR"
    
    # 테마 색상 (인천 블루 / 블랙 / 골드)
    bg_gradient = ("#4a2800", "#1a1200") if is_memorial else ("#003882", "#070b14")
    accent_color = "#f59e0b" if is_memorial else "#3b82f6"
    badge_color = "#eab308" if is_memorial else "#60a5fa"
    
    initials = name[0] if name else "I"
    if name.startswith("故"):
        initials = name[2]
        
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg-{lid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{bg_gradient[0]}"/>
      <stop offset="100%" stop-color="{bg_gradient[1]}"/>
    </linearGradient>
    <linearGradient id="stripe" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#001a40" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#001a40" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  
  <!-- 배경 원형 -->
  <rect width="200" height="200" rx="36" fill="url(#bg-{lid})"/>
  
  <!-- 인천 파랑검정 스트라이프 라인 -->
  <path d="M40 0 L70 200 M100 0 L130 200 M160 0 L190 200" stroke="#0052cc" stroke-width="14" stroke-opacity="0.25"/>
  <path d="M20 0 L50 200 M80 0 L110 200 M140 0 L170 200" stroke="#000000" stroke-width="12" stroke-opacity="0.4"/>
  
  <!-- 중앙 실루엣 / 유니폼 아이콘 -->
  <circle cx="100" cy="85" r="42" fill="{accent_color}" fill-opacity="0.2" stroke="{accent_color}" stroke-width="2"/>
  
  <!-- 선수 이름 이니셜 / 심볼 -->
  <text x="100" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle">{initials}</text>
  
  <!-- 하단 뱃지 (등번호 및 포지션) -->
  <rect x="35" y="142" width="130" height="34" rx="17" fill="#000000" fill-opacity="0.75" stroke="{badge_color}" stroke-width="1.5"/>
  <text x="100" y="164" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">
    {f"No.{num} · {pos}" if not is_mgr else f"감독 · {pos}"}
  </text>
  
  <!-- 외곽 테두리 -->
  <rect x="2" y="2" width="196" height="196" rx="34" fill="none" stroke="{accent_color}" stroke-width="2" stroke-opacity="0.5"/>
</svg>'''
    
    file_path = os.path.join(output_dir, f"{lid}.svg")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

for leg in legends:
    generate_legend_svg(leg)

print(f"Generated {len(legends)} SVG legend avatars in {output_dir}")
