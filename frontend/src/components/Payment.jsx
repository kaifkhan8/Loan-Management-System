import React, { useEffect, useState } from "react";

import {
    getAllPayments,
    addPayment,
    updatePayment,
    deletePayment
} from "../services/paymentService";

import { getAllLoans } from "../services/loanService";

function Payment() {

    const [payments, setPayments] = useState([]);
    const [loans, setLoans] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        paymentDate: "",
        amount: "",
        paymentMethod: "",
        paymentStatus: "",
        transactionId: "",
        loanId: ""
    });

    // Load Payments and Loans
    const fetchData = async () => {
        try {
            const paymentResponse = await getAllPayments();
            const loanResponse = await getAllLoans();

            setPayments(paymentResponse);
            setLoans(loanResponse);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Unable to load Payments or Loans.");
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
            paymentDate: "",
            amount: "",
            paymentMethod: "",
            paymentStatus: "",
            transactionId: "",
            loanId: ""
        });

        setEditingId(null);
    };

    // Add or Update Payment
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const paymentData = {
                ...formData,
                amount: Number(formData.amount),
                loanId: Number(formData.loanId)
            };

            if (editingId) {
                await updatePayment(editingId, paymentData);
                alert("Payment updated successfully!");
            } else {
                await addPayment(paymentData);
                alert("Payment added successfully!");
            }

            resetForm();
            fetchData();

        } catch (error) {
            console.error("Error saving payment:", error);
            alert(
                error.response?.data?.message ||
                "Something went wrong while saving payment."
            );
        }
    };

    // Edit Payment
    const handleEdit = (payment) => {
        setEditingId(payment.paymentId);

        setFormData({
            paymentDate: payment.paymentDate || "",
            amount: payment.amount || "",
            paymentMethod: payment.paymentMethod || "",
            paymentStatus: payment.paymentStatus || "",
            transactionId: payment.transactionId || "",
            loanId: payment.loanId || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete Payment
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this payment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deletePayment(id);
            alert("Payment deleted successfully!");

            fetchData();

        } catch (error) {
            console.error("Error deleting payment:", error);
            alert("Unable to delete payment.");
        }
    };

    return (
        <div className="customer-page">

            <div className="customer-header">
                <h2>Payment Management</h2>
                <p>Manage all loan payment records</p>
            </div>

            {/* Payment Form */}
            <div className="customer-form-card">

                <h3>
                    {editingId ? "Update Payment" : "Add New Payment"}
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
                        <label>Payment Date</label>

                        <input
                            type="date"
                            name="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Amount</label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter payment amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label>Payment Method</label>

                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Method</option>
                            <option value="CASH">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="NET_BANKING">Net Banking</option>
                            <option value="DEBIT_CARD">Debit Card</option>
                            <option value="CREDIT_CARD">Credit Card</option>
                        </select>
                    </div>

                    <div>
                        <label>Payment Status</label>

                        <select
                            name="paymentStatus"
                            value={formData.paymentStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="SUCCESS">Success</option>
                            <option value="FAILED">Failed</option>
                        </select>
                    </div>

                    <div>
                        <label>Transaction ID</label>

                        <input
                            type="text"
                            name="transactionId"
                            placeholder="Enter transaction ID"
                            value={formData.transactionId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">

                        <button type="submit">
                            {editingId ? "Update Payment" : "Add Payment"}
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

            {/* Payments Table */}
            <div className="customer-table-container">

                <h3>All Payments</h3>

                <div className="table-responsive">

                    <table className="customer-table">

                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Loan ID</th>
                                <th>Payment Date</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Transaction ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {payments.length > 0 ? (

                                payments.map((payment) => (

                                    <tr key={payment.paymentId}>

                                        <td>{payment.paymentId}</td>

                                        <td>{payment.loanId}</td>

                                        <td>{payment.paymentDate}</td>

                                        <td>₹{payment.amount}</td>

                                        <td>{payment.paymentMethod}</td>

                                        <td>{payment.paymentStatus}</td>

                                        <td>
                                            {payment.transactionId || "-"}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleEdit(payment)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(payment.paymentId)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="8">
                                        No Payments Found
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

export default Payment;