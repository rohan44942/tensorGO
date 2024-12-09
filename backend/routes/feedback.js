const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Intercom API Configuration
const INTERCOM_API_URL = "https://api.intercom.io";
const INTERCOM_ACCESS_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;

const intercomAuthHeaders = {
  Authorization: `Bearer ${INTERCOM_ACCESS_TOKEN}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Helper Function: Check if User Exists
const checkUserExists = async (userId, email) => {
  try {
    const query = userId ? `user_id=${userId}` : `email=${email}`;
    const response = await axios.get(`${INTERCOM_API_URL}/contacts?${query}`, {
      headers: intercomAuthHeaders,
    });
    console.log(response.data.data);
    return response.data.data?.length > 0 ? response.data.data[0] : null;
  } catch (error) {
    if (error.response?.data?.code === "not_found") {
      console.log("User not found in Intercom.");
      return null;
    }
    console.error(
      "Error checking user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Helper Function: Create or Update User
const createOrUpdateUser = async (userId, email, name) => {
  try {
    const response = await axios.post(
      `${INTERCOM_API_URL}/contacts`,
      {
        user_id: userId,
        email: email,
        name: name,
      },
      {
        headers: intercomAuthHeaders,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating/updating user in Intercom:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Route: Submit a Customer Service Request
router.post("/submit", async (req, res) => {
  const { userId, email, name, category, comments } = req.body;
  console.log(email);

  if (!userId || !comments) {
    return res.status(400).send("userId and comments are required fields.");
  }

  try {
    // Check if user exists in Intercom
    let user = await checkUserExists(userId, email);
    if (!user) {
      // If user does not exist, create them
      user = await createOrUpdateUser(userId, email, name);
    }

    // Use the existing user ID to send a message
    const response = await axios.post(
      `${INTERCOM_API_URL}/messages`,
      {
        from: {
          type: "user",
          id: user.id, // Use Intercom User ID
        },
        body: `Category: ${category || "General"}\nComments: ${comments}`,
        subject: `Customer Service Request: ${category || "General"}`,
      },
      {
        headers: intercomAuthHeaders,
      }
    );

    res.status(200).json({
      message: "Message submitted successfully!",
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Error submitting message to Intercom:",
      error.response?.data || error.message
    );
    res.status(500).send("Failed to submit message to Intercom.");
  }
});

// Route: Retrieve Customer Service Requests by Category
// router.get("/retrieve", async (req, res) => {
//   const { category } = req.query;

//   try {
//     // Fetch conversations from Intercom
//     const response = await axios.get(`${INTERCOM_API_URL}/conversations`, {
//       headers: intercomAuthHeaders,
//     });
//     console.log(response.data.conversations[0]);

//     // Filter conversations by the specified category
//     const filteredRequests = response.data.conversations.filter(
//       (conversation) =>
//         conversation.title && conversation.title.includes(category)
//     );

//     // Map relevant data for frontend
//     const mappedRequests = filteredRequests.map((conversation) => ({
//       id: conversation.id,
//       title: conversation.title,
//       body: conversation.body || "No details available",
//     }));

//     res.status(200).json({ data: response.data.conversations[0].source.body });
//   } catch (error) {
//     console.error(
//       "Error retrieving requests from Intercom:",
//       error.response?.data || error.message
//     );
//     res.status(500).send("Error retrieving requests from Intercom.");
//   }
// });
router.get("/retrieve", async (req, res) => {
  const { category } = req.query;

  try {
    // Fetch conversations from Intercom
    const response = await axios.get(`${INTERCOM_API_URL}/conversations`, {
      headers: intercomAuthHeaders,
    });

    // Filter conversations by the specified category
    const filteredRequests = response.data.conversations.filter(
      (conversation) =>
        conversation.source.body &&
        conversation.source.body.includes(`Category: ${category}`)
    );

    // Map relevant data for frontend
    const mappedRequests = filteredRequests.map((conversation) => {
      const bodyContent = conversation.source.body || "";

      // Clean up body content by removing </p> and extracting necessary fields
      const cleanedBody = bodyContent.replace(/<\/?p>/g, ""); // Remove <p> and </p> tags
      const categoryMatch = cleanedBody.match(/Category: (.*)/);
      const commentsMatch = cleanedBody.match(/Comments: (.*)/);

      return {
        id: conversation.id,
        title: conversation.title || "No Title",
        category: categoryMatch ? categoryMatch[1].trim() : "Unknown Category",
        comments: commentsMatch
          ? commentsMatch[1].trim()
          : "No Comments Available",
      };
    });

    res.status(200).json({ data: mappedRequests });
  } catch (error) {
    console.error(
      "Error retrieving requests from Intercom:",
      error.response?.data || error.message
    );
    res.status(500).send("Error retrieving requests from Intercom.");
  }
});

module.exports = router;
