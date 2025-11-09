// src/api/axios.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || ""; // 예: http://localhost:8080

const api = axios.create({
  baseURL,
  timeout: 8000,
});

// 요청 인터셉터(토큰 등 추가 가능)
api.interceptors.request.use((config) => {
  // 예: 인증 토큰 삽입
  // config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// 응답 인터셉터: 네트워크 오류 / 5xx 처리
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // 에러를 그대로 던짐(컴포넌트에서 catch로 처리)
    return Promise.reject(error);
  }
);

export default api;
