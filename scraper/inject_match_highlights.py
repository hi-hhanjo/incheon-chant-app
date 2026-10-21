import json
import os

base_dir = r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\data\historical"
seasons_file = os.path.join(base_dir, "seasons.json")
rounds_dir = os.path.join(base_dir, "rounds")

# 1. seasons.json에 featuredLegends 주입
with open(seasons_file, 'r', encoding='utf-8') as f:
    seasons = json.load(f)

featured_map = {
    2004: ["lim-joong-yong", "kim-yi-sub", "radoncic", "jeon-jae-ho"],
    2005: ["lim-joong-yong", "chang-woe-ryong", "kim-yi-sub", "radoncic", "jeon-jae-ho"],
    2006: ["lim-joong-yong", "chang-woe-ryong", "radoncic"],
    2007: ["lim-joong-yong", "chang-woe-ryong", "radoncic"],
    2008: ["lim-joong-yong", "radoncic"],
    2009: ["yoo-byung-soo", "lim-joong-yong"],
    2010: ["yoo-byung-soo", "nam-joon-jae"],
    2011: ["yoo-byung-soo", "lim-joong-yong"],
    2012: ["nam-joon-jae", "kim-yi-sub"],
    2013: ["nam-joon-jae"],
    2014: ["kim-do-hyuk", "lee-tae-hee"],
    2015: ["lee-tae-hee", "kim-do-hyuk"],
    2016: ["song-si-woo", "kim-do-hyuk"],
    2017: ["song-si-woo", "moon-seon-min"],
    2018: ["mugosa", "moon-seon-min", "elias-aguilar", "song-si-woo"],
    2019: ["yoo-sang-chul", "mugosa", "song-si-woo"],
    2020: ["mugosa", "elias-aguilar", "kim-do-hyuk", "song-si-woo"],
    2021: ["mugosa", "kim-do-hyuk", "elias-aguilar", "song-si-woo"],
    2022: ["mugosa", "lee-myung-joo", "kim-do-hyuk", "elias-aguilar"],
    2023: ["mugosa", "lee-myung-joo", "kim-do-hyuk"],
    2024: ["mugosa", "lee-myung-joo", "kim-do-hyuk"],
    2025: ["mugosa", "kim-do-hyuk"],
    2026: ["mugosa", "kim-do-hyuk"]
}

for s in seasons:
    y = s["year"]
    if y in featured_map:
        s["featuredLegends"] = featured_map[y]

with open(seasons_file, 'w', encoding='utf-8') as f:
    json.dump(seasons, f, ensure_ascii=False, indent=2)

print("Updated seasons.json with featuredLegends.")

# 2. 주요 명경기 하이라이트 영상 주입
# key: (year, round_num)
key_matches = {
    (2005, 12): {
        "youtubeId": "BNrKPAKmwWo",
        "title": "2005 K리그 전북전 7-0 대승 & 비상 늑대축구 신화",
        "tag": "🔥 구단 역대 최다골 대승 (7-0)"
    },
    (2005, 24): {
        "youtubeId": "BNrKPAKmwWo",
        "title": "2005 플레이오프 부산전 2-0 완승! 창단 2년차 챔프전 진출",
        "tag": "🏆 챔피언결정전 진출 신화"
    },
    (2010, 25): {
        "youtubeId": "exP4OmQA_Z4",
        "title": "2010 K리그 25R 포항전 유병수 4골 포트트릭 & 득점왕 확정",
        "tag": "👑 유병수 4골 포트트릭"
    },
    (2012, 22): {
        "youtubeId": "l2EaqV01p-k",
        "title": "2012 K리그 22R 대구전 남준재 결승골 & 숭의 19경기 무패 신화",
        "tag": "🏹 숭의 아레나 19경기 무패"
    },
    (2016, 38): {
        "youtubeId": "hkZYI1DX3gA",
        "title": "2016 K리그 38R 최종전 김용환 극장 결승골! 기적의 잔류 확정",
        "tag": "🛡️ 극적인 1부 잔류 확정"
    },
    (2017, 38): {
        "youtubeId": "W22kEa643lU",
        "title": "2017 K리그 38R 상주전 문선민 쐐기골 & 잔류 축포",
        "tag": "🚀 문선민 쐐기골 잔류"
    },
    (2018, 38): {
        "youtubeId": "W22kEa643lU",
        "title": "2018 K리그1 38R 전남전 3-1 대승! 무고사·문선민 관제탑 잔류",
        "tag": "✈️ 문선민 관제탑 잔류 매치"
    },
    (2019, 38): {
        "youtubeId": "lCmAITRY1Po",
        "title": "2019 K리그1 38R 최종전 경남 원정 0-0 무승부! 故 유상철 감독의 지켜낸 약속",
        "tag": "🕊️ 故 유상철 감독의 마지막 약속"
    },
    (2020, 27): {
        "youtubeId": "epdpDRx_aGs",
        "title": "2020 K리그1 27R 서울 원정 1-0 승! 아길라르 왼발 결승골 & 꼴찌의 기적",
        "tag": "🪄 서울전 원정 승리 & 기적 잔류"
    },
    (2022, 38): {
        "youtubeId": "l2EaqV01p-k",
        "title": "2022 K리그1 38R 최종전! 창단 19년 만의 첫 아시아 챔피언스리그(ACL) 진출 확정",
        "tag": "🌏 창단 첫 ACL 진출 대기록"
    },
    (2023, 37): {
        "youtubeId": "epdpDRx_aGs",
        "title": "2023 K리그1 37R 챔피언 울산전 3-1 완승! 무고사 쐐기골",
        "tag": "⚔️ 리그 챔피언 울산 격파"
    },
    (2024, 2): {
        "youtubeId": "epdpDRx_aGs",
        "title": "2024 K리그1 2R 서울전 린가드 출전 매치 & 숭의 3만 열기",
        "tag": "🏟️ 숭의 매진 빅매치"
    }
}

count_updated = 0
for (year, r_num), video_info in key_matches.items():
    season_file = os.path.join(rounds_dir, f"season_{year}.json")
    if not os.path.exists(season_file):
        continue
    with open(season_file, 'r', encoding='utf-8') as f:
        rounds_data = json.load(f)
    
    for r in rounds_data:
        if r.get("round") == r_num:
            r["incheonMatch"]["highlightVideo"] = video_info
            count_updated += 1
            break
            
    with open(season_file, 'w', encoding='utf-8') as f:
        json.dump(rounds_data, f, ensure_ascii=False, indent=2)

print(f"Updated {count_updated} key matches with highlightVideo!")
