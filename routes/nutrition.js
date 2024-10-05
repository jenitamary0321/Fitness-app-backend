const express = require('express');
const router = express.Router();
const Nutrition = require('../models/nutrition.model'); // Adjust this path based on your folder structure
// const authenticateJWT = require('../middleware/auth'); // Middleware for authentication, adjust the path

// POST route to add nutrition data
router.post('/', async (req, res) => {
  try {
    const { meals, totalCalories } = req.body;

    // Validate incoming data
    if (!meals || !totalCalories) {
      return res.status(400).json({ message: 'Meals and totalCalories are required' });
    }

    const newNutrition = new Nutrition({
      userId: req.user.userId,
      meals,
      totalCalories,
    });

    const savedNutrition = await newNutrition.save();
    res.status(201).json(savedNutrition);
  } catch (err) {
    console.error('Error tracking nutrition:', err);
    res.status(500).json({ error: 'Internal server error while tracking nutrition' });
  }
});

// GET route to fetch user's nutrition data
router.get('/', async (req, res) => {
  try {
    const nutrition = await Nutrition.find({ userId: req.user.userId });
    res.status(200).json(nutrition);
  } catch (err) {
    console.error('Error fetching nutrition data:', err);
    res.status(500).json({ error: 'Internal server error while fetching nutrition data' });
  }
});

module.exports = router;
