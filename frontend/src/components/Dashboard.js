import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getLoans } from "../services/loanService";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getLoans(auth.token);
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans: ", error);
      }
    };
    fetchLoans();
  }, [auth.token]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Hello {auth.user.personalInfo.name}!</h2>
      {loans.length === 0 ? (
        <div className="text-center">
          <h4 style={{ marginTop: "40px" }}>No loans currently</h4>
        </div>
      ) : (
        <>
          <h4 style={{ marginTop: "40px", marginBottom: "20px" }}>
            Approved Loans
          </h4>
          <div className="row">
            {loans.map((loan) => (
              <div key={loan._id} className="col-md-6">
                <div className="card mb-4 shadow-sm">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#355e58", color: "white" }}
                  >
                    <h3>{capitalizeFirstLetter(loan.category)} Loan</h3>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Amount:</strong> {loan.amount}
                    </p>
                    <p className="card-text">
                      <strong>Duration:</strong> {loan.duration} months
                    </p>
                    <p className="card-text">
                      <strong>EMI:</strong> {loan.emi.toFixed(2)}
                    </p>
                    <p className="card-text">
                      <strong>Interest Rate:</strong> {loan.interestRate}%
                    </p>
                    <p className="card-text">
                      <strong>Co-Applicant:</strong>{" "}
                      {loan.coApplicant && loan.coApplicant.name ? "Yes" : "No"}
                    </p>

                    <p className="card-text">
                      <strong>Status:</strong> {loan.status}
                    </p>
                  </div>
                  <div
                    className="card-footer"
                    style={{ backgroundColor: "#355e58" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
