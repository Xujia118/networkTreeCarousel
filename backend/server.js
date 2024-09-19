// Import libraries
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Import data
const states = require('./data');

// APIs
app.get("/states", (req, res) => {
  res.status(200).json( states );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
