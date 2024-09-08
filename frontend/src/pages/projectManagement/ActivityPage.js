import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; 

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
                <h1>Project Activities</h1>

                {loading ? (
                    <p>Loading activities...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <ul>
                            {activities.map((activity) => (
                                <li key={activity.id}>
                                    <p>{activity.name} - {activity.description}</p>
                                    <Link to={`/projects/${projectID}/activities/${activity.id}/update`} className="btn btn-secondary me-2">
                                        Update
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDeleteActivity(activity.id)}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <Link to={`/projects/${projectID}/activities/add`} className="btn btn-primary mt-4">
                            Add Activity
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityPage;
