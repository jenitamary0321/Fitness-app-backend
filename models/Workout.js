const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercises: [{ name: String, duration: Number, intensity: String }],
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Workout', workoutSchema);
