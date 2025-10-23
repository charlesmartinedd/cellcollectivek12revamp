const express = require('express');
const router = express.Router();

// Get quiz for model
router.get('/model/:modelId', (req, res) => {
  const { modelId } = req.params;
  // TODO: Fetch quiz from database
  res.json({ quiz: null });
});

// Submit quiz answers
router.post('/submit', (req, res) => {
  // TODO: Check answers and return score
  res.json({
    score: 0,
    totalQuestions: 0,
    feedback: []
  });
});

module.exports = router;
