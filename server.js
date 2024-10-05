// Require dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup DB Connection
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/User"; // Fallback to local MongoDB if env var is missing

// Using Mongoose to connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB database!"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Setup Routes
const exercisesRouter = require("./routes/exercises"); // Make sure this path is correct
const usersRouter = require("./routes/users"); // Make sure this path is correct
const nutritionRouter = require("./routes/nutrition"); // Updated variable name for clarity

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter); // Example route: http://localhost:5000/users/login
app.use("/nutrition", nutritionRouter); // Updated variable name for clarity

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Setup Listener
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
