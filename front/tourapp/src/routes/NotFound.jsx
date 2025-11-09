// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-3xl font-bold">404 - 페이지를 찾을 수 없습니다</h2>
        <Link to="/" className="text-blue-600">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}