package com.decimal.financial.management.system.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "emi_schedule")
@Getter
@Setter
@NoArgsConstructor
public class emi_schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emiId;

    @Column(name = "emi_number")
    private Integer emiNumber;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "emi_amount")
    private BigDecimal emiAmount;

    @Column(name = "principal_amount")
    private BigDecimal principalAmount;

    @Column(name = "interest_amount")
    private BigDecimal interestAmount;

    @Column(name = "paid_amount")
    private BigDecimal paidAmount;

    @Column(name = "emi_status")
    private String emiStatus;

    // Many EMI records belong to One Loan
    @ManyToOne
    @JoinColumn(name = "loan_id")
    @JsonBackReference("loan-emi")
    private loans loan;
}