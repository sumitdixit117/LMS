const Loan = require("../models/Loan");

const calculateEMI = (amount, interestRate, duration) => {
  const monthlyRate = interestRate / (12 * 100);
  const emi =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
    (Math.pow(1 + monthlyRate, duration) - 1);
  return emi;
};

exports.applyLoan = async (req, res) => {
  const {
    amount,
    duration,
    salary,
    creditScore,
    category,
    coApplicantName,
    coApplicantSalary,
    coApplicantContact,
  } = req.body;

  try {
    const existingLoans = await Loan.find({ userId: req.user.id });
    if (existingLoans.length >= 4) {
      return res
        .status(400)
        .json({ message: "You have reached the maximum limit of 4 loans." });
    }

    if (amount >= 5000000) {
      return res
        .status(400)
        .json({ message: "Amount greater than 5000000 can't be provided." });
    }

    if (creditScore < 100 || creditScore > 700) {
      return res.status(400).json({
        message: "Invalid credit score. It should be between 100 and 700.",
      });
    }

    let totalSalary = parseFloat(salary);
    if (coApplicantSalary) {
      totalSalary += parseFloat(coApplicantSalary);
    }

    if (totalSalary < 3) {
      return res
        .status(400)
        .json({ message: "You are not eligible for any loan." });
    }

    let interestRate = 0;
    if (category === "car" || category === "bike") {
      if (creditScore > 400 && totalSalary >= 5) {
        interestRate = 10;
      } else {
        return res
          .status(400)
          .json({ message: "You are not eligible for car/bike loan." });
      }
    } else if (category === "home") {
      if (creditScore > 600 && totalSalary >= 8) {
        interestRate = 8;
      } else {
        return res
          .status(400)
          .json({ message: "You are not eligible for home loan." });
      }
    } else if (category === "gold") {
      if (creditScore >= 200) {
        interestRate = 12;
      } else {
        return res
          .status(400)
          .json({ message: "You are not eligible for gold loan." });
      }
    } else {
      return res.status(400).json({ message: "Invalid loan category." });
    }

    const emi = calculateEMI(amount, interestRate, duration);

    const newLoan = new Loan({
      userId: req.user.id,
      amount,
      duration,
      category,
      interestRate,
      emi,
      status: "Approved",
      coApplicant: {
        name: coApplicantName || null,
        salary: coApplicantSalary || null,
        contact: coApplicantContact || null,
      },
    });

    await newLoan.save();
    res.json({ message: "Loan application successful!", loan: newLoan });
  } catch (err) {
    console.error("Loan Application Error: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    res.json(loans);
  } catch (err) {
    console.error("Error fetching loans: ", err);
    res.status(500).json({ message: "Server error" });
  }
};
