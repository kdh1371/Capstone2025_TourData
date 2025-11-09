package com.capstone.tourdata.planner.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity(name="Planner")
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;          // 여행 제목
    private String destination;    // 목적지
    private String startDate;      // 시작 날짜
    private String endDate;        // 종료 날짜
    private String memo;           // 메모
}