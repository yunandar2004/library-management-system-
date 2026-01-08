// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports = async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB to ensure still active
    const user = await User.findById(payload.id);
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User inactive or not found" });
    }

    // Attach user info to request
    req.user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
