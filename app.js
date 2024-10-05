const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/auth');
const goalsRoutes = require('./routes/goals');
const workoutsRoutes = require('./routes/workouts');
const nutritionRoutes = require('./routes/nutrition');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/nutrition', nutritionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT ||"mongodb://localhost:27017/User"; 
;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
