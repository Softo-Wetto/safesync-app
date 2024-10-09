// src/utils/axios.js
import axios from 'axios';

const authAxios = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

// Interceptor to catch 401 errors and redirect to login if token is expired
authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid - log the user out
            localStorage.removeItem('token'); // Clear token
            localStorage.removeItem('username'); // Clear user details (if any)
            
            // Redirect to login page with session expired message
            window.location.href = '/login?sessionExpired=true';
        }
        return Promise.reject(error);
    }
);

export default authAxios;