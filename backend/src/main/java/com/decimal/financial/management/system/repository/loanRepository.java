
package com.decimal.financial.management.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.decimal.financial.management.system.entity.loans;

@Repository
public interface loanRepository extends JpaRepository<loans, Long> {

    // Check whether application already has a loan
    boolean existsByApplication_ApplicationId(Long applicationId);

    // Check whether another loan uses the same application
    boolean existsByApplication_ApplicationIdAndLoanIdNot(
            Long applicationId, Long loanId);

}