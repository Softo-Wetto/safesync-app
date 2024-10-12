import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Link, useParams } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { projectID } = useParams();
    const [project, setProject] = useState({});
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectResponse = await axios.get(`http://localhost:5000/api/projects/${projectID}`);
                setProject(projectResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load project details. Please try again later.');
                setLoading(false);
            }
        };

        const fetchActivities = async () => {
            try {
                const activitiesResponse = await axios.get(`http://localhost:5000/api/projects/${projectID}/activities`);
                setActivities(activitiesResponse.data);
            } catch (err) {
                setError('Failed to load project activities.');
            }
        };

        fetchProject();
        fetchActivities();
    }, [projectID]);

    const handleDeleteProject = () => {
        // Show the modal with an appropriate message
        if (activities.length > 0) {
            setModalMessage("This project has activities. Please delete all activities before deleting the project.");
        } else {
            setModalMessage("Are you sure you want to delete this project?");
        }
        setShowModal(true); // Show the modal
    };

    const confirmDeleteProject = async () => {
        if (activities.length === 0) {
            try {
                await axios.delete(`http://localhost:5000/api/projects/${projectID}/remove`);
                window.location.href = '/projects'; // Redirect after deletion
            } catch (err) {
                console.error('Failed to delete project.');
            }
        }
        setShowModal(false); // Close the modal after confirmation
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid position-relative">
                
                {/* Back Button Positioned Outside */}
                <Link to="/projects" className="btn btn-light back-button">
                    <i className="bi bi-arrow-left"></i> Back
                </Link>

                <div className="card project-detail-card shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h1 className="card-title">{project.name}</h1>
                        <div>
                            <Link to={`/projects/${projectID}/update`} className="btn btn-secondary btn-lg me-2">
                                Update Project
                            </Link>
                            <button className="btn btn-danger btn-lg" onClick={handleDeleteProject}>
                                Delete Project
                            </button>
                        </div>
                    </div>

                    <div className="card-body">
                        <p><strong>Description:</strong> {project.description || 'No description provided.'}</p>
                        <p><strong>Location:</strong> {project.location}</p>
                        <p><strong>Postcode:</strong> {project.postcode}</p>
                        <p><strong>City:</strong> {project.city}</p>
                        
                        {/* Display Created and Updated Timestamps */}
                        <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
                        <p><strong>Last Updated At:</strong> {new Date(project.updatedAt).toLocaleString()}</p>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Project Activities</h3>
                            <Link to={`/projects/${projectID}/activities`} className="btn btn-primary btn-lg">
                                Manage Activities
                            </Link>
                        </div>
                        <br />
                        {activities.length > 0 ? (
                            <div className="row">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="col-md-6 col-lg-4">
                                        <div className="card mb-4 shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title">{activity.name}</h5>
                                                <p className="card-text">{activity.description}</p>
                                                <p>
                                                    <strong>Outcome: </strong>
                                                    <span className={`badge bg-${getBadgeClass(activity.outcome)}`}>
                                                        {getOutcomeLabel(activity.outcome)}
                                                    </span>
                                                </p>
                                                <p><strong>Type:</strong> {activity.activityType}</p>
                                                
                                                {/* Display Due Date if Available */}
                                                {activity.dueDate && (
                                                    <p><strong>Due Date:</strong> {new Date(activity.dueDate).toLocaleDateString()}</p>
                                                )}

                                                {/* Display Created and Updated Timestamps for Each Activity */}
                                                <p><strong>Created At:</strong> {new Date(activity.createdAt).toLocaleString()}</p>
                                                <p><strong>Last Updated At:</strong> {new Date(activity.updatedAt).toLocaleString()}</p>

                                                {/* Display Assigned Users */}
                                                <h6>Assigned Users</h6>
                                                {activity.Users && activity.Users.length > 0 ? (
                                                    <ul>
                                                        {activity.Users.map((user) => (
                                                            <li key={user.id}>{user.fullName}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No users assigned to this activity.</p>
                                                )}

                                                <div className="d-flex justify-content-between mt-3">
                                                    <Link to={`/projects/${projectID}/activities/${activity.id}/view`} className="btn btn-outline-primary">
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No activities found for this project.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)} // Close modal
                onConfirm={confirmDeleteProject} // Confirm delete
            />
        </div>
    );
};

// Helper functions for displaying outcome labels and badges
const getOutcomeLabel = (outcome) => {
    switch (outcome) {
        case 'NS':
            return 'Not Started';
        case 'NC':
            return 'Not Completed';
        case 'PC':
            return 'Partially Completed';
        case 'C':
            return 'Completed';
        default:
            return 'Unknown';
    }
};

const getBadgeClass = (outcome) => {
    switch (outcome) {
        case 'C':
            return 'success';
        case 'NS':
            return 'danger';
        case 'PC':
            return 'secondary';
        case 'NC':
            return 'warning';
        default:
            return 'dark';
    }
};

export default ProjectDetail;
