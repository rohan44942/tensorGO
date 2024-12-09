const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth"); // auth route
const feedbackRoutes = require("./routes/feedback"); // feedback route

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Authentication routes
app.use("/api/auth", authRoutes);
// for data submition and retreival from intercom

app.use("/api/customer-service", feedbackRoutes);

// app.post("/api/feedback/submit", (req, res) => {
//   return res.status(200).json({ message: "ok" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
