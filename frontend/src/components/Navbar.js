import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("You have been logged out.");
    navigate("/login");
  };

  const styles = {
    formLabel: {
      color: "white",
      fontWeight: "bold",
    },
  };

  const navbarStyles = {
    backgroundColor: "#355e58",
    display: "flex",
    alignItems: "center",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyles}>
      <Link className="navbar-brand" to="/" style={styles.formLabel}>
        LMSys
      </Link>
      <div className="collapse navbar-collapse">
        <ul
          className="navbar-nav ml-auto"
          style={{ display: "flex", alignItems: "center" }}
        >
          {auth ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={styles.formLabel}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/apply-loan"
                  style={styles.formLabel}
                >
                  Apply for Loan
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/profile"
                  style={styles.formLabel}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger bg-danger"
                  onClick={handleLogout}
                  style={styles.formLabel}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={styles.formLabel}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" style={styles.formLabel}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
