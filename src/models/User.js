// src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     profile: { type: String, trim: true }, // e.g. profile picture URL
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     phone: { type: String, trim: true },   // new field
//     password: { type: String, required: true, minlength: 6 },
//     role: { type: String, enum: ['admin', 'user'], default: 'user' },
//     isActive: { type: Boolean, default: true }, // ban/unBan
//   },
//   { timestamps: true } // createdAt and updatedAt automatically included
// );

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    phone: { type: String, trim: true },
    image: { type: String, default: "" },
    isBanned: { type: Boolean, default: false }, // ✅ new field
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);
