package com.decimal.financial.management.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.decimal.financial.management.system.dto.PaymentRequest;
import com.decimal.financial.management.system.dto.PaymentResponse;
import com.decimal.financial.management.system.service.paymentService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class paymentController {

    @Autowired
    private paymentService paymentService;

    // Create Payment
    @PostMapping
    public PaymentResponse createPayment(@RequestBody PaymentRequest request) {
        return paymentService.createPayment(request);
    }

    // Get All Payments
    @GetMapping
    public List<PaymentResponse> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get Payment By ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable Long id) {

        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Payment
    @PutMapping("/{id}")
    public PaymentResponse updatePayment(
            @PathVariable Long id,
            @RequestBody PaymentRequest request) {

        return paymentService.updatePayment(id, request);
    }

    // Delete Payment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {

        paymentService.deletePayment(id);

        return ResponseEntity.ok("Payment deleted successfully");
    }
}