import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateActivity = () => {
    const { projectID, activityId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [outcome, setOutcome] = useState('C');
    const [activityType, setActivityType] = useState('Inspection');
    const [dueDate, setDueDate] = useState(''); // New state for due date
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
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
                    setOutcome(activity.outcome);
                    setActivityType(activity.activityType);
                    setDueDate(activity.dueDate || ''); // Set the due date if available
                    setSelectedUsers(activity.Users.map((user) => user.id)); // Pre-select assigned users
                }
            } catch (err) {
                setError('Failed to load activity data.');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/for-assignment');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to load users.');
            }
        };

        fetchActivity();
        fetchUsers();
    }, [projectID, activityId]);

    const handleUserChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        if (selected.includes('none')) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(selected);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/projects/${projectID}/activities/${activityId}/update`, {
                name,
                description,
                outcome,
                activityType,
                dueDate: dueDate || null,  // Send due date or null if not set
                assignedUsers: selectedUsers,
            });
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
                    <div className="mb-3">
                        <label className="form-label">Outcome</label>
                        <select
                            className="form-control"
                            value={outcome}
                            onChange={(e) => setOutcome(e.target.value)}
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

                    {/* Due Date Input */}
                    <div className="mb-3">
                        <label className="form-label">Due Date (Optional)</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Assigned Users</label>
                        <select
                            multiple
                            className="form-control"
                            value={selectedUsers}
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
