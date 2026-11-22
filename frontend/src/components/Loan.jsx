import { useEffect, useState } from "react";

import {
    getAllLoans,
    addLoan,
    updateLoan,
    deleteLoan
} from "../services/loanService";

import { getAllApplications } from "../services/applicationService";

function Loan() {

    const [loans, setLoans] = useState([]);
    const [applications, setApplications] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        loanAmount: "",
        interestRate: "",
        tenureMonths: "",
        startDate: "",
        loanStatus: "ACTIVE",
        applicationId: ""
    });

    // Fetch Loans and Applications
    const fetchData = async () => {
        try {
            const loanData = await getAllLoans();
            const applicationData = await getAllApplications();

            setLoans(loanData);
            setApplications(applicationData);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Loan data load nahi ho paya.");
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
            loanAmount: "",
            interestRate: "",
            tenureMonths: "",
            startDate: "",
            loanStatus: "ACTIVE",
            applicationId: ""
        });

        setEditId(null);
        setShowForm(false);
    };

    // Add Loan
    const handleAdd = () => {
        resetForm();
        setShowForm(true);
    };

    // Edit Loan
    const handleEdit = (loan) => {

        setFormData({
            loanAmount: loan.loanAmount || "",
            interestRate: loan.interestRate || "",
            tenureMonths: loan.tenureMonths || "",
            startDate: loan.startDate || "",
            loanStatus: loan.loanStatus || "ACTIVE",
            applicationId: loan.applicationId || ""
        });

        setEditId(loan.loanId);
        setShowForm(true);
    };

    // Save / Update Loan
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const loanData = {
                loanAmount: Number(formData.loanAmount),
                interestRate: Number(formData.interestRate),
                tenureMonths: Number(formData.tenureMonths),
                startDate: formData.startDate,
                loanStatus: formData.loanStatus,
                applicationId: Number(formData.applicationId)
            };

            if (editId !== null) {

                await updateLoan(editId, loanData);

                alert("Loan updated successfully!");

            } else {

                await addLoan(loanData);

                alert("Loan added successfully!");
            }

            resetForm();
            await fetchData();

        } catch (error) {

            console.error("Error saving loan:", error);

            alert(
                error.response?.data?.message ||
                "Unable to save loan."
            );
        }
    };

    // Delete Loan
    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this loan?")) {
            return;
        }

        try {

            await deleteLoan(id);

            alert("Loan deleted successfully!");

            await fetchData();

        } catch (error) {

            console.error("Error deleting loan:", error);

            alert("Unable to delete loan.");
        }
    };

    // Filter Applications
    // Already linked Applications will not appear in Add Loan.
    // During Edit, current Loan's Application will remain available.
    const availableApplications = applications.filter((application) => {

        return !loans.some((loan) => {

            return (
                Number(loan.applicationId) ===
                    Number(application.applicationId) &&
                loan.loanId !== editId
            );

        });

    });

    return (

        <div className="customer-page">

            {/* Header */}
            <div className="customer-header">

                <div>
                    <h1>Loan Management</h1>
                    <p>Manage approved customer loans</p>
                </div>

                <button
                    className="add-btn"
                    onClick={handleAdd}
                >
                    + Add Loan
                </button>

            </div>

            {/* Loan Form */}
            {showForm && (

                <div className="customer-form-card">

                    <h2>
                        {editId !== null ? "Edit Loan" : "Add New Loan"}
                    </h2>

                    <form
                        className="customer-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Application Dropdown */}
                        <select
                            name="applicationId"
                            value={formData.applicationId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Application
                            </option>

                            {availableApplications.map((application) => (

                                <option
                                    key={application.applicationId}
                                    value={application.applicationId}
                                >
                                    Application ID: {application.applicationId}
                                    {" - "}
                                    {application.loanType}
                                    {" - "}
                                    ₹{application.requestedAmount}
                                </option>

                            ))}

                        </select>

                        {/* Loan Amount */}
                        <input
                            type="number"
                            name="loanAmount"
                            placeholder="Loan Amount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            min="1"
                            required
                        />

                        {/* Interest Rate */}
                        <input
                            type="number"
                            name="interestRate"
                            placeholder="Interest Rate (%)"
                            value={formData.interestRate}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />

                        {/* Tenure */}
                        <input
                            type="number"
                            name="tenureMonths"
                            placeholder="Tenure (Months)"
                            value={formData.tenureMonths}
                            onChange={handleChange}
                            min="1"
                            required
                        />

                        {/* Start Date */}
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />

                        {/* Loan Status */}
                        <select
                            name="loanStatus"
                            value={formData.loanStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="DEFAULTED">DEFAULTED</option>
                        </select>

                        {/* Form Buttons */}
                        <div className="form-actions">

                            <button
                                type="submit"
                                className="add-btn"
                            >
                                {editId !== null
                                    ? "Update Loan"
                                    : "Save Loan"}
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}

            {/* Loan Table */}
            <div className="customer-table-container">

                <h2>Loan Details</h2>

                <div className="table-responsive">

                    <table className="customer-table">

                        <thead>
                            <tr>
                                <th>Loan ID</th>
                                <th>Application ID</th>
                                <th>Loan Amount</th>
                                <th>Interest Rate</th>
                                <th>Tenure</th>
                                <th>Start Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loans.map((loan) => (

                                <tr key={loan.loanId}>

                                    <td>{loan.loanId}</td>

                                    <td>
                                        {loan.applicationId || "Not available"}
                                    </td>

                                    <td>₹{loan.loanAmount}</td>

                                    <td>{loan.interestRate}%</td>

                                    <td>{loan.tenureMonths} Months</td>

                                    <td>{loan.startDate}</td>

                                    <td>{loan.loanStatus}</td>

                                    <td>

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(loan)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(loan.loanId)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            {loans.length === 0 && (

                                <tr>
                                    <td colSpan="8">
                                        No loans found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Loan;