import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const ViewActivity = () => {
    const { activityID } = useParams();
    const [activity, setActivity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/activities/${activityID}`);
                setActivity(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error loading activity details');
                setLoading(false);
            }
        };

        fetchActivity();
    }, [activityID]);

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
                <h1>Activity Details</h1>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">{activity.name}</h5>
                        <p><strong>Description:</strong> {activity.description}</p>
                        <p><strong>Outcome:</strong> {getOutcomeLabel(activity.outcome)}</p>
                        <p><strong>Type:</strong> {activity.activityType}</p>
                        <p><strong>Due Date:</strong> {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'No due date'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions for outcome labels
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

export default ViewActivity;
