import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; 
import { useParams, useNavigate } from 'react-router-dom';

const UpdateActivity = () => {
    const { projectID, activityId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${projectID}/activities`);
                const activity = response.data.find((a) => a.id === parseInt(activityId));
                if (activity) {
                    setName(activity.name);
                    setDescription(activity.description);
                }
            } catch (err) {
                setError('Failed to load activity data.');
            }
        };
        fetchActivity();
    }, [projectID, activityId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/projects/${projectID}/activities/${activityId}/update`, { name, description });
            navigate(`/projects/${projectID}/activities`);
        } catch (err) {
            setError('Failed to update activity.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1>Update Activity</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Activity Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                        ></textarea>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateActivity;
