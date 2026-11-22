package com.decimal.financial.management.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.decimal.financial.management.system.dto.LoanRequest;
import com.decimal.financial.management.system.dto.LoanResponse;
import com.decimal.financial.management.system.service.loanService;

@RestController
@RequestMapping("/api/loans")
public class loanController {

    @Autowired
    private loanService loanService;

    @PostMapping
    public LoanResponse createLoan(@RequestBody LoanRequest request) {
        return loanService.createLoan(request);
    }

    @GetMapping
    public List<LoanResponse> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanResponse> getLoanById(@PathVariable Long id) {

        return loanService.getLoanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public LoanResponse updateLoan(
            @PathVariable Long id,
            @RequestBody LoanRequest request) {

        return loanService.updateLoan(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteLoan(@PathVariable Long id) {

        loanService.deleteLoan(id);

        return "Loan deleted successfully!";
    }
}