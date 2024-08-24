import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Adjust the path to where your Sidebar component is located
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendar, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'; // Keep this for any custom styles

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to load profile. Please try again later.');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="profile-content text-center">Loading...</div>;
    }

    if (error) {
        return <div className="profile-content text-danger text-center">{error}</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="profile-page container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card mt-5 shadow-lg">
                            <div className="card-body text-center">
                                <img 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUyPsA28oucXae-KVrv2IWWo1sy5S6VqqPrQ&s" 
                                    alt="Profile" 
                                    className="rounded-circle mb-4 profile-picture"
                                />
                                <h1 className="card-title mb-4">User Profile</h1>
                                <div className="profile-card">
                                    <div className="profile-field mb-3">
                                        <FontAwesomeIcon icon={faUser} className="me-2" />
                                        <strong>Full Name:</strong> {user.fullName}
                                    </div>
                                    <div className="profile-field mb-3">
                                        <FontAwesomeIcon icon={faUser} className="me-2" />
                                        <strong>Username:</strong> {user.username}
                                    </div>
                                    <div className="profile-field mb-3">
                                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                        <strong>Email:</strong> {user.email}
                                    </div>
                                    <div className="profile-field mb-3">
                                        <FontAwesomeIcon icon={faCalendar} className="me-2" />
                                        <strong>Date of Birth:</strong> {user.dateOfBirth}
                                    </div>
                                    <div className="profile-field mb-3">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                        <strong>Address:</strong> {user.address}
                                    </div>
                                    <div className="profile-field mb-3">
                                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                                        <strong>Phone Number:</strong> {user.phoneNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
