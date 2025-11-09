// src/pages/DetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const resp = await api.get("/api/tour/detail", { params: { contentId: id } });
        const item = resp.data?.response?.body?.items?.item?.[0];
        setDetail(item || null);
      } catch (err) {
        console.error(err);
        navigate("/error", { state: { message: "상세 조회 중 오류가 발생했습니다." } });
      }
    }
    load();
  }, [id, navigate]);

  if (!detail) return <div className="p-6 text-center text-gray-500">로딩 중...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-3">{detail.title}</h1>

      {/* 대표 이미지 */}
      {detail.firstimage && (
        <img
          src={detail.firstimage}
          alt={detail.title}
          className="w-full h-72 object-cover rounded-2xl shadow mb-4"
        />
      )}

      {/* 주소 */}
      {detail.addr1 && (
        <p className="text-gray-700 mb-2">
          <strong>주소:</strong> {detail.addr1} {detail.addr2 || ""}
        </p>
      )}

      {/* 전화번호 */}
      {detail.tel && (
        <p className="text-gray-700 mb-2">
          <strong>전화:</strong> {detail.tel}
        </p>
      )}

      {/* 홈페이지 */}
      {detail.homepage && (
        <div
          className="text-blue-600 underline mb-3"
          dangerouslySetInnerHTML={{ __html: detail.homepage }}
        />
      )}

      {/* 개요 */}
      {detail.overview && (
        <div className="bg-gray-50 rounded-2xl p-4 mt-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">소개</h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {detail.overview}
          </p>
        </div>
      )}
    </div>
  );
}