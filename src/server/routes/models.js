const express = require('express');
const router = express.Router();

// Get all models
router.get('/', (req, res) => {
  // TODO: Fetch from database
  res.json({ models: [] });
});

// Get single model by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: Fetch from database
  res.json({ model: null });
});

// Create new model
router.post('/', (req, res) => {
  // TODO: Save to database
  res.json({ success: true });
});

// Update model
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: Update in database
  res.json({ success: true });
});

// Delete model
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: Delete from database
  res.json({ success: true });
});

module.exports = router;
