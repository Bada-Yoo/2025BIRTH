// src/pages/Home.jsx — 헤더 문구/카운터 위치는 이전 답변과 동일, 문구만 확정
import NumberBox from "../components/NumberBox.jsx";
import { SECRET_43 } from "../utils/secretString.js";
import { useEffect, useState } from "react";

const TOTAL = 43;
const storageKey = "quiz43_solved_map_v1";

export default function Home() {
  const [solvedMap, setSolvedMap] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setSolvedMap(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;

  return (
    <div className="page">
      <div className="header">
        <h1>귀하의 생일을 축하합니다!</h1>
        <div className="sub">숫자를 눌러 정답을 맞춰보세요</div>
      </div>

      <div className="grid">
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => {
          const solved = !!solvedMap[n];
          const letter = solved ? SECRET_43[n - 1] : null;
          return <NumberBox key={n} n={n} solved={solved} letter={letter} />;
        })}
      </div>

      <div className="grid-footer">
        맞춘 개수: <strong>{solvedCount}</strong> / {TOTAL}
      </div>
    </div>
  );
}
