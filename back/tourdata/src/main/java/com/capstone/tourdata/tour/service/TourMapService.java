package com.capstone.tourdata.tour.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class TourMapService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${tourapi.service-key}")
    private String serviceKey;

    @Value("${tourapi.base-url}")
    private String baseUrl;

    public Object mapTour(double mapX, double mapY, int radius) {
        String url = baseUrl + "/locationBasedList2"
                + "?serviceKey=" + serviceKey
                + "&MobileOS=WEB&MobileApp=TourApp&_type=json"
                + "&mapX=" + mapX
                + "&mapY=" + mapY
                + "&radius=" + radius;

        return restTemplate.getForObject(url, Object.class);
    }

}
