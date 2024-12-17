const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true },
  category: { type: String, required: true },
  interestRate: { type: Number, required: true },
  emi: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  coApplicant: {
    name: { type: String },
    salary: { type: Number },
    contact: { type: String },
  },
});

const Loan = mongoose.model("Loan", LoanSchema);
module.exports = Loan;
