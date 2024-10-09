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
import PrivateRoute from './components/PrivateRoute';

import ViewActivity from './pages/projectManagement/ViewActivity';  
import ProjectPage from './pages/projectManagement/ProjectPage';
import ProjectDetail from './pages/projectManagement/ProjectDetail';
import CreateProject from './pages/projectManagement/CreateProject';
import UpdateProject from './pages/projectManagement/UpdateProject';
import ActivityPage from './pages/projectManagement/ActivityPage';
import AddActivity from './pages/projectManagement/AddActivity';
import UpdateActivity from './pages/projectManagement/UpdateActivity'; 

import UserPage from './pages/userManagement/UserPage';

import CalendarPage from './pages/calendarManagement/CalendarPage';
import ViewCalendarActivity from './pages/calendarManagement/ViewCalendarActivity';

import TaskBoard from './pages/taskManagement/TaskBoard';
import TaskProgress from './pages/taskManagement/TaskProgress';

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
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Project Management Routes */}
                    <Route path="/projects/:projectID/activities/:activityID/view" element={<ViewActivity />} />
                    <Route path="/projects" element={<ProjectPage />} />
                    <Route path="/projects/create" element={<CreateProject />} />
                    <Route path="/projects/:projectID" element={<ProjectDetail />} />
                    <Route path="/projects/:projectID/update" element={<UpdateProject />} />
                    <Route path="/projects/:projectID/activities" element={<ActivityPage />} />
                    <Route path="/projects/:projectID/activities/add" element={<AddActivity />} />
                    <Route path="/projects/:projectID/activities/:activityId/update" element={<UpdateActivity />} />

                    {/* User Management Routes */}
                    <Route path="/users" element={<UserPage />} />

                    {/* Calendar Management Routes */}
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/activities/:activityID" element={<ViewCalendarActivity />} />

                    {/* Task Management Routes */}
                    <Route path="/kanban-board" element={<TaskBoard />} />
                    <Route path="/tasks" element={<TaskProgress />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
