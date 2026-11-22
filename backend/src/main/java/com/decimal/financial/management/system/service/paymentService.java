package com.decimal.financial.management.system.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.decimal.financial.management.system.dto.PaymentRequest;
import com.decimal.financial.management.system.dto.PaymentResponse;
import com.decimal.financial.management.system.entity.loans;
import com.decimal.financial.management.system.entity.payments;
import com.decimal.financial.management.system.repository.loanRepository;
import com.decimal.financial.management.system.repository.paymentRepository;

@Service
@Transactional
public class paymentService {

    @Autowired
    private paymentRepository paymentRepository;

    @Autowired
    private loanRepository loanRepository;

    // Create Payment
    public PaymentResponse createPayment(PaymentRequest request) {

        if (request.getLoanId() == null) {
            throw new RuntimeException("Loan ID is required");
        }

        loans loan = loanRepository.findById(request.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        payments payment = new payments();

        payment.setPaymentDate(request.getPaymentDate());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());
        payment.setTransactionId(request.getTransactionId());
        payment.setLoan(loan);

        payments savedPayment = paymentRepository.save(payment);

        return convertToResponse(savedPayment);
    }

    // Get All Payments
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Get Payment By ID
    public Optional<PaymentResponse> getPaymentById(Long id) {

        return paymentRepository.findById(id)
                .map(this::convertToResponse);
    }

    // Update Payment
    public PaymentResponse updatePayment(Long id, PaymentRequest request) {

        payments payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (request.getLoanId() == null) {
            throw new RuntimeException("Loan ID is required");
        }

        loans loan = loanRepository.findById(request.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        payment.setPaymentDate(request.getPaymentDate());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());
        payment.setTransactionId(request.getTransactionId());
        payment.setLoan(loan);

        payments updatedPayment = paymentRepository.save(payment);

        return convertToResponse(updatedPayment);
    }

    // Delete Payment
    public void deletePayment(Long id) {

        payments payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        paymentRepository.delete(payment);
    }

    // Convert Entity To Response DTO
    private PaymentResponse convertToResponse(payments payment) {

        PaymentResponse response = new PaymentResponse();

        response.setPaymentId(payment.getPaymentId());
        response.setPaymentDate(payment.getPaymentDate());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentStatus(payment.getPaymentStatus());
        response.setTransactionId(payment.getTransactionId());

        if (payment.getLoan() != null) {
            response.setLoanId(payment.getLoan().getLoanId());
        }

        return response;
    }
}