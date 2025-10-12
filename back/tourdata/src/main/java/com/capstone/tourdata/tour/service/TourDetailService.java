package com.capstone.tourdata.tour.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class TourDetailService {
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tourapi.service-key}")
    private String serviceKey;

    @Value("${tourapi.base-url}")
    private String baseUrl;

    public Object detailTour(Long contentId) {
        String url = baseUrl + "/detailCommon2"
                + "?serviceKey=" + serviceKey
                + "&MobileOS=WEB&MobileApp=TourApp&_type=json"
                + "&contentId=" + contentId;

        return restTemplate.getForObject(url, Object.class);
    }

}
