
package com.decimal.financial.management.system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.decimal.financial.management.system.dto.ApplicationRequest;
import com.decimal.financial.management.system.entity.applications;
import com.decimal.financial.management.system.entity.customers;
import com.decimal.financial.management.system.repository.applicationRepository;
import com.decimal.financial.management.system.repository.customerRepository;

@Service
public class applicationService {

    @Autowired
    private applicationRepository applicationRepository;

    @Autowired
    private customerRepository customerRepository;

    // Create Application
    public applications createApplication(ApplicationRequest request) {

        customers customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        applications application = new applications();

        application.setLoanType(request.getLoanType());
        application.setRequestedAmount(request.getRequestedAmount());
        application.setApplicationDate(request.getApplicationDate());
        application.setStatus(request.getStatus());
        application.setCustomer(customer);

        return applicationRepository.save(application);
    }

    // Get All Applications
    public List<applications> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get Application By ID
    public Optional<applications> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    // Update Application
    public applications updateApplication(Long id, ApplicationRequest request) {

        applications existingApplication = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        customers customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existingApplication.setLoanType(request.getLoanType());
        existingApplication.setRequestedAmount(request.getRequestedAmount());
        existingApplication.setApplicationDate(request.getApplicationDate());
        existingApplication.setStatus(request.getStatus());
        existingApplication.setCustomer(customer);

        return applicationRepository.save(existingApplication);
    }

    // Delete Application
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}
