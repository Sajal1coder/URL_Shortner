const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('../config/database');
const urlRoutes = require('../routes/urlRoutes');
const authRoutes = require('../routes/authRoutes');
const Url = require('../models/Url');

const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://url-shortner-x218.vercel.app',
    /\.vercel\.app$/,
    /\.netlify\.app$/,
    /\.github\.io$/
  ],
  credentials: true
}));
app.use(express.json());

app.use('/', urlRoutes);
app.use('/auth', authRoutes);

app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ message: 'URL Shortener API is running!' });
});

module.exports = app;
