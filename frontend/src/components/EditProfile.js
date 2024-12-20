import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../services/authService";

const EditProfile = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.user) {
      setFormData({
        name: auth.user.personalInfo.name,
        email: auth.user.personalInfo.email,
        phone: auth.user.personalInfo.phone,
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth.user);
    try {
      const updatedUser = await updateProfile(auth.user.id, formData);
      setAuth({ ...auth, user: updatedUser });
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Update Failed: ", error);
      alert("Profile update failed! Please try again.");
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
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-header" style={styles.cardHeader}>
          <h2 className="mb-0">Edit Profile</h2>
        </div>
        <div className="card-body" style={{ padding: "0px" }}>
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate
            style={{ border: "hidden" }}
          >
            <div className="form-group">
              <label className="col-form-label">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                className="form-control"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{ marginTop: "30px" }}
            >
              Save Changes
            </button>
          </form>
        </div>
        <div className="card-footer" style={styles.cardFooter}></div>
      </div>
    </div>
  );
};

export default EditProfile;
