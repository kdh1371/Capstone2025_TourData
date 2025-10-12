package com.capstone.tourdata.tour.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class TourKeywordSearchService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tourapi.service-key}")
    private String serviceKey;

    @Value("${tourapi.base-url}")
    private String baseUrl;

    public Object searchTour(String keyword, Integer areaCode) {
        String url = baseUrl + "/searchKeyword2"
                + "?serviceKey=" + serviceKey
                + "&MobileOS=WEB&MobileApp=TourApp&pageNo=1&numOfRows=10&_type=json"
                + "&keyword=" + URLEncoder.encode(keyword, StandardCharsets.UTF_8);

        if (areaCode != null && areaCode > 0) {
            url += "&areaCode=" + areaCode;
        }

        return restTemplate.getForObject(url, Object.class);
    }

}
