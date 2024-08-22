// src/App.js
import React from 'react';
import './assets/styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <header className="header">
                <h1 className="header-title">Safesync</h1>
                <nav className="nav">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                </nav>
            </header>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
            <footer className="footer">
                <p>&copy; 2024 My Website</p>
            </footer>
        </Router>
    );
}

export default App;
