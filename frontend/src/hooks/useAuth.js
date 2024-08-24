// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (token && storedUsername) {
            setUsername(storedUsername);
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
