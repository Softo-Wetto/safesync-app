import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null); // For file upload
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the inputs on the frontend
        if (!name || !description || !location || !postcode || !city) {
            setError('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('postcode', postcode);
        formData.append('city', city);
        formData.append('description', description);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/projects/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Postcode</label>
                        <input
                            type="text"
                            className="form-control"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
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
                    <div className="mb-3">
                        <label className="form-label">Upload File</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            onChange={handleFileChange} 
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Create Project</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
