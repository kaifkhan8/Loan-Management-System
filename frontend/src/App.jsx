import { useEffect, useState } from 'react';
import './App.css';

import { getAllCustomers } from './services/customerService';

import Customer from './components/Customer';
import Application from './components/Application';
import Loan from './components/Loan';
import Payment from './components/Payment';
import EMI from './components/EMI';

function App() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>Loan<span>Sphere</span></h2>

        <ul>

          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            🏠 Dashboard
          </li>

          <li
            className={activePage === "customers" ? "active" : ""}
            onClick={() => setActivePage("customers")}
          >
            👥 Customers
          </li>

          <li
            className={activePage === "applications" ? "active" : ""}
            onClick={() => setActivePage("applications")}
          >
            📋 Applications
          </li>

          <li
            className={activePage === "loans" ? "active" : ""}
            onClick={() => setActivePage("loans")}
          >
            💰 Loans
          </li>

          <li
            className={activePage === "payments" ? "active" : ""}
            onClick={() => setActivePage("payments")}
          >
            💳 Payments
          </li>

          <li
            className={activePage === "emi" ? "active" : ""}
            onClick={() => setActivePage("emi")}
          >
            📅 EMI Schedule
          </li>

        </ul>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Dashboard */}
        {activePage === "dashboard" && (

          <>

            <header className="header">

              <div>
                <h1>Dashboard</h1>
                <p>Welcome to Loan Management System</p>
              </div>

              <div className="profile">
                <span>Admin</span>
                <div className="avatar">A</div>
              </div>

            </header>

            {/* Statistics */}
            <section className="stats">

              <div className="card">
                <h3>Total Customers</h3>
                <h2>{customers.length}</h2>
                <p>Registered customers</p>
              </div>

              <div className="card">
                <h3>Loan Applications</h3>
                <h2>
                  {customers.reduce(
                    (total, customer) =>
                      total + (customer.applications?.length || 0), 0
                  )}
                </h2>
                <p>Total applications</p>
              </div>

              <div className="card">
                <h3>Active Loans</h3>
                <h2>
                  {customers.reduce(
                    (total, customer) =>
                      total + (customer.applications || []).filter(
                        app => app.loan?.loanStatus === 'ACTIVE'
                      ).length, 0
                  )}
                </h2>
                <p>Currently active</p>
              </div>

              <div className="card">
                <h3>Live Database</h3>
                <h2>{loading ? "..." : "Connected"}</h2>
                <p>PostgreSQL records</p>
              </div>

            </section>

            {/* Customer Details */}
            <section className="recent">

              <h2>Customer Details</h2>

              {loading ? (

                <p>Loading customers...</p>

              ) : (

                <table>

                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>

                  <tbody>

                    {customers.map(customer => (

                      <tr key={customer.customerId}>
                        <td>{customer.customerId}</td>
                        <td>{customer.customerName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                      </tr>

                    ))}

                  </tbody>

                </table>

              )}

            </section>

          </>

        )}

        {/* Customers */}
        {activePage === "customers" && <Customer />}

        {/* Applications */}
        {activePage === "applications" && <Application />}

        {/* Loans */}
        {activePage === "loans" && <Loan />}

        {/* Payments */}
        {activePage === "payments" && <Payment />}

        {/* EMI Schedule */}
        {activePage === "emi" && <EMI />}

      </main>

    </div>
  );
}

export default App;