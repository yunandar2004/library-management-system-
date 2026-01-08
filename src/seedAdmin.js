// src/seedAdmin.js
require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");

(async () => {
  await connectDB(process.env.MONGO_URI);
  const email = "admin@example.com";
  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({
      name: "Admin",
      email,
      password: "Admin123!",
      role: "admin",
    });
    console.log("Admin user created:", email);
  } else {
    console.log("Admin already exists:", email);
  }
  process.exit(0);
})();
