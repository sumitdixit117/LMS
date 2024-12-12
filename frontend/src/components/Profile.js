import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { auth } = useContext(AuthContext);

    if (!auth || !auth.user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {auth.user.username}</p>
            <p><strong>Aadhaar:</strong> {auth.user.aadhaar}</p>
            <p><strong>PAN:</strong> {auth.user.pan}</p>
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {auth.user.personalInfo.name}</p>
            <p><strong>Email:</strong> {auth.user.personalInfo.email}</p>
            <p><strong>Phone:</strong> {auth.user.personalInfo.phone}</p>
        </div>
    );
};

export default Profile;
