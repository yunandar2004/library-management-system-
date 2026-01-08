const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Global 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;