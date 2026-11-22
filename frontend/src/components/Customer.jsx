
import { useEffect, useState } from "react";

import {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
} from "../services/customerService";

function Customer() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        address: "",
        panNumber: ""
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Fetch Customers
    const fetchCustomers = async () => {
        try {
            setLoading(true);

            const data = await getAllCustomers();

            setCustomers(data);
            setError("");

        } catch (err) {
            setError("Unable to fetch customer details.");
            console.error(err);

        } finally {
            setLoading(false);
        }
    };

    // Handle Input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            customerName: "",
            email: "",
            phone: "",
            address: "",
            panNumber: ""
        });

        setEditId(null);
        setShowForm(false);
    };

    // Add Customer
    const handleAdd = () => {
        resetForm();
        setShowForm(true);
    };

    // Edit Customer
    const handleEdit = (customer) => {

        setFormData({
            customerName: customer.customerName || "",
            email: customer.email || "",
            phone: customer.phone || "",
            address: customer.address || "",
            panNumber: customer.panNumber || ""
        });

        setEditId(customer.customerId);
        setShowForm(true);
    };

    // Save / Update Customer
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId !== null) {

                await updateCustomer(editId, formData);

                alert("Customer updated successfully!");

            } else {

                await addCustomer(formData);

                alert("Customer added successfully!");
            }

            resetForm();

            await fetchCustomers();

        } catch (err) {

            alert("Unable to save customer. Please check the details.");

            console.error(err);
        }
    };

    // Delete Customer
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCustomer(id);

            alert("Customer deleted successfully!");

            await fetchCustomers();

        } catch (err) {

            alert("Unable to delete customer.");

            console.error(err);
        }
    };

    return (

        <div className="customer-page">

            {/* Page Header */}
            <div className="customer-header">

                <div>
                    <h1>Customer Management</h1>
                    <p>Manage all registered customers</p>
                </div>

                <button
                    className="add-btn"
                    onClick={handleAdd}
                >
                    + Add Customer
                </button>

            </div>

            {/* Add / Edit Customer Form */}
            {showForm && (

                <div className="customer-form-card">

                    <h2>
                        {editId !== null
                            ? "Edit Customer"
                            : "Add New Customer"}
                    </h2>

                    <form
                        className="customer-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="customerName"
                            placeholder="Customer Name"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="panNumber"
                            placeholder="PAN Number"
                            value={formData.panNumber}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="add-btn"
                            >
                                {editId !== null
                                    ? "Update Customer"
                                    : "Save Customer"}
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

            {/* Customer Details */}
            <div className="customer-table-container">

                <h2>Customer Details</h2>

                {loading ? (

                    <p className="loading-text">
                        Loading customers...
                    </p>

                ) : error ? (

                    <p className="error-text">{error}</p>

                ) : customers.length === 0 ? (

                    <p className="loading-text">
                        No customers found.
                    </p>

                ) : (

                    <div className="table-responsive">

                        <table className="customer-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>PAN Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {customers.map((customer) => (

                                    <tr key={customer.customerId}>

                                        <td>{customer.customerId}</td>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.panNumber}</td>

                                        <td className="action-buttons">

                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(customer)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(customer.customerId)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Customer;
