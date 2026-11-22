// ==========================================
// NAVIGATION
// ==========================================

function showSection(sectionId) {

    document.querySelectorAll(".container").forEach(section => {
        section.hidden = true;
    });

    document.getElementById(sectionId).hidden = false;

}


// ==========================================
// COMMON FUNCTIONS
// ==========================================

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


function cancelEdit(formId) {

    const form = document.getElementById(formId);

    form.reset();

    delete form.dataset.editId;

    form.querySelector("button[type='submit']").textContent =
        formId === "customerForm" ? "Add Customer" :
        formId === "applicationForm" ? "Submit Application" :
        "Add Payment";

}


async function deleteRecord(url, message, refreshFunction) {

    if (!confirm("Are you sure you want to delete this record?")) {
        return;
    }

    try {

        const response = await fetch(url, {
            method: "DELETE"
        });

        if (response.ok) {

            alert(message);

            refreshFunction();

        } else {

            alert("Delete failed!");

        }

    } catch (error) {

        console.error(error);

        alert("Server connection failed!");

    }

}


// ==========================================
// CUSTOMER MANAGEMENT
// ==========================================


// CREATE / UPDATE CUSTOMER

document.getElementById("customerForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const customer = {

        customerName: document.getElementById("customerName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        panNumber: document.getElementById("panNumber").value

    };

    try {

        const editId = this.dataset.editId;

        const response = await fetch(
            editId ? `/api/customers/${editId}` : "/api/customers",
            {
                method: editId ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(customer)
            }
        );

        if (!response.ok) {
            alert("Customer operation failed!");
            return;
        }

        alert(editId
            ? "Customer Updated Successfully!"
            : "Customer Added Successfully!");

        cancelEdit("customerForm");

        getAllCustomers();

    } catch (error) {

        console.error(error);

        alert("Server connection failed!");

    }

});


// READ CUSTOMERS

async function getAllCustomers() {

    try {

        const response = await fetch("/api/customers");

        if (!response.ok) {
            throw new Error("Unable to fetch customers");
        }

        const customers = await response.json();

        const list = document.getElementById("customerList");

        list.innerHTML = "<h3>Customer List</h3>";

        if (customers.length === 0) {

            list.innerHTML += "<p>No customers found.</p>";

            return;

        }

        customers.forEach(customer => {

            list.innerHTML += `

                <div class="record-card">

                    <p><b>ID:</b> ${escapeHTML(customer.customerId)}</p>

                    <p><b>Name:</b> ${escapeHTML(customer.customerName)}</p>

                    <p><b>Email:</b> ${escapeHTML(customer.email)}</p>

                    <p><b>Phone:</b> ${escapeHTML(customer.phone)}</p>

                    <p><b>Address:</b> ${escapeHTML(customer.address)}</p>

                    <p><b>PAN:</b> ${escapeHTML(customer.panNumber)}</p>

                    <button class="edit-btn"
                        onclick="editCustomer(${Number(customer.customerId)})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteCustomer(${Number(customer.customerId)})">
                        Delete
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}


// EDIT CUSTOMER

async function editCustomer(id) {

    try {

        const response = await fetch(`/api/customers/${id}`);

        if (!response.ok) {
            alert("Customer not found!");
            return;
        }

        const customer = await response.json();

        document.getElementById("customerName").value = customer.customerName;
        document.getElementById("email").value = customer.email;
        document.getElementById("phone").value = customer.phone;
        document.getElementById("address").value = customer.address;
        document.getElementById("panNumber").value = customer.panNumber;

        const form = document.getElementById("customerForm");

        form.dataset.editId = id;

        form.querySelector("button[type='submit']").textContent =
            "Update Customer";

        showSection("customers");

        form.scrollIntoView({ behavior: "smooth" });

    } catch (error) {

        console.error(error);

        alert("Unable to fetch customer!");

    }

}


// DELETE CUSTOMER

function deleteCustomer(id) {

    deleteRecord(
        `/api/customers/${id}`,
        "Customer Deleted Successfully!",
        getAllCustomers
    );

}


// ==========================================
// APPLICATION MANAGEMENT
// ==========================================


// CREATE / UPDATE APPLICATION

document.getElementById("applicationForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const application = {

        loanType: document.getElementById("loanType").value,
        requestedAmount: document.getElementById("requestedAmount").value,
        applicationDate: document.getElementById("applicationDate").value,
        status: document.getElementById("status").value

    };

    try {

        const editId = this.dataset.editId;

        const response = await fetch(
            editId ? `/api/applications/${editId}` : "/api/applications",
            {
                method: editId ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(application)
            }
        );

        if (!response.ok) {
            alert("Application operation failed!");
            return;
        }

        alert(editId
            ? "Application Updated Successfully!"
            : "Application Submitted Successfully!");

        cancelEdit("applicationForm");

        getAllApplications();

    } catch (error) {

        console.error(error);

        alert("Server connection failed!");

    }

});


// READ APPLICATIONS

async function getAllApplications() {

    try {

        const response = await fetch("/api/applications");

        if (!response.ok) {
            throw new Error("Unable to fetch applications");
        }

        const applications = await response.json();

        const list = document.getElementById("applicationList");

        list.innerHTML = "<h3>Loan Application List</h3>";

        if (applications.length === 0) {

            list.innerHTML += "<p>No applications found.</p>";

            return;

        }

        applications.forEach(application => {

            list.innerHTML += `

                <div class="record-card">

                    <p><b>ID:</b> ${escapeHTML(application.applicationId)}</p>

                    <p><b>Loan Type:</b> ${escapeHTML(application.loanType)}</p>

                    <p><b>Requested Amount:</b> ₹${escapeHTML(application.requestedAmount)}</p>

                    <p><b>Application Date:</b> ${escapeHTML(application.applicationDate)}</p>

                    <p><b>Status:</b> ${escapeHTML(application.status)}</p>

                    <button class="edit-btn"
                        onclick="editApplication(${Number(application.applicationId)})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteApplication(${Number(application.applicationId)})">
                        Delete
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}


// EDIT APPLICATION

async function editApplication(id) {

    try {

        const response = await fetch(`/api/applications/${id}`);

        if (!response.ok) {
            alert("Application not found!");
            return;
        }

        const application = await response.json();

        document.getElementById("loanType").value = application.loanType;

        document.getElementById("requestedAmount").value =
            application.requestedAmount;

        document.getElementById("applicationDate").value =
            application.applicationDate;

        document.getElementById("status").value = application.status;

        const form = document.getElementById("applicationForm");

        form.dataset.editId = id;

        form.querySelector("button[type='submit']").textContent =
            "Update Application";

        showSection("applications");

        form.scrollIntoView({ behavior: "smooth" });

    } catch (error) {

        console.error(error);

        alert("Unable to fetch application!");

    }

}


// DELETE APPLICATION

function deleteApplication(id) {

    deleteRecord(
        `/api/applications/${id}`,
        "Application Deleted Successfully!",
        getAllApplications
    );

}


// ==========================================
// PAYMENT MANAGEMENT
// ==========================================


// CREATE / UPDATE PAYMENT

document.getElementById("paymentForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const payment = {

        paymentDate: document.getElementById("paymentDate").value,
        amount: document.getElementById("amount").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        paymentStatus: document.getElementById("paymentStatus").value,
        transactionId: document.getElementById("transactionId").value

    };

    try {

        const editId = this.dataset.editId;

        const response = await fetch(
            editId ? `/api/payments/${editId}` : "/api/payments",
            {
                method: editId ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payment)
            }
        );

        if (!response.ok) {
            alert("Payment operation failed!");
            return;
        }

        alert(editId
            ? "Payment Updated Successfully!"
            : "Payment Added Successfully!");

        cancelEdit("paymentForm");

        getAllPayments();

    } catch (error) {

        console.error(error);

        alert("Server connection failed!");

    }

});


