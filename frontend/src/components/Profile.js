import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth || !auth.user) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const styles = {
    cardHeader: {
      backgroundColor: "#355e58",
      color: "white",
      textAlign: "center",
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header" style={styles.cardHeader}>
              <h2 className="mb-0">Profile</h2>
            </div>
            <div className="card-body">
              <h4 className="card-title">Personal Information</h4>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">
                  <strong>Name:</strong>
                </label>
                <div className="col-sm-6">
                  <p className="form-control-plaintext">
                    {auth.user.personalInfo.name}
                  </p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">
                  <strong>Email:</strong>
                </label>
                <div className="col-sm-6">
                  <p className="form-control-plaintext">
                    {auth.user.personalInfo.email}
                  </p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">
                  <strong>Phone:</strong>
                </label>
                <div className="col-sm-6">
                  <p className="form-control-plaintext">
                    {auth.user.personalInfo.phone}
                  </p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">
                  <strong>Username:</strong>
                </label>
                <div className="col-sm-6">
                  <p className="form-control-plaintext">{auth.user.username}</p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">
                  <strong>Aadhaar Number:</strong>
                </label>
                <div className="col-sm-6">
                  <p className="form-control-plaintext">{auth.user.aadhaar}</p>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">
                  <strong>PAN Number:</strong>
                </label>
                <div className="col-sm-6">
                  <p className="form-control-plaintext">{auth.user.pan}</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-center" style={styles.cardHeader}>
              <button
                className="btn btn-success"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
