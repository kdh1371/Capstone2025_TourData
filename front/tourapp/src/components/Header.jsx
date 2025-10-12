import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* 로고/사이트명 */}
        <h1 className="text-xl font-bold">오픈데이터 여행</h1>

        {/* 네비게이션 */}
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            홈
          </Link>
          <Link
            to="/search"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            검색
          </Link>
        </nav>
      </div>
    </header>
  );
}