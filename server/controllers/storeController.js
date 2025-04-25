// server/controllers/storeController.js
const Store = require('../models/Store');

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
};

exports.rateStore = async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) return res.status(404).json({ message: 'Store not found' });

  store.ratings.push(req.body.rating);
  await store.save();

  res.json({ message: 'Rating submitted' });
};
