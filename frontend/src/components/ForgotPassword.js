import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(formData);
      alert("Password is updated!");
      navigate("/login");
    } catch (error) {
      console.error("Password Reset Failed: ", error);
      alert("Password reset failed! Please try again.");
    }
  };

  const styles = {
    cardHeader: {
      backgroundColor: "#355e58",
      color: "white",
      textAlign: "center",
    },
    cardFooter: {
      backgroundColor: "#355e58",
      textAlign: "center",
    },
    link: {
      color: "black",
      fontSize: "13px",
    },
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-header" style={styles.cardHeader}>
          <h2 className="mb-0">Forgot Password</h2>
        </div>
        <div className="card-body" style={{ padding: "0px" }}>
          <form
            onSubmit={handleSubmit}
            className="needs-validation card-body"
            noValidate
            style={{ border: "hidden" }}
          >
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className="form-control"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
                className="form-control"
                placeholder="New Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Reset Password
            </button>
            <div className="mt-3">
              <a href="/login" style={styles.link}>
                Back to Login
              </a>
            </div>
          </form>
        </div>
        <div className="card-footer" style={styles.cardFooter}></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
