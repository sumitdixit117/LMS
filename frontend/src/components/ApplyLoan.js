import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { applyLoan } from '../services/loanService';

const ApplyLoan = () => {
    const [formData, setFormData] = useState({
        amount: '',
        duration: '',
        salary: '',
        creditScore: '',
        category: ''
    });
    const { auth } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await applyLoan(formData, auth.token);
            alert(data.message);
        } catch (error) {
            console.error('Loan Application Failed: ', error);
            alert('Loan application failed! Please try again.');
        }
    };

    return (
        <div>
            <h2>Apply for Loan</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="amount" onChange={handleChange} placeholder="Amount" required />
                <input type="number" name="duration" onChange={handleChange} placeholder="Duration (months)" required />
                <input type="number" name="salary" onChange={handleChange} placeholder="Salary (LPA)" required />
                <input type="number" name="creditScore" onChange={handleChange} placeholder="Credit Score" required />
                <select name="category" onChange={handleChange} required>
                    <option value="">Select Loan Category</option>
                    <option value="car">Car Loan</option>
                    <option value="bike">Bike Loan</option>
                    <option value="home">Home Loan</option>
                    <option value="gold">Gold Loan</option>
                </select>
                <button type="submit">Apply</button>
            </form>
        </div>
    );
};

export default ApplyLoan;
