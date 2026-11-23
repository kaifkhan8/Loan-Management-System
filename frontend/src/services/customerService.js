import axios from "axios";

const API_URL = "https://loan-management-system-vp1t.onrender.com/api/customers";

export const getAllCustomers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addCustomer = async (customerData) => {
    const response = await axios.post(API_URL, customerData);
    return response.data;
};

// Update Customer
export const updateCustomer = async (id, customerData) => {
    const response = await axios.put(`${API_URL}/${id}`, customerData);
    return response.data;
};

// Delete Customer
export const deleteCustomer = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};