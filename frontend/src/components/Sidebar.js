import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaDollarSign, FaProjectDiagram, FaCalendarAlt, FaChartLine, FaBars } from 'react-icons/fa';
import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <button className="collapse-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                {!isCollapsed && <h2>Dashboard</h2>}
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="/dashboard">
                        <FaHome className="sidebar-icon" />
                        {!isCollapsed && <span>Overview</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaUsers className="sidebar-icon" />
                        {!isCollapsed && <span>Users</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaDollarSign className="sidebar-icon" />
                        {!isCollapsed && <span>Revenue</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="/projects">
                        <FaProjectDiagram className="sidebar-icon" />
                        {!isCollapsed && <span>Projects</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaCalendarAlt className="sidebar-icon" />
                        {!isCollapsed && <span>Events</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="#">
                        <FaChartLine className="sidebar-icon" />
                        {!isCollapsed && <span>Metrics</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
