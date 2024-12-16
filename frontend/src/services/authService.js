import axios from "axios";

export const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    userData
  );
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    userData
  );
  return response.data;
};

export const updateProfile = async (userId, updatedData) => {
  const token = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")).token
    : null;
  const config = {
    headers: { "x-auth-token": token, "Content-Type": "application/json" },
  };
  const response = await axios.put(
    `http://localhost:5000/api/auth/users/${userId}`,
    updatedData,
    config
  );
  return response.data;
};
