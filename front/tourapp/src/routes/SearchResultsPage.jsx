import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const initialKeyword = query.get("keyword") || "";
  const initialArea = query.get("areaCode") || "";
  const initialPage = parseInt(query.get("page") || "1", 10);

  const [keyword, setKeyword] = useState(initialKeyword);
  const [sigunguCode, setSigunguCode] = useState(initialArea);
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(initialPage);
  const numOfRows = 10;

  useEffect(() => {
    if (initialKeyword) {
      fetchData(initialKeyword, initialArea, initialPage);
    }
  }, [initialKeyword, initialArea, initialPage]);

  const fetchData = async (keywordParam, areaCodeParam, pageNo = 1) => {
    try {
      const params = {
        keyword: keywordParam,
        pageNo,
        numOfRows,
      };
      if (areaCodeParam) params.areaCode = areaCodeParam;

      const resp = await api.get("/api/tour/search", { params });
      const data = resp.data;

      const items =
        data?.items ||
        data?.response?.body?.items?.item ||
        [];
      const total =
        data?.totalCount ||
        data?.response?.body?.totalCount ||
        0;

      setResults(Array.isArray(items) ? items : []);
      setTotalCount(total);
      setPage(pageNo);
    } catch (err) {
      console.error("검색 중 에러:", err);
      navigate("/error", { state: { message: err.message || "검색 중 오류가 발생했습니다." } });
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (sigunguCode) params.set("areaCode", sigunguCode);
    params.set("page", "1");
    navigate(`/search?${params.toString()}`);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const totalPages = Math.ceil(totalCount / numOfRows);

  // ✅ 페이지네이션 계산
  const blockSize = 10; // 한 번에 보여줄 페이지 버튼 개수
  const currentBlock = Math.ceil(page / blockSize);
  const startPage = (currentBlock - 1) * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  const goToPage = (p) => {
    const params = new URLSearchParams();
    params.set("keyword", keyword);
    if (sigunguCode) params.set("areaCode", sigunguCode);
    params.set("page", String(p));
    navigate(`/search?${params.toString()}`);
  };

  const goPrevBlock = () => {
    if (startPage > 1) goToPage(startPage - 1);
  };

  const goNextBlock = () => {
    if (endPage < totalPages) goToPage(endPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 검색창 */}
      <div className="p-4 bg-gray-100">
        <div className="flex gap-2 relative w-full">
          <div className="relative">
            <button className="h-12 px-4 border border-gray-300 rounded bg-white flex items-center gap-1">
              {sigunguCode || "전체"}
            </button>
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
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <main className="p-4 flex-1 overflow-auto">
        {totalCount > 0 && (
          <p className="mb-4 text-gray-700">
            "{initialKeyword}" ({sigunguCode || "전체"}) 검색결과 {totalCount}건
          </p>
        )}

        <ul className="space-y-3">
          {results.map((item, idx) => {
            const id = item.contentid || idx;
            const title = item.title || "제목 없음";
            const addr = item.addr1 || "주소 없음";
            const image = item.firstimage || item.firstimage2 || null;

            return (
              <li
                key={id}
                className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                {image ? (
                  <img src={image} alt={title} className="w-24 h-24 object-cover rounded-lg border" />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg border">
                    이미지 없음
                  </div>
                )}
                <div className="flex-1">
                  <a
                    href={`/detail/${id}`}
                    className="block text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {title}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{addr}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ✅ 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex gap-1 mt-6 flex-wrap justify-center">
            {/* << 버튼 */}
            {startPage > 1 && (
              <button
                onClick={() => goToPage(1)}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
              >
                {"<<"}
              </button>
            )}

            {/* < 버튼 */}
            {page > 1 && (
              <button
                onClick={goPrevBlock}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
              >
                {"<"}
              </button>
            )}

            {/* 페이지 번호 */}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded border ${
                  p === page
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}

            {/* > 버튼 */}
            {page < totalPages && (
              <button
                onClick={goNextBlock}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
              >
                {">"}
              </button>
            )}

            {/* >> 버튼 */}
            {endPage < totalPages && (
              <button
                onClick={() => goToPage(totalPages)}
                className="px-2 py-1 border rounded bg-white hover:bg-gray-100"
              >
                {">>"}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}