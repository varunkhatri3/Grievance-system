const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "f4e7d52405a8db7df3a8e9c2470ec6c0d19e7b61c17f3d084b14f582c3d7b2cd";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Admin flag, default to falsede
    });
    // console.log(newUser);
    // Save the user to the database
    await newUser.save();
    // console.log(JWT_SECRET)
    // Generate a token (optional, if you want to auto-login after registration)
    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send user data and the token
    res.status(201).json({
      user: { email: newUser.email, isAdmin: newUser.isAdmin },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const ADMIN_EMAIL = "ronakparmar2428@gmail.com"; // Replace with your admin email
const ADMIN_PASSWORD = "ronak";
// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === ADMIN_EMAIL) {
      // const isAdminMatch = await bcrypt.compare(password, ADMIN_PASSWORD);
      const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, message: "Admin login successful" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;