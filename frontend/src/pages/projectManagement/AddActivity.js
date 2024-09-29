import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';

const AddActivity = () => {
    const { projectID } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [outcome, setOutcome] = useState('C');
    const [activityType, setActivityType] = useState('Inspection');
    const [dueDate, setDueDate] = useState(''); // New state for due date
    const [users, setUsers] = useState([]); // Store all users
    const [selectedUsers, setSelectedUsers] = useState([]); // Store selected users
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users for assignment
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/for-assignment'); // Adjust if needed
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);

        // Check if 'None' is selected
        if (selected.includes('none')) {
            setSelectedUsers([]); // Clear the selected users
        } else {
            setSelectedUsers(selected);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/projects/${projectID}/activities/add`, {
                name,
                description,
                outcome,
                activityType,
                assignedUsers: selectedUsers, // Send selected users
                dueDate: dueDate || null,  // Send due date or null if not set
            });
            if (response.status === 201) {
                navigate(`/projects/${projectID}/activities`);
            }
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
                            <option value="C">Completed</option>
                            <option value="NC">Not Completed</option>
                            <option value="PC">Partially Completed</option>
                            <option value="NS">Not Started</option>
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
                        <label className="form-label">Assign Users</label>
                        <select
                            multiple
                            className="form-control"
                            value={selectedUsers}
                            onChange={handleUserChange}
                        >
                            <option value="none">None</option> {/* Add None Option */}
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.fullName}
                                </option>
                            ))}
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
