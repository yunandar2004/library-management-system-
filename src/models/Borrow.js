const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    deliveryAt: {
      type: Date,
      required: true,
    },
    dueAt: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["borrowed", "delivering", "returned", "overdue"],
      default: "delivering",
      index: true,
    },
  },
  { timestamps: true }
);

borrowSchema.methods.isOverdue = function () {
  return !this.returnedAt && new Date() > this.dueAt;
};

module.exports = mongoose.model("Borrow", borrowSchema);
