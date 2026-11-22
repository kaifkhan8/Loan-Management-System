
import { useEffect, useState } from "react";

import {
    getAllApplications,
    addApplication,
    updateApplication,
    deleteApplication
} from "../services/applicationService";

import { getAllCustomers } from "../services/customerService";

function Application() {

    const [applications, setApplications] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        loanType: "",
        requestedAmount: "",
        applicationDate: "",
        status: "PENDING",
        customerId: ""
    });

    // Fetch Applications and Customers
    const fetchData = async () => {
        try {
            const applicationData = await getAllApplications();
            const customerData = await getAllCustomers();

            setApplications(applicationData);
            setCustomers(customerData);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Data load nahi ho paya.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            loanType: "",
            requestedAmount: "",
            applicationDate: "",
            status: "PENDING",
            customerId: ""
        });

        setEditId(null);
        setShowForm(false);
    };

    // Add / Update Application
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const applicationData = {
                loanType: formData.loanType,
                requestedAmount: Number(formData.requestedAmount),
                applicationDate: formData.applicationDate,
                status: formData.status,
                customerId: Number(formData.customerId)
            };

            if (editId) {

                await updateApplication(editId, applicationData);

                alert("Application updated successfully!");

            } else {

                await addApplication(applicationData);

                alert("Application added successfully!");
            }

            resetForm();
            fetchData();

        } catch (error) {

            console.error("Error saving application:", error);

            alert(
                error.response?.data?.message ||
                "Application save nahi hui."
            );
        }
    };

    // Edit Application
    const handleEdit = (application) => {

        setFormData({
            loanType: application.loanType || "",
            requestedAmount: application.requestedAmount || "",
            applicationDate: application.applicationDate || "",
            status: application.status || "PENDING",
            customerId: application.customer?.customerId || ""
        });

        setEditId(application.applicationId);
        setShowForm(true);
    };

    // Delete Application
    const handleDelete = async (id) => {

        if (window.confirm("Are you sure you want to delete this application?")) {

            try {

                await deleteApplication(id);

                alert("Application deleted successfully!");

                fetchData();

            } catch (error) {

                console.error("Error deleting application:", error);

                alert("Application delete nahi hui.");
            }
        }
    };

    return (

        <div className="customer-page">

            {/* Page Header */}
            <div className="customer-header">

                <div>
                    <h2>Application Management</h2>
                    <p>Manage customer loan applications</p>
                </div>

                <button
                    className="add-btn"
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    + Add Application
                </button>

            </div>

            {/* Application Form */}
            {showForm && (

                <form
                    className="customer-form"
                    onSubmit={handleSubmit}
                >

                    <h3>
                        {editId ? "Edit Application" : "Add New Application"}
                    </h3>

                    {/* Customer Dropdown */}
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Customer</option>

                        {customers.map((customer) => (

                            <option
                                key={customer.customerId}
                                value={customer.customerId}
                            >
                                {customer.customerName} (ID: {customer.customerId})
                            </option>

                        ))}

                    </select>

                    {/* Loan Type */}
                    <input
                        type="text"
                        name="loanType"
                        placeholder="Loan Type"
                        value={formData.loanType}
                        onChange={handleChange}
                        required
                    />

                    {/* Requested Amount */}
                    <input
                        type="number"
                        name="requestedAmount"
                        placeholder="Requested Amount"
                        value={formData.requestedAmount}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                    {/* Application Date */}
                    <input
                        type="date"
                        name="applicationDate"
                        value={formData.applicationDate}
                        onChange={handleChange}
                        required
                    />

                    {/* Status */}
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>

                    <button
                        type="submit"
                        className="add-btn"
                    >
                        {editId ? "Update Application" : "Save Application"}
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>

                </form>

            )}

            {/* Application Table */}
            <div className="customer-table-container">

                <h3>Application Details</h3>

                <table className="customer-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loan Type</th>
                            <th>Requested Amount</th>
                            <th>Application Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {applications.map((application) => (

                            <tr key={application.applicationId}>

                                <td>{application.applicationId}</td>

                                <td>{application.loanType}</td>

                                <td>
                                    ₹{application.requestedAmount}
                                </td>

                                <td>{application.applicationDate}</td>

                                <td>{application.status}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(application)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(application.applicationId)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                        {applications.length === 0 && (

                            <tr>
                                <td colSpan="6">
                                    No applications found.
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Application;