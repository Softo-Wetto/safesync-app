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

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${projectId}/remove`);
            setProjects((prev) => prev.filter((project) => project.id !== projectId));
        } catch (err) {
            console.error('Error deleting project:', err);
            setError('Failed to delete project.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="project-page container-fluid">
                <h1 className="mb-4">Projects</h1>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control mb-4"
                />

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
                            <div key={project.id} className="project-item card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{project.name}</h5>
                                    <p className="card-text">{project.description}</p>
                                    <Link to={`/projects/${project.id}`} className="btn btn-primary me-2">
                                        View Details
                                    </Link>
                                    <Link to={`/projects/${project.id}/update`} className="btn btn-secondary me-2">
                                        Update
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteProject(project.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Link to="/projects/create" className="btn btn-success mt-4">
                    Create New Project
                </Link>
            </div>
        </div>
    );
};

export default ProjectPage;