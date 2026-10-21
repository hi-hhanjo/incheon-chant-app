import json

def update_legends():
    with open("data/legends.json", "r", encoding="utf-8") as f:
        legends = json.load(f)

    updates = {
        "mugosa": {
            "period": "2018 ~ 2022, 2023 ~ 현재",
            "status": "ACTIVE",
            "currentClub": "인천 유나이티드",
            "titles": [
                "인천 유나이티드 구단 역대 최다 득점자",
                "2020 K리그1 베스트11 공격수(FW)",
                "2018~2021 4시즌 연속 두 자릿수 득점",
                "2024 K리그1 득점왕 (15골)",
                "2025 K리그2 득점왕 (20골) 및 베스트11",
                "2025 K리그2 우승 및 1부 승격 주역"
            ]
        },
        "lim-joong-yong": {
            "period": "2004 ~ 2011",
            "status": "LEGEND",
            "currentClub": "은퇴 (구단 행정가)",
        },
        "kim-do-hyuk": {
            "period": "2014 ~ 2025 (2018~2019 군 복무)",
            "status": "LEGEND",
            "currentClub": "김포 FC (2026~)",
            "appearances": 284,
            "titles": [
                "인천 유나이티드 구단 통산 최다 출전 2위",
                "2022 K리그1 4위 및 창단 첫 ACL 진출 주역",
                "2025 K리그2 우승 및 1부 승격 주역",
                "인천 유나이티드 주장 및 부주장 다수 역임",
                "K리그 통산 300경기 출전 클럽"
            ],
            "quote": "파랑검정 유니폼을 입고 뛰었던 11년의 시간은 제 축구 인생 최고의 영광이었습니다.",
            "communitySentiment": "커뮤니티에서 가장 친근하면서도 뜨거운 사랑을 받았던 프랜차이즈 스타. 팀이 힘들 때 팬들을 다독이고 승리 후엔 앞장서서 물세례를 던졌던 '우리의 김도혁'. 2025년 우승과 승격을 선물하고 2026시즌 김포 FC로 이적했습니다.",
            "story": "2014년 자유선발로 인천에 입단하여 군 복무(아산 무궁화) 기간을 제외하고 10년이 넘는 시간 동안 중원을 지켰습니다. 팀이 잔류 경쟁에 처했을 때마다 눈물과 투혼으로 팀을 구했고, 2022년 창단 첫 ACL 진출과 2025년 K리그2 우승 및 1부 승격이라는 찬란한 마침표를 찍은 뒤 2026시즌 김포 FC로 이적했습니다.",
            "tags": ["인천의아들", "하프스타", "최다출전2위", "우승주역", "현김포FC"]
        },
        "yoo-byung-soo": {
            "period": "2009 ~ 2011",
            "status": "LEGEND",
            "currentClub": "화성 FC (2023~)",
        },
        "song-si-woo": {
            "period": "2016 ~ 2024 (군 복무·임대 제외)",
            "status": "LEGEND",
            "currentClub": "현역 은퇴 (2025 경남 FC)",
            "story": "2016년 단국대를 졸업하고 입단하자마자 데뷔전부터 후반 추가시간 극장골을 터뜨리며 '시우 타임'의 서막을 열었습니다. 인천이 매 시즌 강등의 벼랑 끝에 섰던 가을마다 그의 발끝에서 터진 골로 수많은 기적 같은 잔류를 낚아챘으며, 2024시즌까지 활약한 뒤 경남 FC를 거쳐 현역에서 은퇴했습니다."
        },
        "kim-yi-sub": {
            "period": "2004 ~ 2010",
            "status": "LEGEND",
            "currentClub": "은퇴 (전 인천 GK 코치)",
        },
        "radoncic": {
            "period": "2004 ~ 2008 (2007 후반기 임대)",
            "status": "LEGEND",
            "currentClub": "은퇴 (축구 지도자)",
        },
        "nam-joon-jae": {
            "period": "2010, 2012 ~ 2014, 2018 ~ 2019",
            "status": "LEGEND",
            "currentClub": "은퇴 (축구 지도자)",
        },
        "jeon-jae-ho": {
            "period": "2004 ~ 2011",
            "status": "LEGEND",
            "currentClub": "은퇴 (축구 지도자)",
        },
        "lee-tae-hee": {
            "period": "2014 ~ 현재 (2024~2025 군 복무)",
            "status": "ACTIVE",
            "currentClub": "인천 유나이티드",
            "story": "인천 대건고 1기 출신으로 2014년 프로 직행 후 10년 넘게 인천의 골문을 지켜온 성골 원클럽맨 골키퍼입니다. 2015년 FA컵 4강 승부차기에서 신들린 선방으로 결승 진출을 견인했고, 매 시즌 잔류 전쟁에서 결정적인 선방을 거듭했습니다. 2024~2025년 거제시민축구단에서 대체복무를 마친 후 인천으로 복귀하여 활약을 이어가고 있습니다."
        },
        "lee-myung-joo": {
            "period": "2022 ~ 현재",
            "status": "ACTIVE",
            "currentClub": "인천 유나이티드",
            "titles": [
                "2022 창단 첫 아시아 챔피언스리그(ACL) 진출 주역",
                "2025 K리그2 우승 주장 및 1부 승격 주역",
                "2025 K리그2 베스트11 미드필더(MF)",
                "인천 유나이티드 주장 역임",
                "K리그 통산 10경기 연속 공격포인트 대기록 보유자"
            ]
        },
        "chang-woe-ryong": {
            "period": "2004 ~ 2008 (2007 축구유학 제외)",
            "status": "LEGEND",
            "currentClub": "축구 지도자·행정가",
            "story": "2004년 후반기 감독 대행으로 부임하여 2005년 정식 감독으로서 '늑대축구'를 완성했습니다. 대기업 구단들을 연파하며 전·후기 통합 승점 1위를 기록하고 챔피언결정전에 진출했으며, 1년간의 영국 연수 후 2008년 복귀까지 인천 축구 역사상 가장 찬란했던 낭만을 이끌었습니다. 이 드라마틱한 여정은 축구 영화 <비상>으로 제작되었습니다."
        },
        "yoo-sang-chul": {
            "period": "2019",
            "status": "MEMORIAL",
            "currentClub": "영구 메모리얼 (상설 추모관)",
        },
        "moon-seon-min": {
            "period": "2017 ~ 2018",
            "status": "LEGEND",
            "currentClub": "FC 서울 (2025~)",
        },
        "elias-aguilar": {
            "period": "2018, 2020 ~ 2022",
            "status": "LEGEND",
            "currentClub": "CS 에레디아노 (2023~)",
        }
    }

    for item in legends:
        lid = item["id"]
        if lid in updates:
            u = updates[lid]
            if "period" in u:
                item["period"] = u["period"]
            if "status" in u:
                item["status"] = u["status"]
            if "currentClub" in u:
                item["currentClub"] = u["currentClub"]
            if "titles" in u:
                item["stats"]["titles"] = u["titles"]
            if "appearances" in u:
                item["stats"]["appearances"] = u["appearances"]
            if "quote" in u:
                item["lore"]["quote"] = u["quote"]
            if "communitySentiment" in u:
                item["lore"]["communitySentiment"] = u["communitySentiment"]
            if "story" in u:
                item["lore"]["story"] = u["story"]
            if "tags" in u:
                item["tags"] = u["tags"]

    with open("data/legends.json", "w", encoding="utf-8") as f:
        json.dump(legends, f, ensure_ascii=False, indent=2)

    print("Successfully updated all 15 legends in data/legends.json!")

if __name__ == "__main__":
    update_legends()
