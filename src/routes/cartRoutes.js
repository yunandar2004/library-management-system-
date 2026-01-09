// module.exports = router;
// require("dotenv").config();
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const path = require("path");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");

// // Routes
// const adminRoutes = require("./routes/adminRoutes");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const bookRoutes = require("./routes/bookRoutes");
// const borrowRoutes = require("./routes/borrowRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");
// const cartRoutes = require("./routes/cartRoutes");

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(helmet());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// // Static uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Mount routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/borrows", borrowRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/cart", cartRoutes);

// // Health check
// app.get("/health", (req, res) => res.json({ status: "ok" }));

// // Global 404
// app.use((req, res) => res.status(404).json({ message: "Not found" }));

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ message: "Server error" });
// });

// // const borrowRoutes = require("./routes/borrowRoutes");
// app.use("/api/borrows", borrowRoutes);
// module.exports = app;

// src/routes/cartRoutes.js
// src/routes/cartRoutes.js
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const cartCtrl = require("../controllers/cartController"); // ✅ REQUIRED

// Add to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { bookId, name, image, price, qty } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ bookId, name, image, price, qty });
    }

    await cart.save();

    const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
    res.json({ cart, count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  const count = cart ? cart.items.reduce((sum, item) => sum + item.qty, 0) : 0;

  res.json({ cart: cart || { items: [] }, count });
});

// Remove item
router.delete("/:bookId", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.bookId.toString() !== req.params.bookId
  );

  await cart.save();

  const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
  res.json({ cart, count });
});

// Checkout → Borrow books
// router.post("/checkout", auth, cartCtrl.checkoutCart);

module.exports = router;
