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
    console.log(auth.user);
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
    try {
      const updatedUser = await updateProfile(auth.user._id, formData);
      setAuth({ ...auth, user: updatedUser });
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Update Failed: ", error);
      alert("Profile update failed! Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
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
          <label>Email</label>
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
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
