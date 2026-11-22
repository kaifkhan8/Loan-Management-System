package com.decimal.financial.management.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.decimal.financial.management.system.entity.emi_schedule;

@Repository
public interface emiRepository extends JpaRepository<emi_schedule, Long> {

}