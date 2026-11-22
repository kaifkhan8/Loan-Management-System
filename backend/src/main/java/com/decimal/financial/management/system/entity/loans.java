
package com.decimal.financial.management.system.entity;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "loans")
@Getter
@Setter
@NoArgsConstructor
public class loans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @Column(name = "loan_amount", nullable = false)
    private BigDecimal loanAmount;

    @Column(name = "interest_rate", nullable = false)
    private BigDecimal interestRate;

    @Column(name = "tenure_months", nullable = false)
    private Integer tenureMonths;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "loan_status", nullable = false)
    private String loanStatus;

    // One Loan belongs to One Application
    @OneToOne
    @JoinColumn(
        name = "application_id",
        unique = true,
        nullable = false
    )
    @JsonBackReference("application-loan")
    private applications application;

    // One Loan has Many EMI Records
    @OneToMany(mappedBy = "loan")
    @JsonManagedReference("loan-emi")
    private List<emi_schedule> emiSchedules;
}

