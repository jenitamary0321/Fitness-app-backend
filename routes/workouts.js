const express = require('express');
const Workout = require('../models/Workout');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { exercises, caloriesBurned } = req.body;
    const newWorkout = new Workout({ userId: req.user.userId, exercises, caloriesBurned });
    await newWorkout.save();
    res.json(newWorkout);
  } catch (err) {
    res.status(500).json({ error: 'Error logging workout' });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching workouts' });
  }
});

module.exports = router;
