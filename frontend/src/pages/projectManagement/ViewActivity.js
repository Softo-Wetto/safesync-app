import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewActivity.css'; // Import the CSS file for enhanced styling

import BuildingInspection from '../../components/fieldTemplates/BuildingInspection'; 
import ConstructionInspection from '../../components/fieldTemplates/ConstructionInspection';
import TestingAndDebugging from '../../components/fieldTemplates/TestingAndDebugging';
import TrainingInduction from '../../components/fieldTemplates/TrainingInduction'; 

const ViewActivity = () => {
    const { projectID, activityID } = useParams();
    const [activity, setActivity] = useState({});
    const [details, setDetails] = useState({}); // Store activity details (inspection form)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const [activityResponse, detailsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/projects/${projectID}/activities/${activityID}`),
                    axios.get(`http://localhost:5000/api/activities/${activityID}/details`) // Fetch details (inspection form)
                ]);
                setActivity(activityResponse.data);
                setDetails(detailsResponse.data); // Set form details
                setLoading(false);
            } catch (err) {
                setError('Failed to load activity details.');
                setLoading(false);
            }
        };

        fetchActivity();
    }, [projectID, activityID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const renderInspectionDetails = () => {
        if (activity.activityType === 'Building Inspection') {
            return (
                <BuildingInspection
                    formData={details.formData}
                    handleInputChange={() => {}}
                    isEditable={false} // Pass isEditable as false to make it view-only
                />
            );
        } else if (activity.activityType === 'Construction Inspection') {
            return (
                <ConstructionInspection
                    formData={details.formData}
                    handleInputChange={() => {}}
                    isEditable={false} // Pass isEditable as false to make it view-only
                />
            );
        } else if (activity.activityType === 'Testing and Debugging') {
            return (
                <TestingAndDebugging
                    formData={details.formData}
                    handleInputChange={() => {}}
                    isEditable={false} // Pass isEditable as false to make it view-only
                />
            );
        } else if (activity.activityType === 'Training Induction') {
            return (
                <TrainingInduction
                    formData={details.formData}
                    handleInputChange={() => {}}
                    isEditable={false} // Pass isEditable as false to make it view-only
                />
            );
        } else {
            return <p>No inspection data available for this activity type.</p>;
        }
    };
    

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="btn btn-light back-button mb-3">
                    <i className="bi bi-arrow-left"></i> Back
                </button>
                <h1>Activity Details</h1>
                <br />
                <div className="activity-card">
                    <div className="card-body">
                        <h5 className="card-title">{activity.name}</h5>
                        <hr />
                        <p><strong>Description:</strong> {activity.description}</p>
                        <p>
                            <strong>Outcome: </strong>
                            <span className={`badge bg-${getBadgeClass(activity.outcome)}`}>
                                {getOutcomeLabel(activity.outcome)}
                            </span>
                        </p>
                        <p><strong>Activity Type:</strong> {activity.activityType}</p>
                        <p><strong>Due Date:</strong> {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'No due date'}</p>
                        <p><strong>Created At:</strong> {new Date(activity.createdAt).toLocaleString()}</p>
                        <p><strong>Last Updated At:</strong> {new Date(activity.updatedAt).toLocaleString()}</p>

                        {/* Display Assigned Users */}
                        <h6>Assigned Users</h6>
                        {activity.Users && activity.Users.length > 0 ? (
                            <ul>
                                {activity.Users.map((user) => (
                                    <li key={user.id}>{user.fullName}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users assigned to this activity.</p>
                        )}
                        <hr />
                        {/* Display Inspection Form Data */}
                        {renderInspectionDetails()}

                        {/* Display Images */}
                        {details.images && details.images.length > 0 && (
                            <div className="mb-3">
                                <h5>Uploaded Images</h5>
                                <div className="image-previews">
                                    {details.images.map((image, index) => (
                                        <div key={index} className="preview-image">
                                            <img
                                                src={`http://localhost:5000/uploads/${image}`}
                                                alt={`Uploaded ${index + 1}`}
                                                style={{ width: '150px', height: '150px' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions
const getOutcomeLabel = (outcome) => {
    switch (outcome) {
        case 'NS':
            return 'Not Started';
        case 'NC':
            return 'Not Completed';
        case 'PC':
            return 'Partially Completed';
        case 'C':
            return 'Completed';
        default:
            return 'Unknown';
    }
};

const getBadgeClass = (outcome) => {
    switch (outcome) {
        case 'C':
            return 'success';
        case 'NS':
            return 'danger';
        case 'PC':
            return 'secondary';
        case 'NC':
            return 'warning';
        default:
            return 'dark';
    }
};

export default ViewActivity;
