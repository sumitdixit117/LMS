import axios from 'axios';

export const applyLoan = async (loanData, token) => {
    const config = {
        headers: { 'x-auth-token': token }
    };
    const response = await axios.post('http://localhost:5000/api/loans/apply-loan', loanData, config);
    return response.data;
};

export const getLoans = async (token) => {
    const config = {
        headers: { 'x-auth-token': token }
    };
    const response = await axios.get('http://localhost:5000/api/loans', config);
    return response.data;
};
