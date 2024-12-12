import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        aadhaar: '',
        pan: '',
        personalInfo: { name: '', email: '', phone: '' }
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('personalInfo')) {
            setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, [name.split('.')[1]]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Registration failed! Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <input type="text" name="aadhaar" onChange={handleChange} placeholder="Aadhaar" required />
                <input type="text" name="pan" onChange={handleChange} placeholder="PAN" required />
                <input type="text" name="personalInfo.name" onChange={handleChange} placeholder="Name" required />
                <input type="email" name="personalInfo.email" onChange={handleChange} placeholder="Email" required />
                <input type="text" name="personalInfo.phone" onChange={handleChange} placeholder="Phone" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
