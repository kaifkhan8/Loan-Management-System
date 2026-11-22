import axios from "axios";

const API_URL = "http://localhost:8080/api/applications";

// Get all applications
export const getAllApplications = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get application by ID
export const getApplicationById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Add application
export const addApplication = async (applicationData) => {
    const response = await axios.post(API_URL, applicationData);
    return response.data;
};

// Update application
export const updateApplication = async (id, applicationData) => {
    const response = await axios.put(`${API_URL}/${id}`, applicationData);
    return response.data;
};

// Delete application
export const deleteApplication = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};