// READ PAYMENTS

async function getAllPayments() {

    try {

        const response = await fetch("/api/payments");

        if (!response.ok) {
            throw new Error("Unable to fetch payments");
        }

        const payments = await response.json();

        const list = document.getElementById("paymentList");

        list.innerHTML = "<h3>Payment List</h3>";

        if (payments.length === 0) {

            list.innerHTML += "<p>No payments found.</p>";

            return;

        }

        payments.forEach(payment => {

            list.innerHTML += `

                <div class="record-card">

                    <p><b>ID:</b> ${escapeHTML(payment.paymentId)}</p>

                    <p><b>Payment Date:</b> ${escapeHTML(payment.paymentDate)}</p>

                    <p><b>Amount:</b> ₹${escapeHTML(payment.amount)}</p>

                    <p><b>Method:</b> ${escapeHTML(payment.paymentMethod)}</p>

                    <p><b>Status:</b> ${escapeHTML(payment.paymentStatus)}</p>

                    <p><b>Transaction ID:</b> ${escapeHTML(payment.transactionId)}</p>

                    <button class="edit-btn"
                        onclick="editPayment(${Number(payment.paymentId)})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deletePayment(${Number(payment.paymentId)})">
                        Delete
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}


// EDIT PAYMENT

async function editPayment(id) {

    try {

        const response = await fetch(`/api/payments/${id}`);

        if (!response.ok) {
            alert("Payment not found!");
            return;
        }

        const payment = await response.json();

        document.getElementById("paymentDate").value = payment.paymentDate;

        document.getElementById("amount").value = payment.amount;

        document.getElementById("paymentMethod").value =
            payment.paymentMethod;

        document.getElementById("paymentStatus").value =
            payment.paymentStatus;

        document.getElementById("transactionId").value =
            payment.transactionId;

        const form = document.getElementById("paymentForm");

        form.dataset.editId = id;

        form.querySelector("button[type='submit']").textContent =
            "Update Payment";

        showSection("payments");

        form.scrollIntoView({ behavior: "smooth" });

    } catch (error) {

        console.error(error);

        alert("Unable to fetch payment!");

    }

}


// DELETE PAYMENT

function deletePayment(id) {

    deleteRecord(
        `/api/payments/${id}`,
        "Payment Deleted Successfully!",
        getAllPayments
    );

}


// ==========================================
// LOAD ALL DATA
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    getAllCustomers();

    getAllApplications();

    getAllPayments();

});