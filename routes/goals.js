const express = require('express');
const FitnessGoal = require('../models/FitnessGoal');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { goalType, targetValue } = req.body;
    const newGoal = new FitnessGoal({ userId: req.user.userId, goalType, targetValue });
    await newGoal.save();
    res.json(newGoal);
  } catch (err) {
    res.status(500).json({ error: 'Error adding fitness goal' });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const goals = await FitnessGoal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching goals' });
  }
});

module.exports = router;
