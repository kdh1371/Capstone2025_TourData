import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

// 가짜 API 응답 시뮬레이션
function fakeFetch(keyword, sigunguCode = "", page = 1, numOfRows = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalCount = 53; // 전체 검색 결과 개수 (예시)
      const data = Array.from({ length: numOfRows }, (_, i) => {
        const contentid = (page - 1) * numOfRows + i + 1;
        return {
          contentid,
          title: `${keyword} (${sigunguCode || "전체"}) 결과 ${contentid}`,
        };
      });

      resolve({
        resultCode: "0000",
        resultMsg: "OK",
        numOfRows,
        pageNo: page,
        totalCount,
        items: data,
      });
    }, 500);
  });
}

export default function SearchResultsPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const numOfRows = 10;

  // 지역 선택 상태
  const [sigunguCode, setSigunguCode] = useState("");
  const [sigunguName, setSigunguName] = useState("전체");
  const [openRegion, setOpenRegion] = useState(false);

  const regions = [
    { code: "", name: "전체" },
    { code: "1", name: "서울" },
    { code: "2", name: "부산" },
    { code: "3", name: "대구" },
    { code: "4", name: "인천" },
  ];

  const handleSearch = async (pageNo = 1) => {
    if (!keyword.trim()) return;
    const res = await fakeFetch(keyword, sigunguCode, pageNo, numOfRows);

    if (res.resultCode === "0000") {
      setResults(res.items);
      setTotalCount(res.totalCount);
      setPage(res.pageNo);
    }
  };

  const totalPages = Math.ceil(totalCount / numOfRows);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 검색창 + 지역 선택 */}
      <div className="p-4 bg-gray-100">
        <div className="flex gap-2 relative w-full">
          {/* 지역 선택 버튼 */}
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

          {/* 검색창 */}
          <div className="relative flex-1">
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요"
              onKeyDown={(e) => e.key === "Enter" && handleSearch(1)}
              className="w-full pr-14 pl-4 h-12 text-base border border-gray-300 rounded focus:outline-none"
            />
            <button
              onClick={() => handleSearch(1)}
              className="absolute inset-y-0 right-0 w-12 flex items-center justify-center border-l border-gray-300 rounded-r bg-gray-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <main className="p-4 flex-1 overflow-auto">
        {totalCount > 0 && (
          <p className="mb-4 text-gray-700">
            "{keyword}" ({sigunguName})에 관한 검색결과 {totalCount}건이 있습니다.
          </p>
        )}

        <ul className="space-y-2">
          {results.map((item) => (
            <li key={item.contentid}>
              <a
                href={`/detail/${item.contentid}`}
                className="block p-2 rounded hover:bg-gray-100 text-blue-600"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex gap-2 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handleSearch(p)}
                className={`px-3 py-1 rounded border ${
                  p === page
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}