import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import BuildingInspection from '../../components/fieldTemplates/BuildingInspection';
import ConstructionInspection from '../../components/fieldTemplates/ConstructionInspection';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateActivity = () => {
    const { projectID, activityId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        outcome: 'C',
        activityType: 'Inspection',
        dueDate: '',
        assignedUsers: []
    });
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activityResponse, usersResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/projects/${projectID}/activities/${activityId}`),
                    axios.get('http://localhost:5000/api/users/for-assignment')
                ]);
    
                const activity = activityResponse.data;
                const users = usersResponse.data;
    
                // Set form data once both are available
                if (activity) {
                    setFormData({
                        ...activity,
                        assignedUsers: activity.Users.map(user => user.id),
                    });
                }
                setUsers(users);
            } catch (err) {
                setError('Failed to load activity data.');
            }
        };
    
        fetchData();
    }, [projectID, activityId]);    

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        if (selected.includes('none')) {
            setFormData({
                ...formData,
                assignedUsers: [],
            });
        } else {
            setFormData({
                ...formData,
                assignedUsers: selected,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/projects/${projectID}/activities/${activityId}/update`, formData);
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
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Outcome</label>
                        <select
                            className="form-control"
                            name="outcome"
                            value={formData.outcome}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="NS">Not Started</option>
                            <option value="NC">Not Completed</option>
                            <option value="PC">Partially Completed</option>
                            <option value="C">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Activity Type</label>
                        <select
                            className="form-control"
                            name="activityType"
                            value={formData.activityType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Other">Other</option>
                            <option value="Building Inspection">Inspection (Building Inspection)</option>
                            <option value="Construction Inspection">Inspection (Weekly Construction Inspection)</option>
                            <option value="Training Induction">Training Induction</option>
                            <option value="Testing and Debugging">Testing and Debugging</option>
                        </select>
                    </div>

                    {/* Conditionally Render Field Templates */}
                    {formData.activityType === 'Building Inspection' && (
                        <BuildingInspection formData={formData} handleInputChange={handleInputChange} />
                    )}
                    {formData.activityType === 'Construction Inspection' && (
                        <ConstructionInspection formData={formData} handleInputChange={handleInputChange} />
                    )}

                    <div className="mb-3">
                        <label className="form-label">Due Date (Optional)</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Assigned Users</label>
                        <select
                            multiple
                            className="form-control"
                            value={formData.assignedUsers}
                            onChange={handleUserChange}
                        >
                            <option value="none">None</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateActivity;
