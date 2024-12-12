import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert('You have been logged out.');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                {auth ? (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/apply-loan">Apply for Loan</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
