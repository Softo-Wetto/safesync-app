import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Link, useParams } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { projectID } = useParams();
    const [project, setProject] = useState({});
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectResponse = await axios.get(`http://localhost:5000/api/projects/${projectID}`);
                setProject(projectResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load project details. Please try again later.');
                setLoading(false);
            }
        };

        const fetchActivities = async () => {
            try {
                const activitiesResponse = await axios.get(`http://localhost:5000/api/projects/${projectID}/activities`);
                setActivities(activitiesResponse.data);
            } catch (err) {
                setError('Failed to load project activities.');
            }
        };

        fetchProject();
        fetchActivities();
    }, [projectID]);

    const handleDeleteProject = async (projectID) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${projectID}/remove`);
            window.location.href = '/projects';
        } catch (err) {
            console.error('Failed to delete project.');
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <div className="card project-detail-card shadow-sm">
                    <div className="card-header">
                        <h1 className="card-title">{project.name}</h1>
                        <Link to="/projects" className="btn btn-light back-button">
                            <i className="bi bi-arrow-left"></i>
                        </Link>
                    </div>
                    <div className="card-body">
                        <p><strong>Type:</strong> {project.type || 'N/A'}</p>
                        <p><strong>Description:</strong> {project.description || 'No description provided.'}</p>
                        <p><strong>Location:</strong> {project.location}</p>
                        <p><strong>Postcode:</strong> {project.postcode}</p>
                        <p><strong>City:</strong> {project.city}</p>

                        {project.filePath && (
                            <p>
                                <strong>File:</strong>{' '}
                                <a href={`http://localhost:5000/${project.filePath}`} target="_blank" rel="noopener noreferrer">
                                    Download File
                                </a>
                            </p>
                        )}

                        <hr />

                        <h3>Project Activities</h3>
                        {activities.length > 0 ? (
                            <div className="activity-list">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="activity-item card mb-3 shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{activity.name}</h5>
                                            <p className="card-text">{activity.description}</p>
                                            <p><strong>Outcome:</strong> {getOutcomeLabel(activity.outcome)}</p>
                                            <p><strong>Type:</strong> {activity.activityType}</p>
                                            <Link to={`/projects/${projectID}/activities/${activity.id}/update`} className="btn btn-outline-secondary">
                                                Update Activity
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No activities found for this project.</p>
                        )}

                        <br />
                        <Link to={`/projects/${projectID}/activities`} className="btn btn-primary me-2">
                            Manage Activities
                        </Link>

                        <hr />

                        <div className="project-actions">
                            <Link to={`/projects/${projectID}/update`} className="btn btn-secondary me-2">
                                Update Project
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDeleteProject(projectID)}>
                                Delete Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getOutcomeLabel = (outcome) => {
    switch (outcome) {
        case 'C':
            return 'Compliance';
        case 'NC':
            return 'Non-Compliance';
        case 'N/A':
            return 'Not Applicable';
        case 'U/V':
            return 'Unable to Verify';
        default:
            return 'Unknown';
    }
};

export default ProjectDetail;
