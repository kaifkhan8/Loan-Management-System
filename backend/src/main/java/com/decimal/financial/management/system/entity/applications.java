package com.decimal.financial.management.system.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "applications")
@Getter
@Setter
public class applications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @Column(name = "loan_type")
    private String loanType;

    @Column(name = "requested_amount")
    private BigDecimal requestedAmount;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "status")
    private String status;

    // Many Applications belong to One Customer
    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private customers customer;

    // One Application has One Loan
    @OneToOne(mappedBy = "application")
    @JsonManagedReference("application-loan")
    private loans loan;
}