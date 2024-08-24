import React from 'react';
import './assets/styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <div className="container my-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Add more routes here if needed */}
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
