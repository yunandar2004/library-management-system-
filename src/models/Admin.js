const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true, minlength: 6 },

    role: { type: String, enum: ["user", "admin"], default: "admin" }, // default to admin

    isActive: { type: Boolean, default: true },

    phone: { type: String, trim: true },

    address: { type: String, trim: true },

    image: { type: String, default: "" },

    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Use "Admin" as the model name, and guard against recompilation
module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
