package com.capstone.tourdata.tour.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TourKeywordSearchService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tourapi.service-key}")
    private String serviceKey;

    @Value("${tourapi.base-url}")
    private String baseUrl;

    public Object searchTour(String keyword, Integer areaCode, Integer pageNo, Integer numOfRows) {
        try {
            String url = baseUrl + "/searchKeyword2"
                    + "?serviceKey=" + serviceKey
                    + "&MobileOS=WEB&MobileApp=TourApp"
                    + "&pageNo=" + (pageNo == null ? 1 : pageNo)
                    + "&numOfRows=" + (numOfRows == null ? 10 : numOfRows)
                    + "&_type=json"
                    + "&keyword=" + URLEncoder.encode(keyword, StandardCharsets.UTF_8);

            if (areaCode != null && areaCode > 0) {
                url += "&areaCode=" + areaCode;
            }


            URI uri = new URI(url);
            return restTemplate.getForObject(uri, Object.class);

        } catch (org.springframework.web.client.HttpClientErrorException.NotFound e) {
            //  공공데이터 API가 404일 경우
            return Map.of(
                    "error", "api not found",
                    "message", "공공데이터 서버 응답 없음",
                    "url", baseUrl + "/searchKeyword2"
            );

        } catch (Exception e) {
            // ✅ 다른 예외 처리
            return Map.of(
                    "error", "internal error",
                    "message", e.getMessage()
            );
        }
    }
}
