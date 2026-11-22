import React, { useEffect, useState } from "react";

import {
    getAllEMI,
    addEMI,
    updateEMI,
    deleteEMI
} from "../services/emiService";

import { getAllLoans } from "../services/loanService";

function EMI() {

    const [emiList, setEmiList] = useState([]);
    const [loans, setLoans] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        emiNumber: "",
        dueDate: "",
        emiAmount: "",
        principalAmount: "",
        interestAmount: "",
        paidAmount: "",
        emiStatus: "",
        loanId: ""
    });

    // Fetch EMI and Loan Data
    const fetchData = async () => {
        try {
            const emiResponse = await getAllEMI();
            const loanResponse = await getAllLoans();

            setEmiList(emiResponse);
            setLoans(loanResponse);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Unable to load EMI or Loan records.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            emiNumber: "",
            dueDate: "",
            emiAmount: "",
            principalAmount: "",
            interestAmount: "",
            paidAmount: "",
            emiStatus: "",
            loanId: ""
        });

        setEditingId(null);
    };

    // Add or Update EMI
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const emiData = {
                ...formData,
                emiNumber: Number(formData.emiNumber),
                emiAmount: Number(formData.emiAmount),
                principalAmount: Number(formData.principalAmount),
                interestAmount: Number(formData.interestAmount),
                paidAmount: Number(formData.paidAmount),
                loanId: Number(formData.loanId)
            };

            if (editingId) {
                await updateEMI(editingId, emiData);
                alert("EMI updated successfully!");
            } else {
                await addEMI(emiData);
                alert("EMI added successfully!");
            }

            resetForm();
            fetchData();

        } catch (error) {
            console.error("Error saving EMI:", error);
            alert(
                error.response?.data?.message ||
                "Something went wrong while saving EMI."
            );
        }
    };

    // Edit EMI
    const handleEdit = (emi) => {
        setEditingId(emi.emiId);

        setFormData({
            emiNumber: emi.emiNumber || "",
            dueDate: emi.dueDate || "",
            emiAmount: emi.emiAmount || "",
            principalAmount: emi.principalAmount || "",
            interestAmount: emi.interestAmount || "",
            paidAmount: emi.paidAmount || "",
            emiStatus: emi.emiStatus || "",
            loanId: emi.loanId || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete EMI
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this EMI?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteEMI(id);
            alert("EMI deleted successfully!");
            fetchData();

        } catch (error) {
            console.error("Error deleting EMI:", error);
            alert("Unable to delete EMI.");
        }
    };

    return (
        <div className="customer-page">

            <div className="customer-header">
                <h2>EMI Schedule Management</h2>
                <p>Manage loan installment schedules</p>
            </div>

            {/* EMI Form */}
            <div className="customer-form-card">

                <h3>
                    {editingId ? "Update EMI" : "Add New EMI"}
                </h3>

                <form onSubmit={handleSubmit} className="customer-form">

                    <div>
                        <label>Loan</label>

                        <select
                            name="loanId"
                            value={formData.loanId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Loan</option>

                            {loans.map((loan) => (
                                <option
                                    key={loan.loanId}
                                    value={loan.loanId}
                                >
                                    Loan #{loan.loanId} - ₹{loan.loanAmount}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>EMI Number</label>

                        <input
                            type="number"
                            name="emiNumber"
                            placeholder="Enter EMI number"
                            value={formData.emiNumber}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label>Due Date</label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>EMI Amount</label>

                        <input
                            type="number"
                            name="emiAmount"
                            placeholder="Enter EMI amount"
                            value={formData.emiAmount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label>Principal Amount</label>

                        <input
                            type="number"
                            name="principalAmount"
                            placeholder="Enter principal amount"
                            value={formData.principalAmount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label>Interest Amount</label>

                        <input
                            type="number"
                            name="interestAmount"
                            placeholder="Enter interest amount"
                            value={formData.interestAmount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label>Paid Amount</label>

                        <input
                            type="number"
                            name="paidAmount"
                            placeholder="Enter paid amount"
                            value={formData.paidAmount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label>EMI Status</label>

                        <select
                            name="emiStatus"
                            value={formData.emiStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="PAID">Paid</option>
                            <option value="OVERDUE">Overdue</option>
                            <option value="PARTIALLY_PAID">Partially Paid</option>
                        </select>
                    </div>

                    <div className="form-actions">

                        <button type="submit">
                            {editingId ? "Update EMI" : "Add EMI"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* EMI Table */}
            <div className="customer-table-container">

                <h3>All EMI Records</h3>

                <div className="table-responsive">

                    <table className="customer-table">

                        <thead>
                            <tr>
                                <th>EMI ID</th>
                                <th>Loan ID</th>
                                <th>EMI No.</th>
                                <th>Due Date</th>
                                <th>EMI Amount</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Paid Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {emiList.length > 0 ? (

                                emiList.map((emi) => (

                                    <tr key={emi.emiId}>

                                        <td>{emi.emiId}</td>
                                        <td>{emi.loanId}</td>
                                        <td>{emi.emiNumber}</td>
                                        <td>{emi.dueDate}</td>
                                        <td>₹{emi.emiAmount}</td>
                                        <td>₹{emi.principalAmount}</td>
                                        <td>₹{emi.interestAmount}</td>
                                        <td>₹{emi.paidAmount}</td>
                                        <td>{emi.emiStatus}</td>

                                        <td>
                                            <button
                                                onClick={() => handleEdit(emi)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(emi.emiId)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="10">
                                        No EMI Records Found
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

export default EMI;