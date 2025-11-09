package com.capstone.tourdata.tour.controller;

import com.capstone.tourdata.tour.service.TourDetailService;
import com.capstone.tourdata.tour.service.TourKeywordSearchService;
import com.capstone.tourdata.tour.service.TourMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
public class TourController {

    private final TourKeywordSearchService tourKeywordSearchService;
    private final TourDetailService tourDetailService;
    private final TourMapService tourMapService;

    @GetMapping("/search")
    public ResponseEntity<?> searchTour(@RequestParam String keyword,
                                        @RequestParam(required = false) Integer areaCode,
                                        @RequestParam(required = false) Integer pageNo,
                                        @RequestParam(required = false) Integer numOfRows) {
        return ResponseEntity.ok(tourKeywordSearchService.searchTour(keyword, areaCode, pageNo, numOfRows));
    }

    @GetMapping("/detail")
    public ResponseEntity<?> detailTour(@RequestParam Long contentId) {
        return ResponseEntity.ok(tourDetailService.detailTour(contentId));
    }

    @GetMapping("/location")
    public ResponseEntity<?> mapTour(@RequestParam double mapX, @RequestParam double mapY, @RequestParam int radius) {
        return ResponseEntity.ok(tourMapService.mapTour(mapX, mapY, radius));
    }
}
