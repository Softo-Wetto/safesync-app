import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendar, faMapMarkerAlt, faPhone, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import authAxios from '../utils/axios';

const Profile = () => {
    const { logout } = useAuth();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await authAxios.get('/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // You don't need this line anymore if you're using the authAxios instance with the interceptor.
                    }
                });
                const data = response.data || {}; 
                setUser(data);
                setFormData({
                    fullName: data.fullName || '',
                    username: data.username || '',
                    email: data.email || '',
                    dateOfBirth: data.dateOfBirth || '',
                    address: data.address || '',
                    phoneNumber: data.phoneNumber || '',
                });
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Your session has expired. Please login again.');
                } else {
                    console.error('Error fetching user profile:', err);
                    setError('Failed to load profile. Please try again later.');
                }
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        // Validate that no field is empty
        if (!formData.fullName || !formData.username || !formData.email || !formData.dateOfBirth || !formData.address || !formData.phoneNumber) {
            setFormError('All fields are required.');
            return;
        }

        try {
            const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                localStorage.setItem('username', formData.username);
                setUser(formData);
                setIsEditing(false);
                setFormError(''); // Clear the error message
                window.location.reload();
            } else {
                setError('Failed to update profile. Please try again later.');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again later.');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                logout();
                navigate('/');
                window.location.reload();
            } else {
                setError('Failed to delete account. Please try again later.');
            }
        } catch (err) {
            console.error('Error deleting account:', err);
            setError('Failed to delete account. Please try again later.');
        }
    };

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
                                    {isEditing ? (
                                        <>
                                            {formError && <p className="text-danger">{formError}</p>}
                                            <div className="profile-field mb-3">
                                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="profile-field mb-3">
                                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="profile-field mb-3">
                                                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="profile-field mb-3">
                                                <FontAwesomeIcon icon={faCalendar} className="me-2" />
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="profile-field mb-3">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="profile-field mb-3">
                                                <FontAwesomeIcon icon={faPhone} className="me-2" />
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <button className="btn btn-primary me-2" onClick={handleSaveChanges}>Save Changes</button>
                                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
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
                                            <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
                                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Profile
                                            </button>
                                            <button className="btn btn-danger" onClick={handleDeleteAccount}>
                                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete Profile
                                            </button>
                                        </>
                                    )}
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
