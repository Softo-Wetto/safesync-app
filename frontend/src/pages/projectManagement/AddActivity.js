import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';

const AddActivity = () => {
    const { projectID } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [outcome, setOutcome] = useState('C');
    const [activityType, setActivityType] = useState('Inspection');  // Default value
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/projects/${projectID}/activities/add`, { 
                name, 
                description, 
                outcome, 
                activityType  // Send the selected activity type
            });
            navigate(`/projects/${projectID}/activities`);
        } catch (err) {
            setError('Failed to add activity.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1>Add New Activity</h1>
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
                    <div className="mb-3">
                        <label className="form-label">Outcome</label>
                        <select
                            className="form-control"
                            value={outcome}
                            onChange={(e) => setOutcome(e.target.value)}
                            required
                        >
                            <option value="C">C – Compliance</option>
                            <option value="NC">NC – Non-Compliance</option>
                            <option value="N/A">N/A – Not Applicable</option>
                            <option value="U/V">U/V - Unable to Verify</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Activity Type</label>
                        <select
                            className="form-control"
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                            required
                        >
                            <option value="Inspection">Inspection</option>
                            <option value="Training Induction">Training Induction</option>
                            <option value="Testing and Debugging">Testing and Debugging</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Add Activity</button>
                </form>
            </div>
        </div>
    );
};

export default AddActivity;
