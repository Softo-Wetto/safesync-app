import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaProjectDiagram, FaCalendarAlt, FaClipboardCheck, FaUserPlus, FaShoppingCart, FaMoneyBillWave, FaTasks } from 'react-icons/fa'; // Importing icons
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
                        
                        {/* Users Card */}
                        <div className="col-md-4">
                            <div className="card text-bg-primary mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaUsers className="me-2" /> Users
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">See All Users</h5>
                                    <p className="card-text">View and check details of users that are registered on this platform.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/users" className="btn btn-light">View User Details</Link>
                                </div>
                            </div>
                        </div>

                        {/* Task Board Card */}
                        <div className="col-md-4">
                            <div className="card text-bg-success mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaTasks className="me-2" /> Task Board
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Manage Your Tasks</h5>
                                    <p className="card-text">View and manage all your activities in a Kanban-style task board.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/kanban-board" className="btn btn-light">View Task Board</Link>
                                </div>
                            </div>
                        </div>

                        {/* Active Projects Card */}
                        <div className="col-md-4">
                            <div className="card text-bg-warning mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaProjectDiagram className="me-2" /> Active Projects
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Manage Your Projects</h5>
                                    <p className="card-text">View and manage number of projects currently active. See more below.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/projects" className="btn btn-light">View Project Details</Link>
                                </div>
                            </div>
                        </div>

                        {/* Events Card */}
                        <div className="col-md-4">
                            <div className="card text-bg-info mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" /> Events
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">See Activities Due</h5>
                                    <p className="card-text">View and check activities that are scheduled for the upcoming month.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/calendar" className="btn btn-light">View Event Details</Link>
                                </div>
                            </div>
                        </div>

                        {/* Performance Metrics Card */}
                        <div className="col-md-4">
                            <div className="card text-bg-danger mb-3 shadow-lg rounded">
                                <div className="card-header d-flex align-items-center">
                                    <FaClipboardCheck className="me-2" /> Task Progress
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">View Task Progress</h5>
                                    <p className="card-text">View and manage how much progress you have made during development</p>
                                </div>
                                <div className="card-footer">
                                <Link to="/tasks" className="btn btn-light">View Progress Details</Link>
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
