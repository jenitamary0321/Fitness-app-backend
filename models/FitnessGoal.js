const mongoose = require('mongoose');

const fitnessGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalType: { type: String, enum: ['weight_loss', 'muscle_gain', 'running_distance'], required: true },
  targetValue: { type: Number, required: true },
  achieved: { type: Boolean, default: false },
});

module.exports = mongoose.model('FitnessGoal', fitnessGoalSchema);
