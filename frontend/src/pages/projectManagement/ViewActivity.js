import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const ViewActivity = () => {
    const { projectID, activityID } = useParams();
    const [activity, setActivity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${projectID}/activities/${activityID}`);
                setActivity(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load activity details.');
                setLoading(false);
            }
        };

        fetchActivity();
    }, [projectID, activityID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                 {/* Back Button Styled */}
                    <button onClick={() => navigate(-1)} className="btn btn-light back-button mb-3">
                <i className="bi bi-arrow-left"></i> Back
                </button>
                <h1>Activity Details</h1>
                <br></br>
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">{activity.name}</h5><hr></hr>
                        <p><strong>Description:</strong> {activity.description}</p>
                        <p>
                            <strong>Outcome: </strong>
                            <span className={`badge bg-${getBadgeClass(activity.outcome)}`}>
                                {getOutcomeLabel(activity.outcome)}
                            </span>
                        </p>
                        <p><strong>Activity Type:</strong> {activity.activityType}</p>
                        <p><strong>Due Date:</strong> {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'No due date'}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions
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

export default ViewActivity;
