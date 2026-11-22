package com.decimal.financial.management.system.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.decimal.financial.management.system.entity.customers;
import com.decimal.financial.management.system.service.customerService;

@RestController
@RequestMapping("/api/customers")
public class customerController {

    @Autowired
    private customerService customerService;

    // Create Customer
    @PostMapping
    public customers createCustomer(@RequestBody customers customer) {
        return customerService.createCustomer(customer);
    }

    // Get All Customers
    @GetMapping
    public List<customers> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Get Customer By ID
    @GetMapping("/{id}")
    public ResponseEntity<customers> getCustomerById(@PathVariable Long id) {

        Optional<customers> customer = customerService.getCustomerById(id);

        return customer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update Customer
    @PutMapping("/{id}")
    public customers updateCustomer(
            @PathVariable Long id,
            @RequestBody customers customer) {

        return customerService.updateCustomer(id, customer);
    }

    // Delete Customer
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {

        customerService.deleteCustomer(id);

        return "Customer deleted successfully!";
    }
}

