import axios from "axios";

const API_URL = "http://localhost:8080/api/emi";

// Get All EMI Records
export const getAllEMI = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get EMI By ID
export const getEMIById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Add EMI
export const addEMI = async (emiData) => {
    const response = await axios.post(API_URL, emiData);
    return response.data;
};

// Update EMI
export const updateEMI = async (id, emiData) => {
    const response = await axios.put(`${API_URL}/${id}`, emiData);
    return response.data;
};

// Delete EMI
export const deleteEMI = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};