
import axios from "axios";

const API_URL = "http://localhost:8080/api/loans";

// Get All Loans
export const getAllLoans = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get Loan By ID
export const getLoanById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Add Loan
export const addLoan = async (loanData) => {
    const response = await axios.post(API_URL, loanData);
    return response.data;
};

// Update Loan
export const updateLoan = async (id, loanData) => {
    const response = await axios.put(`${API_URL}/${id}`, loanData);
    return response.data;
};

// Delete Loan
export const deleteLoan = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
