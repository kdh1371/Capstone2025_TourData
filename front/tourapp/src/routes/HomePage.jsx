// src/pages/HomePage.jsx
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [sigunguCode, setSigunguCode] = useState(""); // areaCode로 보낼 값
  const [sigunguName, setSigunguName] = useState("전체");
  const [openRegion, setOpenRegion] = useState(false);
  const navigate = useNavigate();

  const regions = [
    { code: "", name: "전체" },
    { code: "1", name: "서울" },
    { code: "2", name: "부산" },
    { code: "3", name: "대구" },
    { code: "4", name: "인천" },
  ];

  const handleSearch = () => {
    if (!keyword.trim() && !sigunguCode) return;
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (sigunguCode) params.set("areaCode", sigunguCode);
    navigate(`/search?${params.toString()}`);
    // 검색 후 인풋 초기화는 UX에 따라 유지/제거 가능
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 bg-gray-100">
        <div className="flex gap-2 relative w-full">
          <div className="relative">
            <button
              onClick={() => setOpenRegion(!openRegion)}
              className="h-12 px-4 border border-gray-300 rounded bg-white flex items-center gap-1"
            >
              {sigunguName}
              <ChevronDown className="w-4 h-4" />
            </button>

            {openRegion && (
              <ul className="absolute z-10 mt-1 w-40 bg-white border rounded shadow">
                {regions.map((region) => (
                  <li key={region.code}>
                    <label
                      htmlFor={region.code || "all"}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="radio"
                        id={region.code || "all"}
                        name="sigungu"
                        value={region.code}
                        checked={sigunguCode === region.code}
                        onChange={() => {
                          setSigunguCode(region.code);
                          setSigunguName(region.name);
                          setOpenRegion(false);
                        }}
                      />
                      {region.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요"
              onKeyDown={handleEnter}
              className="w-full pr-14 pl-4 h-12 text-base border border-gray-300 rounded focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 w-12 flex items-center justify-center border-l border-gray-300 rounded-r bg-gray-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <main className="p-4 space-y-6 flex-1 overflow-auto">
        <div>
          <h2 className="text-lg font-semibold mb-2">공지사항</h2>
          <ul className="space-y-2">
            <li className="border-b pb-2">📢 가을 여행 특별 이벤트 안내</li>
            <li className="border-b pb-2">📢 검색 서비스 일시 중단 공지</li>
            <li className="border-b pb-2">📢 신규 여행지 데이터 업데이트</li>
          </ul>
        </div>
      </main>
    </div>
  );
}