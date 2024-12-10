// backend/auth.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

require("../middleware/passport"); //  passport configuration

// Route to authenticate with Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate JWT token containing user data
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("from router", req.user.email);
    // Send the user details along with the JWT token to the frontend
    const userDetails = {
      token,
      userId: req.user.id, // Assuming req.user.id is the user ID in your system
      email: req.user._json.email, // Access the email correctly
      name:
        req.user._json.name ||
        `${req.user._json.given_name} ${req.user._json.family_name}`, // Access full name from first and last names
    };

    res.redirect(
      `http://localhost:5173?token=${userDetails.token}&userId=${userDetails.userId}&email=${userDetails.email}&name=${userDetails.name}`
    );
  }
);

router.get("/logout", (req, res) => {
  // Clear any user-related session (if used)
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Error logging out.");
      }
    });
  }

  // Redirect the user to the Google logout page
  const GOOGLE_LOGOUT_URL = "https://accounts.google.com/logout";

  // Redirect the user back to the frontend after logging out of Google
  res.send(`
    <html>
      <body>
        <script>
          // Perform Google logout
          window.open("${GOOGLE_LOGOUT_URL}", "_blank");
          
          // Redirect back to your frontend
          window.location.href = "http://localhost:5173";
        </script>
      </body>
    </html>
  `);
});

module.exports = router;
