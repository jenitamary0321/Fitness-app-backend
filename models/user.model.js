const mongoose = require("mongoose");

// Connecting to MongoDB with updated options to avoid deprecation warnings
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true  // This is required for the `unique` option to work properly
});

// Define the schema
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5
    },
    username: {
      type: String,
      required: true,
      unique: true,  // Enforce uniqueness
      trim: true,
      minlength: 5
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    }
  },
  {
    timestamps: true  // Automatically manage createdAt and updatedAt fields
  }
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
