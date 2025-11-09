package com.capstone.tourdata.tour.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class TourDetailService {
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tourapi.service-key}")
    private String serviceKey;

    @Value("${tourapi.base-url}")
    private String baseUrl;

    public Object detailTour(Long contentId) {
        try {
            String url = baseUrl + "/detailCommon2"
                    + "?serviceKey=" + serviceKey
                    + "&MobileOS=WEB&MobileApp=TourApp&_type=json"
                    + "&contentId=" + contentId;

            URI uri = new URI(url);
            return restTemplate.getForObject(uri, Object.class);

        } catch (Exception e) {
            throw new RuntimeException("API 요청 중 오류 발생: " + e.getMessage(), e);
        }
    }

}
