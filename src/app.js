const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const urlRoutes = require("./routes/urlRoutes");

dotenv.config();

const app = express();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
  message: "Too many requests, please try again later.",
});

// Middleware
app.use(express.json());
app.use(limiter);

// Routes
app.use("/", urlRoutes);

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Database connection error:", err));
