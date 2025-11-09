package com.capstone.tourdata.planner.service;

import com.capstone.tourdata.planner.domain.Planner;
import com.capstone.tourdata.planner.domain.PlannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlannerService {
    private final PlannerRepository plannerRepository;

    public List<Planner> getAllPlaners() {
        return plannerRepository.findAll();
    }

    public Planner createPlanner(Planner plan) {
        return plannerRepository.save(plan);
    }

    public void deletePlanner(Long id) {
        plannerRepository.deleteById(id);
    }
}
