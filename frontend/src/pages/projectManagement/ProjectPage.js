import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; 
import { Link } from 'react-router-dom';
import './ProjectPage.css';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch projects based on search query
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/projects', { params: { search: searchQuery } });
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects. Please try again later.');
                setLoading(false);
            }
        };

        fetchProjects();
    }, [searchQuery]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="project-page container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Project List</h1>
                    <Link to="/projects/create" className="btn btn-success btn-lg">
                        Create New Project
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-4 position-relative">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control border rounded-pill ps-5"
                        style={{ borderRadius: '25px' }}
                    />
                    <i
                        className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"
                        style={{ fontSize: '1.2rem', color: '#6c757d' }}
                    ></i>
                </div>

                {/* Loading/Error */}
                {loading ? (
                    <p>Loading projects...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : projects.length === 0 ? (  // Check if no projects
                    <p>No projects found. Try creating one!</p>
                ) : (
                    <div className="project-list">
                        {projects.map((project) => (
                            <div 
                                key={project.id} 
                                className="project-item card shadow-sm"
                                style={{ cursor: 'pointer' }} // Pointer cursor to indicate clickable
                                onClick={() => window.location.href = `/projects/${project.id}`} // Navigate to project details
                            >
                                <div className="card-body">
                                    {/* Project Title */}
                                    <h5 className="card-title text-center">{project.name}</h5>

                                    {/* Project Details Container with Darker Background and More Rounded Corners */}
                                    <div className="project-details p-3 mb-3">
                                        <p className="card-text">
                                            <strong>Description: </strong>{project.description}
                                        </p>
                                        <p className="card-text">
                                            <strong>Location: </strong>{project.location}
                                        </p>
                                        <p className="card-text">
                                            <strong>Postcode: </strong>{project.postcode}
                                        </p>
                                        <p className="card-text">
                                            <strong>City: </strong>{project.city}
                                        </p>

                                        {/* Activities Section */}
                                        {project.activities && project.activities.length > 0 && (
                                            <div className="activities-section">
                                                <h6>Activities:</h6>
                                                <ul>
                                                    {project.activities.map((activity) => (
                                                        <li key={activity.id}>
                                                            {activity.name} - Outcome: {activity.outcome}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
