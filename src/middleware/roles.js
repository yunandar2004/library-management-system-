// // src/middleware/roles.js
// module.exports = (...roles) => {
//   return (req, res, next) => {
//     // Ensure user is attached by auth middleware
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   };
// };

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

