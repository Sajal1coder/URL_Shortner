const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes');
const Url = require('./models/Url');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://url-shortner-three-omega.vercel.app',
    /\.vercel\.app$/,
    /\.netlify\.app$/,
    /\.github\.io$/
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api', urlRoutes);
app.use('/api/auth', authRoutes);

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

app.get('/api/health', (req, res) => {
  res.json({ message: 'URL Shortener API is running!' });
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server is running on port ${PORT}`);
  }
});
