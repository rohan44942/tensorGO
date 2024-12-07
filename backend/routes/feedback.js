const express = require("express");
const axios = require("axios");
const authenticate = require("../middleware/auth"); // JWT authentication middleware
const router = express.Router();

const FRILL_API_URL = "https://api.frill.co/v1";
const FRILL_API_KEY = "495c265c-d67d-4c96-8a8b-a713190c7024"; // Replace with your actual key

const frillAuth = {
  headers: {
    Authorization: `Bearer ${FRILL_API_KEY}`,
  },
};

// Submit Feedback
router.post("/submit", authenticate, async (req, res) => {
  const { category, rating, comments } = req.body;
  console.log(category);
  if (!category || !rating || !comments) {
    return res.status(400).send("All fields are required");
  }
  try {
    const response = await axios.post(
      `${FRILL_API_URL}/ideas`,
      {
        category,
        rating,
        comments,
        userEmail: req.user.emails[0].value,
      },
      frillAuth
    );

    res.status(200).json({
      message: "Feedback submitted successfully",
      data: response.data,
    });
  } catch (error) {
    console.log("erro from submition");
    res.status(500).send("Error submitting feedback to Frill.co");
  }
});

// Retrieve Feedback
router.get("/retrieve", authenticate, async (req, res) => {
  try {
    const response = await axios.get(`${FRILL_API_URL}/feedbacks`, frillAuth);

    // Group feedback by category
    const groupedFeedback = response.data.reduce((acc, feedback) => {
      const { category } = feedback;
      if (!acc[category]) acc[category] = [];
      acc[category].push(feedback);
      return acc;
    }, {});

    res.status(200).json(groupedFeedback);
  } catch (error) {
    res.status(500).send("Error retrieving feedback from Frill.co");
  }
});

module.exports = router;
