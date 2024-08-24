import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (token && storedUsername) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setUsername(storedUsername);
                } else {
                    logout(); // Token expired, clear auth state
                }
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    }, []);

    const login = (newUsername) => {
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);
    };

    const logout = () => {
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return { username, login, logout };
};
