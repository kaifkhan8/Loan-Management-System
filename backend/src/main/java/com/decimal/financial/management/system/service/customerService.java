package com.decimal.financial.management.system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.decimal.financial.management.system.entity.customers;
import com.decimal.financial.management.system.repository.customerRepository;

@Service
public class customerService {

    @Autowired
    private customerRepository customerRepository;

    // Create Customer
    public customers createCustomer(customers customer) {
        return customerRepository.save(customer);
    }

    // Get All Customers
    public List<customers> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get Customer By ID
    public Optional<customers> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    // Update Customer
    public customers updateCustomer(Long id, customers customer) {

        customers existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existingCustomer.setCustomerName(customer.getCustomerName());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setAddress(customer.getAddress());
        existingCustomer.setPanNumber(customer.getPanNumber());

        return customerRepository.save(existingCustomer);
    }

    // Delete Customer
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}