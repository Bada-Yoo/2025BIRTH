import { Link } from "react-router-dom";

export default function NumberBox({ n, solved, letter }) {
  if (solved) {
    return (
      <div className="box solved" aria-disabled>
        <span className="letter">{letter}</span>
        <span className="num-mini">#{n}</span>
      </div>
    );
  }
  return (
    <Link to={`/${n}`} className="box" aria-label={`${n}번 문제로 이동`}>
      <div className="num">{n}</div>
    </Link>
  );
}
