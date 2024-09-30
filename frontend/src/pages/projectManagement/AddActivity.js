import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import BuildingInspection from '../../components/fieldTemplates/BuildingInspection';
import ConstructionInspection from '../../components/fieldTemplates/ConstructionInspection';
import { useParams, useNavigate } from 'react-router-dom';

const AddActivity = () => {
    const { projectID } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [outcome, setOutcome] = useState('C');
    const [activityType, setActivityType] = useState('Inspection');
    const [dueDate, setDueDate] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({}); // This will store induction-specific fields
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/for-assignment');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        if (selected.includes('none')) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(selected);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/projects/${projectID}/activities/add`, {
                name,
                description,
                outcome,
                activityType,
                assignedUsers: selectedUsers,
                dueDate: dueDate || null,
                ...formData, // Include any additional form fields from InductionFields
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
                            <option value="Other">Other</option>
                            <option value="Building Inspection">Inspection (Building Inspection)</option>
                            <option value="Construction Inspection">Inspection (Weekly Construction Inspection)</option>
                            <option value="Training Induction">Training Induction</option>
                            <option value="Testing and Debugging">Testing and Debugging</option>
                        </select>
                    </div>

                    {/* Conditionally Render Induction Fields */}
                    {activityType === 'Building Inspection' && (
                        <BuildingInspection formData={formData} handleInputChange={handleInputChange} />
                    )}
                    {activityType === 'Construction Inspection' && (
                        <ConstructionInspection formData={formData} handleInputChange={handleInputChange} />
                    )}

                    <hr></hr>

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
                            <option value="none">None</option>
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
