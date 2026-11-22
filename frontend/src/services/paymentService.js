import axios from "axios";

const API_URL = "http://localhost:8080/api/payments";

// Get All Payments
export const getAllPayments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get Payment By ID
export const getPaymentById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Add Payment
export const addPayment = async (paymentData) => {
    const response = await axios.post(API_URL, paymentData);
    return response.data;
};

// Update Payment
export const updatePayment = async (id, paymentData) => {
    const response = await axios.put(`${API_URL}/${id}`, paymentData);
    return response.data;
};

// Delete Payment
export const deletePayment = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};