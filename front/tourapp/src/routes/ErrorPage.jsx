// src/pages/ErrorPage.jsx
import { useLocation, Link } from "react-router-dom";

export default function ErrorPage() {
  const loc = useLocation();
  const msg = loc.state?.message || "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">오류가 발생했습니다</h2>
        <p className="mb-4 text-gray-700">{msg}</p>
        <div className="flex gap-2">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">홈으로</Link>
        </div>
      </div>
    </div>
  );
}