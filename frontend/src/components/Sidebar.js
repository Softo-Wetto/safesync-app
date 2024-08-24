import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaDollarSign, FaProjectDiagram, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import './Sidebar.css'; // Import the new CSS file for styling

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Dashboard</h2>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaHome className="sidebar-icon" /> 
                        <span>Overview</span>
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaUsers className="sidebar-icon" /> 
                        <span>Users</span>
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaDollarSign className="sidebar-icon" /> 
                        <span>Revenue</span>
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaProjectDiagram className="sidebar-icon" /> 
                        <span>Projects</span>
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaCalendarAlt className="sidebar-icon" /> 
                        <span>Events</span>
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaChartLine className="sidebar-icon" /> 
                        <span>Metrics</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
