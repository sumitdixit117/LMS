const Loan = require('../models/Loan');

const calculateEMI = (amount, interestRate, duration) => {
    const monthlyRate = interestRate / (12 * 100); // Monthly interest rate
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
    return emi;
};

exports.applyLoan = async (req, res) => {
    const { amount, duration, salary, creditScore, category } = req.body;

    try {
        if (creditScore < 100 || creditScore > 700) {
            return res.status(400).json({ message: 'Invalid credit score. It should be between 100 and 700.' });
        }

        if (salary < 3) {
            return res.status(400).json({ message: 'You are not eligible for a loan.' });
        }

        let interestRate = 0;
        if (category === 'car' || category === 'bike') {
            if (creditScore > 600 && salary >= 5) {
                interestRate = 10; // Example rate
            } else {
                return res.status(400).json({ message: 'You are not eligible for this loan.' });
            }
        } else if (category === 'home') {
            if (creditScore > 600 && salary >= 8) {
                interestRate = 8; // Example rate
            } else {
                return res.status(400).json({ message: 'You are not eligible for this loan.' });
            }
        } else if (category === 'gold') {
            if (salary >= 3) {
                interestRate = 12; // Example rate
            } else {
                return res.status(400).json({ message: 'You are not eligible for this loan.' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid loan category.' });
        }

        const emi = calculateEMI(amount, interestRate, duration);

        const newLoan = new Loan({
            userId: req.user.id,
            amount,
            duration,
            salary,
            creditScore,
            category,
            interestRate,
            emi,
            status: 'Approved'
        });

        await newLoan.save();
        res.json({ message: 'Loan application successful!', loan: newLoan });
    } catch (err) {
        console.error('Loan Application Error: ', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ userId: req.user.id });
        res.json(loans);
    } catch (err) {
        console.error('Error fetching loans: ', err);
        res.status(500).json({ message: 'Server error' });
    }
};
