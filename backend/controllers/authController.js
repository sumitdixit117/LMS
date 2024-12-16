const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        aadhaar: user.aadhaar,
        pan: user.pan,
        personalInfo: user.personalInfo,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      }
    );
  } catch (err) {
    console.error("Login Error: ", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { username, password, aadhaar, pan, personalInfo } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ username, password, aadhaar, pan, personalInfo });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Registration Error: ", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  console.log("Update request for user:", id);
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.personalInfo.name = name;
    user.personalInfo.email = email;
    user.personalInfo.phone = phone;
    await user.save();
    console.log("Updated user:", user);
    res.json(user);
  } catch (err) {
    console.error("Update User Error: ", err);
    res.status(500).json({ msg: "Server error" });
  }
};
