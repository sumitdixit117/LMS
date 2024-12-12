import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            setAuth(data);  // Update auth context
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login Failed: ', error);
            alert('Login failed! Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
