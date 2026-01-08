// src/server.js
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

(async () => {
  await connectDB(process.env.MONGO_URI);
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
})();
