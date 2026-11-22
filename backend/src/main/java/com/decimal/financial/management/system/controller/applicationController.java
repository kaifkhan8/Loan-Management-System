
package com.decimal.financial.management.system.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.decimal.financial.management.system.dto.ApplicationRequest;
import com.decimal.financial.management.system.entity.applications;
import com.decimal.financial.management.system.service.applicationService;

@RestController
@RequestMapping("/api/applications")
public class applicationController {

    @Autowired
    private applicationService applicationService;

    // Create Application
    @PostMapping
    public applications createApplication(
            @RequestBody ApplicationRequest request) {

        return applicationService.createApplication(request);
    }

    // Get All Applications
    @GetMapping
    public List<applications> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // Get Application By ID
    @GetMapping("/{id}")
    public ResponseEntity<applications> getApplicationById(
            @PathVariable Long id) {

        Optional<applications> application =
                applicationService.getApplicationById(id);

        return application.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update Application
    @PutMapping("/{id}")
    public applications updateApplication(
            @PathVariable Long id,
            @RequestBody ApplicationRequest request) {

        return applicationService.updateApplication(id, request);
    }

    // Delete Application
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {

        applicationService.deleteApplication(id);

        return "Application deleted successfully!";
    }
}