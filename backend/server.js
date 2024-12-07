const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth"); // auth route
const feedbackRoutes = require("./routes/feedback"); // feedback route
const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
// app.post("/api/feedback/submit", (req, res) => {
//   return res.status(200).json({ message: "ok" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
