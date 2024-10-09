import React from 'react';
import { Navigate } from 'react-router-dom';

// Private route component
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;