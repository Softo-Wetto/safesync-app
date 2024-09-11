import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; 
import { Link, useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { projectID } = useParams(); // Get projectID from URL params
    const [project, setProject] = useState({});
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch project details
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

        // Fetch project activities
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
            window.location.href = '/projects'; // Redirect to projects list
        } catch (err) {
            console.error('Failed to delete project.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1>{project.name}</h1>
                <p><strong>Description:</strong> {project.description}</p>
                <p><strong>Location:</strong> {project.location}</p>
                <p><strong>Postcode:</strong> {project.postcode}</p>
                <p><strong>City:</strong> {project.city}</p>
                
                {/* Check if a file was uploaded and display the download link */}
                {project.filePath && (
                    <p>
                        <strong>File:</strong> <a href={`http://localhost:5000/${project.filePath}`} target="_blank" rel="noopener noreferrer">Download File</a>
                    </p>
                )}

                <hr />

                {/* Display Project Activities */}
                <h3>Project Activities</h3>
                {activities.length > 0 ? (
                    <ul className="list-group">
                        {activities.map(activity => (
                            <li key={activity.id} className="list-group-item">
                                <h5>{activity.name}</h5>
                                <p>{activity.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No activities found for this project.</p>
                )}
                <br />
                <Link to={`/projects/${projectID}/activities`} className="btn btn-primary me-2">
                    Manage Activities
                </Link>

                <hr />

                {/* Buttons for updating/removing the project at the bottom */}
                <Link to={`/projects/${projectID}/update`} className="btn btn-secondary me-2">
                    Update Project
                </Link>
                <button className="btn btn-danger me-2" onClick={() => handleDeleteProject(projectID)}>
                    Delete Project
                </button>
            </div>
        </div>
    );
};

export default ProjectDetail;
