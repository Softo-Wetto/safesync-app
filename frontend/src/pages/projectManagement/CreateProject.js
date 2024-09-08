import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the inputs on the frontend
        if (!name || !description) {
            setError('Name and description are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/projects/create', { name, description });
            if (response.status === 201) {
                navigate('/projects');
            } else {
                setError('Failed to create project');
            }
        } catch (err) {
            console.error('Error creating project:', err);
            setError('Failed to create project. Please try again.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1>Create New Project</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Project Name</label>
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
                            required
                        ></textarea>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Create Project</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
