import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; // If you have a sidebar component
import './UserPage.css'; // Import the CSS file

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/all'); // Adjust API path if needed
                setUsers(response.data);
            } catch (err) {
                setError('Failed to load users.');
            }
        };
        fetchUsers();
    }, []);

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
                                <th>Date of Birth</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td data-label="Full Name">{user.fullName}</td>
                                    <td data-label="Username">{user.username}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Date of Birth">{user.dateOfBirth}</td>
                                    <td data-label="Address">{user.address}</td>
                                    <td data-label="Phone Number">{user.phoneNumber}</td>
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
