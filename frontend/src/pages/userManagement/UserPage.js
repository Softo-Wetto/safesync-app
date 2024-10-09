import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import './UserPage.css';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/all');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to load users.');
            }
        };
        fetchUsers();
    }, []);

    const toggleDetails = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1 className="mb-4">Users</h1>
                <p className="text-muted mb-5">Welcome to the User Database. Here you can see who is using this web.</p>
                {error && <p className="text-danger">{error}</p>}
                {users.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Additional Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td data-label="Full Name">{user.fullName}</td>
                                    <td data-label="Username">{user.username}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Phone Number">{user.phoneNumber}</td>
                                    <td data-label="Additional Details">
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={() => toggleDetails(user.id)}
                                        >
                                            {expandedUserId === user.id ? 'Hide Details' : 'Show Details'}
                                        </button>
                                        {expandedUserId === user.id && (
                                            <div className="user-details mt-2">
                                                <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                                                <p><strong>Address:</strong> {user.address}</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
