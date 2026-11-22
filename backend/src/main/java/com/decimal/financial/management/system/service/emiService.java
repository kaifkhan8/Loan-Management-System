package com.decimal.financial.management.system.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.decimal.financial.management.system.dto.EMIRequest;
import com.decimal.financial.management.system.dto.EMIResponse;
import com.decimal.financial.management.system.entity.emi_schedule;
import com.decimal.financial.management.system.entity.loans;
import com.decimal.financial.management.system.repository.emiRepository;
import com.decimal.financial.management.system.repository.loanRepository;

@Service
@Transactional
public class emiService {

    @Autowired
    private emiRepository emiRepository;

    @Autowired
    private loanRepository loanRepository;

    // Create EMI
    public EMIResponse createEMI(EMIRequest request) {

        if (request.getLoanId() == null) {
            throw new RuntimeException("Loan ID is required");
        }

        loans loan = loanRepository.findById(request.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        emi_schedule emi = new emi_schedule();

        emi.setEmiNumber(request.getEmiNumber());
        emi.setDueDate(request.getDueDate());
        emi.setEmiAmount(request.getEmiAmount());
        emi.setPrincipalAmount(request.getPrincipalAmount());
        emi.setInterestAmount(request.getInterestAmount());
        emi.setPaidAmount(request.getPaidAmount());
        emi.setEmiStatus(request.getEmiStatus());
        emi.setLoan(loan);

        emi_schedule savedEMI = emiRepository.save(emi);

        return convertToResponse(savedEMI);
    }

    // Get All EMI Records
    public List<EMIResponse> getAllEMI() {

        return emiRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Get EMI By ID
    public Optional<EMIResponse> getEMIById(Long id) {

        return emiRepository.findById(id)
                .map(this::convertToResponse);
    }

    // Update EMI
    public EMIResponse updateEMI(Long id, EMIRequest request) {

        emi_schedule emi = emiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EMI not found"));

        if (request.getLoanId() == null) {
            throw new RuntimeException("Loan ID is required");
        }

        loans loan = loanRepository.findById(request.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        emi.setEmiNumber(request.getEmiNumber());
        emi.setDueDate(request.getDueDate());
        emi.setEmiAmount(request.getEmiAmount());
        emi.setPrincipalAmount(request.getPrincipalAmount());
        emi.setInterestAmount(request.getInterestAmount());
        emi.setPaidAmount(request.getPaidAmount());
        emi.setEmiStatus(request.getEmiStatus());
        emi.setLoan(loan);

        emi_schedule updatedEMI = emiRepository.save(emi);

        return convertToResponse(updatedEMI);
    }

    // Delete EMI
    public void deleteEMI(Long id) {

        emi_schedule emi = emiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EMI not found"));

        emiRepository.delete(emi);
    }

    // Convert Entity To Response DTO
    private EMIResponse convertToResponse(emi_schedule emi) {

        EMIResponse response = new EMIResponse();

        response.setEmiId(emi.getEmiId());
        response.setEmiNumber(emi.getEmiNumber());
        response.setDueDate(emi.getDueDate());
        response.setEmiAmount(emi.getEmiAmount());
        response.setPrincipalAmount(emi.getPrincipalAmount());
        response.setInterestAmount(emi.getInterestAmount());
        response.setPaidAmount(emi.getPaidAmount());
        response.setEmiStatus(emi.getEmiStatus());

        if (emi.getLoan() != null) {
            response.setLoanId(emi.getLoan().getLoanId());
        }

        return response;
    }
}