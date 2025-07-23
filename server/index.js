const express = require('express');
const connectDB = require('./database');
const app = express();

connectDB();

const songRoutes = require('./routes/songs');
app.use('/api/songs', songRoutes);

// Middleware JSON
app.use(express.json());