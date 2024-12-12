import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getLoans } from '../services/loanService';

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await getLoans(auth.token);
                setLoans(data);
            } catch (error) {
                console.error('Error fetching loans: ', error);
            }
        };
        fetchLoans();
    }, [auth.token]);

    return (
        <div>
            <h2>List of Loans</h2>
            <ul>
                {loans.map((loan) => (
                    <li key={loan._id}>
                        Amount: {loan.amount}, Duration: {loan.duration} months, EMI: {loan.emi.toFixed(2)}, Interest Rate: {loan.interestRate}%, Status: {loan.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
