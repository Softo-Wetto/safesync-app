import React from 'react';
import './assets/styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import ProjectPage from './pages/projectManagement/ProjectPage';
import ProjectDetail from './pages/projectManagement/ProjectDetail';
import CreateProject from './pages/projectManagement/CreateProject';
import UpdateProject from './pages/projectManagement/UpdateProject';
import ActivityPage from './pages/projectManagement/ActivityPage';
import AddActivity from './pages/projectManagement/AddActivity';
import UpdateActivity from './pages/projectManagement/UpdateActivity'; 

import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <div className="container my-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Project Management Routes */}
                    <Route path="/projects" element={<ProjectPage />} />
                    <Route path="/projects/create" element={<CreateProject />} />
                    <Route path="/projects/:projectID" element={<ProjectDetail />} />
                    <Route path="/projects/:projectID/update" element={<UpdateProject />} />
                    <Route path="/projects/:projectID/activities" element={<ActivityPage />} />
                    <Route path="/projects/:projectID/activities/add" element={<AddActivity />} />
                    <Route path="/projects/:projectID/activities/:activityId/update" element={<UpdateActivity />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
