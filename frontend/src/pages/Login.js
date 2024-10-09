// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for query params
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [sessionExpired, setSessionExpired] = useState(false); // State for session expired message
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Access location for query params

    useEffect(() => {
        // Check if the sessionExpired query parameter is present
        const params = new URLSearchParams(location.search);
        if (params.get('sessionExpired')) {
            setSessionExpired(true); // Set sessionExpired state to true if the parameter exists
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            login(response.data.username); 
            navigate('/dashboard');
            window.location.reload(); 
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {/* Display session expired message if true */}
            {sessionExpired && (
                <div className="alert alert-warning" role="alert">
                    Your session has expired. Please login again to continue.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
