const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the User model
    required: [true, 'User ID is required'], // Custom error message for required field
  },
  meals: [
    {
      mealType: {
        type: String,
        required: [true, 'Meal type is required'], // Ensuring meal type is provided (e.g., 'breakfast', 'lunch', 'dinner')
        enum: ['breakfast', 'lunch', 'dinner', 'snack'], // Limiting meal types to specific options
      },
      foodItems: [
        {
          name: {
            type: String,
            required: [true, 'Food item name is required'], // Ensuring food name is provided
          },
          calories: {
            type: Number,
            required: [true, 'Calories for the food item are required'], // Ensuring calories are provided
            min: [0, 'Calories cannot be negative'], // Validation to ensure no negative calories
          },
          protein: {
            type: Number,
            required: [true, 'Protein amount is required'], // Ensuring protein is provided
            min: [0, 'Protein cannot be negative'],
          },
          carbs: {
            type: Number,
            required: [true, 'Carbohydrate amount is required'], // Ensuring carbs are provided
            min: [0, 'Carbohydrates cannot be negative'],
          },
          fats: {
            type: Number,
            required: [true, 'Fat amount is required'], // Ensuring fats are provided
            min: [0, 'Fats cannot be negative'],
          },
        }
      ],
    }
  ],
  totalCalories: {
    type: Number,
    required: [true, 'Total calories are required'], // Ensuring total calories are provided
    min: [0, 'Total calories cannot be negative'], // Validation to prevent negative calories
  },
  date: {
    type: Date,
    default: Date.now,  // Defaults to the current date
  }
});

// Create and export the Nutrition model
const Nutrition = mongoose.model('Nutrition', NutritionSchema);

module.exports = Nutrition;
