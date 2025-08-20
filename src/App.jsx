import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Question from "./pages/Question.jsx";
import BackgroundDecor from "./components/BackgroundDecor.jsx";

export default function App() {
  return (
    <div className="app-container">
      <BackgroundDecor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Question />} />
        {/*잘못된 경로는 메인으로*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
