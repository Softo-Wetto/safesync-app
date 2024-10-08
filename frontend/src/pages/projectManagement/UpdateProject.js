import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; 
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProject = () => {
    const { projectID } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${projectID}`);
                setName(response.data.name);
                setDescription(response.data.description);
                setLocation(response.data.location);
                setPostcode(response.data.postcode);
                setCity(response.data.city);
            } catch (err) {
                setError('Failed to load project data.');
            }
        };
        fetchProject();
    }, [projectID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            name,
            description,
            location,
            postcode,
            city,
        };

        try {
            await axios.put(`http://localhost:5000/api/projects/${projectID}/update`, projectData);
            navigate(`/projects/${projectID}`);
        } catch (err) {
            setError('Failed to update project. Please try again.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1>Update Project</h1>
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
                        ></textarea>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProject;
