const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complains"); // Import the Complaint model
const axios = require("axios");
const { authenticate, authorize } = require('../middleware/auth');

// POST endpoint to handle storing complaints
router.post("/complain", async (req, res) => {
  try {
    // Destructure complaint data from the request body
    const { username, contact, pincode, state, street, address, complaint } =
      req.body;
    console.log(username, contact, pincode, state, street, address, complaint);
    // Validate required fields
    if (
      !username ||
      !contact ||
      !pincode ||
      !state ||
      !street ||
      !address ||
      !complaint
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let analyzedData = null; // Placeholder for analyzed complaint data

    try {
      const thedata = {
        username: username,
        contact: contact,
        pincode: pincode,
        state: state,
        street: street,
        address: address,
        complaint: complaint,
      };
      // Call external API for complaint analysis
      const result = await axios.post(
        "http://127.0.0.1:5000/analyze_complaint",
        thedata
      );

      analyzedData = result.data; // Capture the API response
      // console.log(analyzedData);
    } catch (err) {
      console.error("Error analyzing complaint:", err);
      return res.status(500).json({
        message: "Failed to analyze the complaint. Please try again.",
      });
    }
    // Destructure fields from analyzed data
    const {
      category,
      entities,
      original_complaint,
      preprocessed_complaint,
      sentiment,
      "sub-category": subCategory, // Use quotes for hyphenated fields
    } = analyzedData;

    // Create a new Complaint document
    const newComplaint = new Complaint({
      username,
      contact,
      pincode,
      state,
      street,
      address,
      complaint, // Original complaint from user
      category,
      entities,
      original_complaint,
      preprocessed_complaint,
      sentiment,
      sub_category: subCategory, // Rename for compatibility with database field names
    });

    // Save the complaint document to the database
    await newComplaint.save();

    // Respond with success and the created complaint
    res.status(201).json({
      message: "Complaint registered successfully",
      complaint: newComplaint,
    });
  } catch (err) {
    console.error("Error saving complaint:", err);
    res.status(500).json({
      message:
        "An error occurred while registering the complaint. Please try again.",
    });
  }
});

router.get('/user-complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find({ username: "Ronak" }); // Assuming the logged-in user's username is stored in req.user
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
