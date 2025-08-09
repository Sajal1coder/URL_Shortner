const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    let url = await Url.findOne({ originalUrl });
    
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        shortCode: url.shortCode
      });
    }

    const shortCode = shortid.generate();
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    url = new Url({
      originalUrl,
      shortCode,
      shortUrl
    });

    await url.save();

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      shortCode: url.shortCode
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/urls', authenticateToken, async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
