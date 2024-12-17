import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      setAuth(data);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Failed: ", error);
      alert("Login failed! Please check your credentials and try again.");
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
          <h2 className="mb-0">Login</h2>
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
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
            <div className="mt-3">
              <a href="/register" style={styles.link}>
                Don't have an account? Register
              </a>
            </div>
            <div className="mt-1">
              <a href="/forgot" style={styles.link}>
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
        <div className="card-footer" style={styles.cardFooter}></div>
      </div>
    </div>
  );
};

export default Login;
