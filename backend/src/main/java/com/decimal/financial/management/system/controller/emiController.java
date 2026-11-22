package com.decimal.financial.management.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.decimal.financial.management.system.dto.EMIRequest;
import com.decimal.financial.management.system.dto.EMIResponse;
import com.decimal.financial.management.system.service.emiService;

@RestController
@RequestMapping("/api/emi")
@CrossOrigin(origins = "http://localhost:5173")
public class emiController {

    @Autowired
    private emiService emiService;

    // Create EMI
    @PostMapping
    public EMIResponse createEMI(@RequestBody EMIRequest request) {
        return emiService.createEMI(request);
    }

    // Get All EMI Records
    @GetMapping
    public List<EMIResponse> getAllEMI() {
        return emiService.getAllEMI();
    }

    // Get EMI By ID
    @GetMapping("/{id}")
    public ResponseEntity<EMIResponse> getEMIById(@PathVariable Long id) {

        return emiService.getEMIById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update EMI
    @PutMapping("/{id}")
    public EMIResponse updateEMI(
            @PathVariable Long id,
            @RequestBody EMIRequest request) {

        return emiService.updateEMI(id, request);
    }

    // Delete EMI
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEMI(@PathVariable Long id) {

        emiService.deleteEMI(id);

        return ResponseEntity.ok("EMI deleted successfully");
    }
}