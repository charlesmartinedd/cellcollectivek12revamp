const express = require('express');
const router = express.Router();

// Get SCORM package
router.get('/package/:id', (req, res) => {
  // TODO: Serve SCORM package
  res.json({ package: null });
});

// Track SCORM progress
router.post('/progress', (req, res) => {
  // TODO: Save progress to database
  res.json({ success: true });
});

module.exports = router;
