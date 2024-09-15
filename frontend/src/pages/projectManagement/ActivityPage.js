import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ActivityPage.css'; // Custom CSS for better styling

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

    const handleDeleteActivity = async (activityId) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${projectID}/activities/${activityId}/remove`);
            setActivities(activities.filter((activity) => activity.id !== activityId));
        } catch (err) {
            setError('Failed to delete activity.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <div className="activity-header mb-4">
                    <h1 className="display-4">Project Activities</h1>
                    <Link to={`/projects/${projectID}/activities/add`} className="btn btn-primary btn-lg">
                        Add Activity
                    </Link>
                </div>

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
                                        <p>
                                            <strong>Activity Type: </strong> {activity.activityType} {/* Display activityType here */}
                                        </p>
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
        case 'C':
            return 'Compliance';
        case 'NC':
            return 'Non-Compliance';
        case 'N/A':
            return 'Not Applicable';
        case 'U/V':
            return 'Unable to Verify';
        default:
            return 'Unknown';
    }
};

const getBadgeClass = (outcome) => {
    switch (outcome) {
        case 'C':
            return 'success'; // Green badge for compliance
        case 'NC':
            return 'danger'; // Red badge for non-compliance
        case 'N/A':
            return 'secondary'; // Gray badge for not applicable
        case 'U/V':
            return 'warning'; // Yellow badge for unable to verify
        default:
            return 'dark'; // Dark badge for unknown outcome
    }
};

export default ActivityPage;
