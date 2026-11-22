package com.decimal.financial.management.system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.decimal.financial.management.system.dto.LoanRequest;
import com.decimal.financial.management.system.dto.LoanResponse;
import com.decimal.financial.management.system.entity.applications;
import com.decimal.financial.management.system.entity.loans;
import com.decimal.financial.management.system.repository.applicationRepository;
import com.decimal.financial.management.system.repository.loanRepository;

@Service
@Transactional
public class loanService {

    @Autowired
    private loanRepository loanRepository;

    @Autowired
    private applicationRepository applicationRepository;

    private LoanResponse convertToResponse(loans loan) {

        LoanResponse response = new LoanResponse();

        response.setLoanId(loan.getLoanId());
        response.setLoanAmount(loan.getLoanAmount());
        response.setInterestRate(loan.getInterestRate());
        response.setTenureMonths(loan.getTenureMonths());
        response.setStartDate(loan.getStartDate());
        response.setLoanStatus(loan.getLoanStatus());

        if (loan.getApplication() != null) {
            response.setApplicationId(
                loan.getApplication().getApplicationId()
            );
        }

        return response;
    }

    public LoanResponse createLoan(LoanRequest request) {

        if (request.getApplicationId() == null) {
            throw new RuntimeException("Application ID is required");
        }

        applications application = applicationRepository
                .findById(request.getApplicationId())
                .orElseThrow(() ->
                    new RuntimeException("Application not found")
                );

        if (loanRepository.existsByApplication_ApplicationId(
                request.getApplicationId())) {
            throw new RuntimeException(
                "Loan already exists for this application"
            );
        }

        loans loan = new loans();

        loan.setLoanAmount(request.getLoanAmount());
        loan.setInterestRate(request.getInterestRate());
        loan.setTenureMonths(request.getTenureMonths());
        loan.setStartDate(request.getStartDate());
        loan.setLoanStatus(request.getLoanStatus());
        loan.setApplication(application);

        loans savedLoan = loanRepository.save(loan);

        return convertToResponse(savedLoan);
    }

    public List<LoanResponse> getAllLoans() {

        return loanRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public Optional<LoanResponse> getLoanById(Long id) {

        return loanRepository.findById(id)
                .map(this::convertToResponse);
    }

    public LoanResponse updateLoan(Long id, LoanRequest request) {

        loans loan = loanRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Loan not found")
                );

        if (request.getApplicationId() == null) {
            throw new RuntimeException("Application ID is required");
        }

        applications application = applicationRepository
                .findById(request.getApplicationId())
                .orElseThrow(() ->
                    new RuntimeException("Application not found")
                );

        if (loanRepository.existsByApplication_ApplicationIdAndLoanIdNot(
                request.getApplicationId(), id)) {
            throw new RuntimeException(
                "Another loan already exists for this application"
            );
        }

        loan.setLoanAmount(request.getLoanAmount());
        loan.setInterestRate(request.getInterestRate());
        loan.setTenureMonths(request.getTenureMonths());
        loan.setStartDate(request.getStartDate());
        loan.setLoanStatus(request.getLoanStatus());
        loan.setApplication(application);

        loans updatedLoan = loanRepository.save(loan);

        return convertToResponse(updatedLoan);
    }

    public void deleteLoan(Long id) {

        loans loan = loanRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Loan not found")
                );

        loanRepository.delete(loan);
    }
}