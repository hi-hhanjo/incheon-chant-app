import json

seasons_file = r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\data\historical\seasons.json"
with open(seasons_file, 'r', encoding='utf-8') as f:
    seasons = json.load(f)

lines = []
for s in seasons:
    y = s["year"]
    rank = s["incheonRank"]
    rec = s["record"]
    traj = s.get("trajectory", [])
    traj_last = traj[-1] if traj else None
    t_teams = s["totalTeams"]
    t_rounds = s["totalRounds"]
    lines.append(f"{y}년: {s['name']} | 최종 {rank}위/{t_teams}팀 | 총{t_rounds}R | 전적: {rec['win']}승 {rec['draw']}무 {rec['lose']}패 (승점 {rec['points']}) | traj끝: {traj_last}위 | traj길이: {len(traj)}")

with open(r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\scraper\seasons_summary.txt", 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))
print("Saved summary.")
