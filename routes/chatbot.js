const express = require("express");
const axios = require("axios");
const router = express.Router();

// Chatbot endpoint
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Forward the request to the Python Flask backend
    const response = await axios.post("http://127.0.0.1:5000/predict", { message });

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error in chatbot API:", error.message);
    res.status(500).json({ error: "Error communicating with chatbot backend" });
  }
});

module.exports = router;
