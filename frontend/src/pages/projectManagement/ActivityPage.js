import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ActivityPage.css'; 

const ActivityPage = () => {
    const { projectID } = useParams();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${projectID}/activities`);
                setActivities(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load activities.');
                setLoading(false);
            }
        };
        fetchActivities();
    }, [projectID]);

    // Handle deleting a single activity
    const handleDeleteActivity = async (activityId) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${projectID}/activities/${activityId}/remove`);
            setActivities(activities.filter((activity) => activity.id !== activityId));
        } catch (err) {
            setError('Failed to delete activity.');
        }
    };

    // Handle deleting all activities
    const handleDeleteAllActivities = async () => {
        const confirmDeleteAll = window.confirm("Are you sure you want to delete all activities for this project?");
        if (!confirmDeleteAll) return;

        try {
            await Promise.all(activities.map(activity => 
                axios.delete(`http://localhost:5000/api/projects/${projectID}/activities/${activity.id}/remove`)
            ));
            setActivities([]); // Clear activities array after deletion
        } catch (err) {
            setError('Failed to delete all activities.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <div className="activity-header mb-4 d-flex justify-content-between align-items-center">
                    <h1 className="display-4">Project Activities</h1>
                    <div>
                        <Link to={`/projects/${projectID}/activities/add`} className="btn btn-primary btn-lg me-2">
                            Add Activity
                        </Link>
                        {/* Render "Delete All Activities" button if there are more than one activity */}
                        {activities.length > 1 && (
                            <button className="btn btn-danger btn-lg" onClick={handleDeleteAllActivities}>
                                Delete All Activities
                            </button>
                        )}
                    </div>
                </div>

                {/* Back to Project Detail button */}
                <Link to={`/projects/${projectID}`} className="btn btn-light back-button mb-4">
                    <i className="bi bi-arrow-left"></i> Back to Project
                </Link>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : activities.length === 0 ? (
                    <p className="text-muted">No activities found for this project. Try adding some!</p>
                ) : (
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
                                        <p><strong>Activity Type: </strong> {activity.activityType}</p>

                                        {/* Display dueDate, createdAt, and updatedAt */}
                                        {activity.dueDate && (
                                            <p><strong>Due Date:</strong> {new Date(activity.dueDate).toLocaleDateString()}</p>
                                        )}
                                        <p><strong>Created On:</strong> {new Date(activity.createdAt).toLocaleString()}</p>
                                        <p><strong>Last Updated:</strong> {new Date(activity.updatedAt).toLocaleString()}</p>

                                        {/* Display Assigned Users */}
                                        <h6>Assigned Users:</h6>
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
                                            <Link to={`/projects/${projectID}/activities/${activity.id}/update`} className="btn btn-outline-secondary">
                                                Update
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => handleDeleteActivity(activity.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper functions for outcome labels and badge styling
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
            return 'success'; // Green badge for completed
        case 'NS':
            return 'danger'; // Red badge for not started
        case 'PC':
            return 'secondary'; // Gray badge for partially completed
        case 'NC':
            return 'warning'; // Yellow badge for not completed
        default:
            return 'dark'; // Dark badge for unknown outcome
    }
};

export default ActivityPage;
