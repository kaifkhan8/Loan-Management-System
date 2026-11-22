package com.decimal.financial.management.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.decimal.financial.management.system.entity.payments;

@Repository
public interface paymentRepository extends JpaRepository<payments, Long> {

}