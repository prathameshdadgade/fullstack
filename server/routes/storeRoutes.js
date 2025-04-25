const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
const { verifyToken } = require('../middleware/auth');

// GET all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching stores' });
  }
});

// GET store by ID (including average rating)
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    // Calculate the average rating
    const avgRating = store.ratings.length
      ? (store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(1)
      : null;

    res.json({ ...store._doc, avgRating });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching store' });
  }
});

// POST rate a store
router.post('/:id/rate', verifyToken, async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.id;

  // Validate rating
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    // Check if the user has already rated the store
    const existingRating = store.ratings.find((r) => r.user.toString() === req.user.id);
    if (existingRating) {
      // Update rating if it exists
      existingRating.rating = rating;
    } else {
      // Add a new rating
      store.ratings.push({ user: req.user.id, rating });
    }

    await store.save();
    res.json({ message: 'Rating submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error submitting rating' });
  }
});

module.exports = router;
