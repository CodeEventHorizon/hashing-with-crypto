// Importing modules
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// Initialize express app
const app = express();

// MongoDB connection url
const MONGODB_URI = "mongodb://127.0.0.1:27017/hashAppDatabase";

// Connecting to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB @ ${MONGODB_URI}`);
});

// Using bodyparser to parse JSON data
app.use(bodyparser.json());

// Importing routes
const user = require("./routes/user");

// Use user route when url matches /api/user/
app.use("/api/user", user);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
