// Import libraries
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/dist")));

// Import data
const states = require('./data');

// APIs
app.get("/states", (req, res) => {
  res.status(200).json( states );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
