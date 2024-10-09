import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks, FaProjectDiagram, FaCalendarAlt, FaClipboardCheck, FaBars } from 'react-icons/fa';
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
                    <Link className="sidebar-nav-link" to="/users">
                        <FaUsers className="sidebar-icon" />
                        {!isCollapsed && <span>Users</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="/kanban-board">
                        <FaTasks className="sidebar-icon" />
                        {!isCollapsed && <span>Task Board</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="/projects">
                        <FaProjectDiagram className="sidebar-icon" />
                        {!isCollapsed && <span>Projects</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="/calendar">
                        <FaCalendarAlt className="sidebar-icon" />
                        {!isCollapsed && <span>Events</span>}
                    </Link>
                </li>
                <li className="sidebar-nav-item">
                    <Link className="sidebar-nav-link" to="/tasks">
                        <FaClipboardCheck className="sidebar-icon" />
                        {!isCollapsed && <span>Progress</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
