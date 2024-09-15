import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaDollarSign, FaProjectDiagram, FaCalendarAlt, FaChartLine, FaUserPlus, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa'; // Importing icons
import './Dashboard.css';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <Sidebar />
                {/* Main Content */}
                <div className="container-fluid p-4">
                    <h1 className="mb-4">Overview</h1>
                    <p className="text-muted mb-5">Welcome to your dashboard! Here you can manage your account and view your data.</p>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card text-bg-primary mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaUsers className="me-2" /> Total Users
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">1,234</h5>
                                    <p className="card-text">Total number of users registered on the platform.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-light">View Details</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-bg-success mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaDollarSign className="me-2" /> Revenue
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">$45,234</h5>
                                    <p className="card-text">Total revenue generated this month. Check down below.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-light">View Details</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-bg-warning mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaProjectDiagram className="me-2" /> Active Projects
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">12</h5>
                                    <p className="card-text">Number of projects currently active. See more below.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/projects" className="btn btn-light">View Details</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-bg-info mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" /> Upcoming Events
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">5</h5>
                                    <p className="card-text">Events scheduled for the upcoming month.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-light">View Events</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-bg-danger mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaChartLine className="me-2" /> Performance Metrics
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">87%</h5>
                                    <p className="card-text">Performance metrics for this quarter.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-light">View Metrics</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h2 className="mb-4">Recent Activity</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card shadow-sm rounded">
                                    <div className="card-header d-flex align-items-center">
                                        <FaUserPlus className="me-2" /> New User Registration
                                    </div>
                                    <div className="card-body">
                                        <p>John Doe registered 2 hours ago.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-sm rounded">
                                    <div className="card-header d-flex align-items-center">
                                        <FaShoppingCart className="me-2" /> New Order
                                    </div>
                                    <div className="card-body">
                                        <p>Order #1234 was placed 30 minutes ago.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-sm rounded">
                                    <div className="card-header d-flex align-items-center">
                                        <FaMoneyBillWave className="me-2" /> Payment Received
                                    </div>
                                    <div className="card-body">
                                        <p>Payment for Order #5678 received 1 hour ago.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
