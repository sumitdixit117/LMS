import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { applyLoan } from "../services/loanService";
import { useNavigate } from "react-router-dom";

const ApplyLoan = () => {
  const [formData, setFormData] = useState({
    amount: "",
    duration: "",
    salary: "",
    creditScore: "",
    category: "",
    coApplicant: false,
    coApplicantName: "",
    coApplicantSalary: "",
    coApplicantContact: "",
  });

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoApplicantChange = () => {
    setFormData({
      ...formData,
      coApplicant: !formData.coApplicant,
      coApplicantName: "",
      coApplicantSalary: "",
      coApplicantContact: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await applyLoan(formData, auth.token);
      alert(data.message);
      navigate("/");
    } catch (error) {
      console.error("Loan Application Failed: ", error);
      alert(error.response.data.message);
    }
  };

  const styles = {
    formLabel: {
      color: "white",
      fontWeight: "bold",
    },
    formContainer: {
      maxWidth: "800px",
      backgroundColor: "#355e58",
      padding: "45px",
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Apply for Loan</h2>
      <form
        onSubmit={handleSubmit}
        className="needs-validation"
        noValidate
        style={styles.formContainer}
      >
        {/* Loan Amount */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Amount
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              className="form-control"
              placeholder="Amount"
              required
            />
          </div>
        </div>

        {/* Loan Duration */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Duration (months)
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              name="duration"
              onChange={handleChange}
              className="form-control"
              placeholder="Duration (months)"
              required
            />
          </div>
        </div>

        {/* Salary */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Salary (LPA)
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              className="form-control"
              placeholder="Salary (LPA)"
              required
            />
          </div>
        </div>

        {/* Credit Score */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Credit Score
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              name="creditScore"
              onChange={handleChange}
              className="form-control"
              placeholder="Credit Score"
              required
            />
          </div>
        </div>

        {/* Loan Category */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Loan Category
          </label>
          <div
            className="col-sm-8"
            style={{ paddingRight: "5px", paddingLeft: "20px" }}
          >
            <select
              name="category"
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Loan Category</option>
              <option value="car">Car Loan</option>
              <option value="bike">Bike Loan</option>
              <option value="home">Home Loan</option>
              <option value="gold">Gold Loan</option>
            </select>
          </div>
        </div>

        {/* File Uploads */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Aadhaar Card
          </label>
          <div className="col-sm-8">
            <input
              type="file"
              name="aadhaarCard"
              className="form-control"
              accept=".pdf,.jpg,.png"
              style={{ padding: "3px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            PAN Card
          </label>
          <div className="col-sm-8">
            <input
              type="file"
              name="panCard"
              className="form-control"
              accept=".pdf,.jpg,.png"
              style={{ padding: "3px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Salary Slips
          </label>
          <div className="col-sm-8">
            <input
              type="file"
              name="salarySlips"
              className="form-control"
              accept=".pdf,.jpg,.png"
              style={{ padding: "3px" }}
            />
          </div>
        </div>

        {/* Co-Applicant Section */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" style={styles.formLabel}>
            Add Co-Applicant?
          </label>
          <div className="col-sm-8" style={{paddingRight: '430px'}}>
            <input
              type="checkbox"
              name="coApplicant"
              checked={formData.coApplicant}
              onChange={handleCoApplicantChange}
            />
          </div>
        </div>

        {/* Co-Applicant Name */}
        {formData.coApplicant && (
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" style={styles.formLabel}>
              Co-Applicant Name
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="coApplicantName"
                onChange={handleChange}
                className="form-control"
                placeholder="Co-Applicant Name"
              />
            </div>
          </div>
        )}

        {/* Co-Applicant Salary */}
        {formData.coApplicant && (
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" style={styles.formLabel}>
              Co-Applicant Salary (LPA)
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                name="coApplicantSalary"
                onChange={handleChange}
                className="form-control"
                placeholder="Co-Applicant Salary (LPA)"
              />
            </div>
          </div>
        )}

        {/* Co-Applicant Contact Number */}
        {formData.coApplicant && (
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" style={styles.formLabel}>
              Co-Applicant Contact Number
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="coApplicantContact"
                onChange={handleChange}
                className="form-control"
                placeholder="Co-Applicant Contact"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success btn-block"
          style={{ marginTop: "30px" }}
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;
