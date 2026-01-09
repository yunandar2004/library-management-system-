const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },

    borrowedAt: Date,
    deliveryAt: Date,
    dueAt: Date,
    returnedAt: Date,

    status: {
      type: String,
      enum: ["borrowed", "delivering", "returned", "overdue"],
      default: "delivering",
      index: true,
    },

    fine: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
