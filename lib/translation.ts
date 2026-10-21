/**
 * K리그1 선수명 및 부상/결장 사유 한글 변환 매핑 모듈
 */

const PLAYER_NAME_MAP: Record<string, string> = {
  // 울산
  "Erick Farias": "에릭",
  "Thomas Oude Kotte": "토마스",
  "Yago Cariello": "야고",
  "Gustav Ludwigson": "루빅손",
  "Ataru Esaka": "아타루",
  "Darijan Bojanic": "보야니치",
  "Joo Min-kyu": "주민규",
  "Jo Hyeon-woo": "조현우",

  // 포항
  "Sung-wook Jo": "조성욱",
  "Jorge Teixeira": "조르지",
  "Wanderson": "완델손",
  "Oberdan": "오베르단",
  "Lee Ho-jae": "이호재",

  // 인천
  "Stefan Mugosa": "무고사",
  "Seung-won Yeo": "여승원",
  "Ji-hwan Mun": "문지환",
  "Won-jin Jung": "정원진",
  "Tae-heui Lee": "이태희",
  "Paul-Jose M'Poku": "음포쿠",
  "Gerso Fernandes": "제르소",
  "Harrison Delbridge": "델브리지",
  "Kim Gun-hee": "김건희",
  "Sin Jin-ho": "신진호",

  // 서울
  "Sang-min Lee": "이상민",
  "Jesse Lingard": "린가드",
  "Stanislav Iljutcenko": "일류첸코",
  "Willyan": "윌리안",
  "Ki Sung-yueng": "기성용",
  "Cho Young-wook": "조영욱",

  // 전북
  "Ju-yeong Park": "박주영",
  "Andrea Compagno": "티아고",
  "Tae-hwan Kim": "김태환",
  "Song Min-kyu": "송민규",
  "Lee Seung-woo": "이승우",
  "Andrigo": "안드리고",
  "Nana Boateng": "보아텡",

  // 대전
  "Chang-rae Ha": "하창래",
  "Won-sang Um": "엄원상",
  "Young-jae Seo": "서영재",
  "Masatoshi Ishida": "마사",
  "Kelvin": "켈빈",
  "Hernandes": "에르난데스",

  // 부천
  "Seung-bin Kim": "김승빈",
  "Jong-woo Kim": "김종우",
  "Rodrigo Bassani": "바사니",
  "Jhon Montano": "몬타뇨",

  // 광주
  "Kyoung-rok Choi": "최경록",
  "Jasir Asani": "아사니",
  "Gabriel Tigrao": "가브리엘",
  "Beka Mikeltadze": "베카",

  // 제주
  "Chang-min Lee": "이창민",
  "Tobias Figueiredo": "피게이레두",
  "Yuri Jonathan": "유리 조나탄",
  "Reis": "헤이스",
  "Italo": "이탈로",
  "Seo Jin-su": "서진수",
  "Kim Dong-jun": "김동준",

  // 강원
  "Yang Min-hyeok": "양민혁",
  "Yago": "야고",
  "Vitor Gabriel": "가브리엘",
  "Marko Tuci": "투치",
  "Lee Sang-heon": "이상헌",

  // 김천 & 안양
  "Kim Dae-won": "김대원",
  "Won Du-jae": "원두재",
  "Yago Cesar": "야고",
  "Matheus Oliveira": "마테우스",
  "Danrlei": "단레이"
};

const INJURY_MAP: Record<string, string> = {
  "unknown injury": "부상 (상세불명)",
  "Achilles tendon surgery": "아킬레스건 수술",
  "Ankle sprain": "발목 염좌",
  "Ankle injury": "발목 부상",
  "Muscle injury": "근육 부상",
  "Vertebral injury": "척추/허리 부상",
  "Cruciate ligament tear": "십자인대 파열",
  "Cruciate ligament injury": "십자인대 부상",
  "Hamstring injury": "햄스트링 부상",
  "Hamstring muscle injury": "햄스트링 근육 부상",
  "Meniscal injury": "반월판 연골 부상",
  "Knee injury": "무릎 부상",
  "Knee surgery": "무릎 수술",
  "Calf injury": "종아리 부상",
  "Groin injury": "사타구니 부상",
  "Adductor injury": "내전근 부상",
  "Knock": "단순 타박상",
  "Fracture": "골절",
  "Foot injury": "발 부상",
  "Thigh injury": "허벅지 부상",
  "Shoulder injury": "어깨 부상",
  "Concussion": "뇌진탕",
  "Illness": "컨디션 난조/질환",
  "Suspended": "경고 누적/퇴장 출장정지"
};

/**
 * 영문 선수명을 한글로 변환 (등록되지 않은 영문명은 로마자 그대로 반환)
 */
export function translatePlayerName(name: string): string {
  if (!name) return "";
  return PLAYER_NAME_MAP[name] ?? name;
}

/**
 * 영문 부상/결장 상태를 친숙한 한글 축구 용어로 변환
 */
export function translateInjuryStatus(status: string): string {
  if (!status) return "미상";
  if (status.includes("/")) {
    return status
      .split("/")
      .map((s) => s.trim())
      .map((s) => INJURY_MAP[s] ?? s)
      .join(" / ");
  }
  return INJURY_MAP[status] ?? status;
}
