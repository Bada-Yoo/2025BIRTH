import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ANSWER_KEY } from "../utils/answerKey.js";

const TOTAL = 43;
const storageKey = "quiz43_solved_map_v1";

function normalizeAnswer(s) {
  if (typeof s !== "string") return "";
  const t = s.trim();
  return /[a-zA-Z]/.test(t) ? t.toLowerCase() : t;
}

export default function Question() {
  const { id } = useParams();
  const n = Number(id);
  const navigate = useNavigate();

  const valid = useMemo(() => Number.isInteger(n) && n >= 1 && n <= TOTAL, [n]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!valid) navigate("/", { replace: true });
  }, [valid, navigate]);
  useEffect(() => {
    setInput("");
    setFeedback(null);
  }, [n]);

  const onSubmit = (e) => {
    e.preventDefault();
    const correct = ANSWER_KEY[n] ?? "";
    if (!correct) {
      alert("정답이 아직 설정되지 않았습니다. answerKey.js를 채워주세요.");
      return;
    }
    const ok = normalizeAnswer(input) === normalizeAnswer(correct);
    const saved = localStorage.getItem(storageKey);
    const solvedMap = saved ? JSON.parse(saved) : {};

    if (ok) {
      solvedMap[n] = true;
      localStorage.setItem(storageKey, JSON.stringify(solvedMap));
      setFeedback({ type: "ok", text: "맞았습니다!" });
      setTimeout(() => navigate("/"), 600);
    } else {
      setFeedback({ type: "error", text: "틀렸습니다!" });
      setTimeout(() => navigate("/1", { replace: true }), 600);
    }
  };

  const onGuide = () =>
    alert(`힌트(예시): ${n}번 문제의 힌트를 여기에 적어주세요.`);

  return (
    <div className="page">
      {/* 헤더: 좌측 n번 / 우측 메인으로 */}
      <div className="header split">
        <h1>{n}번</h1>
        <Link to="/" className="btn muted">
          메인으로
        </Link>
      </div>

      <div className="card">
        <div>정답을 입력하세요.</div>

        {/* 입력 50% / 버튼그룹 50% */}
        <form className="form-row" onSubmit={onSubmit}>
          <div className="col-input">
            <input
              className="input"
              placeholder="정답 입력"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </div>

          <div className="col-actions">
            <button type="button" className="btn guide" onClick={onGuide}>
              가이드
            </button>
            <button type="submit" className="btn submit">
              제출
            </button>
          </div>
        </form>

        {feedback && (
          <div
            className={`feedback ${feedback.type === "ok" ? "ok" : "error"}`}
          >
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
}
