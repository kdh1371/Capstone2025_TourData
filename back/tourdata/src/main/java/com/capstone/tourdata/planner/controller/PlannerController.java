package com.capstone.tourdata.planner.controller;

import com.capstone.tourdata.planner.domain.Planner;
import com.capstone.tourdata.planner.service.PlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*") // 프론트 연동 시 필요
public class PlannerController {

    private final PlannerService plannerService;

    @GetMapping
    public List<Planner> getPlans() {
        return plannerService.getAllPlaners();
    }

    @PostMapping
    public Planner createPlan(@RequestBody Planner planner) {
        return plannerService.createPlanner(planner);
    }

    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable Long id) {
        plannerService.deletePlanner(id);
    }
}
