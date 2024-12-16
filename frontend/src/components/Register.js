import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    aadhaar: "",
    pan: "",
    personalInfo: { name: "", email: "", phone: "" },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("personalInfo")) {
      setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [name.split(".")[1]]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed: ", error);
      alert("Registration failed! Please try again.");
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
          <h2 className="mb-0">Register</h2>
        </div>
        <div className="card-body" style={{ padding: "0px" }}>
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
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
                className="form-control"
                name="username"
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="personalInfo.name"
                onChange={handleChange}
                placeholder="Name"
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
                className="form-control"
                name="personalInfo.email"
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                name="personalInfo.phone"
                onChange={handleChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                Aadhaar Number
              </label>
              <input
                type="text"
                className="form-control"
                name="aadhaar"
                onChange={handleChange}
                placeholder="Aadhaar"
                required
              />
            </div>
            <div className="form-group">
              <label
                className="col-form-label"
                style={{ float: "left", marginLeft: "10px" }}
              >
                PAN Number
              </label>
              <input
                type="text"
                className="form-control"
                name="pan"
                onChange={handleChange}
                placeholder="PAN"
                required
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Register
            </button>
            <div className="mt-3">
              <a href="/login" style={styles.link}>
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
        <div className="card-footer" style={styles.cardFooter}></div>
      </div>
    </div>
  );
};

export default Register;
