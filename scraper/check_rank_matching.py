import json
import os

base_dir = r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\data\historical"
seasons_file = os.path.join(base_dir, "seasons.json")
rounds_dir = os.path.join(base_dir, "rounds")

with open(seasons_file, 'r', encoding='utf-8') as f:
    seasons = json.load(f)

out = []
out.append("=== 연도별 seasons.json vs rounds JSON 데이터 전수 비교 ===")
discrepancies = []

for s in seasons:
    year = s["year"]
    s_rank = s["incheonRank"]
    traj = s.get("trajectory", [])
    traj_last = traj[-1] if traj else None
    traj_len = len(traj)
    total_rounds = s.get("totalRounds")
    
    round_file = os.path.join(rounds_dir, f"season_{year}.json")
    if not os.path.exists(round_file):
        out.append(f"[{year}] FILE MISSING: {round_file}")
        continue
        
    with open(round_file, 'r', encoding='utf-8') as f:
        rounds_data = json.load(f)
        
    actual_rounds_count = len(rounds_data)
    last_round_data = rounds_data[-1] if rounds_data else None
    
    # 마지막 라운드의 순위표에서 인천 순위 찾기
    incheon_final_standing_rank = None
    if last_round_data:
        for row in last_round_data.get("standings", []):
            if "인천" in row.get("team", ""):
                incheon_final_standing_rank = row.get("rank")
                break
                
    # 라운드별 순위표에서 각 라운드 인천 순위와 trajectory 일치 여부 확인
    traj_mismatches = []
    for idx, r_data in enumerate(rounds_data):
        r_num = r_data.get("round", idx + 1)
        r_rank = None
        for row in r_data.get("standings", []):
            if "인천" in row.get("team", ""):
                r_rank = row.get("rank")
                break
        expected_traj_rank = traj[idx] if idx < len(traj) else None
        if r_rank != expected_traj_rank:
            traj_mismatches.append((r_num, r_rank, expected_traj_rank))

    issue = []
    if s_rank != incheon_final_standing_rank:
        issue.append(f"최종순위 불일치: seasons.json={s_rank}위 vs 최종R standings={incheon_final_standing_rank}위")
    if s_rank != traj_last:
        issue.append(f"궤적끝값 불일치: seasons.json={s_rank}위 vs trajectory끝값={traj_last}위")
    if incheon_final_standing_rank != traj_last:
        issue.append(f"standings끝값({incheon_final_standing_rank}) != trajectory끝값({traj_last})")
    if total_rounds != actual_rounds_count:
        issue.append(f"총 라운드 수 불일치: seasons={total_rounds} vs rounds_data={actual_rounds_count}")
    if len(traj_mismatches) > 0:
        issue.append(f"라운드별 순위표와 trajectory 불일치 {len(traj_mismatches)}건 (예: R{traj_mismatches[0][0]}: standings={traj_mismatches[0][1]} vs traj={traj_mismatches[0][2]})")

    status = "[ERROR]" if issue else "[OK]"
    out.append(f"[{year}] {s['name']} | 최종설정:{s_rank}위 | standings최종:{incheon_final_standing_rank}위 | traj끝:{traj_last}위 | {status}")
    if issue:
        for iss in issue:
            out.append(f"    -> {iss}")
        discrepancies.append((year, issue))

out.append(f"\n총 {len(seasons)}개 시즌 중 불일치 발생 시즌: {len(discrepancies)}개")

report_path = r"c:\Users\whdl2\OneDrive\문서\vibe_coding\project\incheon-chant-app\scraper\rank_check_report.txt"
with open(report_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(out))

print(f"Report written to {report_path}. Found {len(discrepancies)} issues.")
