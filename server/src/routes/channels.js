const express = require('express');
const router = express.Router();
const channels = require('../data/channels');

router.get('/', (req, res) => {
  res.json(channels.getAllChannels());
});

module.exports = router;