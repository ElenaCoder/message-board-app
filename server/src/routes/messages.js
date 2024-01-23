const express = require('express');
const router = express.Router();
const messages = require('../data/messages');

router.get('/:channel', (req, res) => {
  const { channel } = req.params;
  res.json(messages.getMessagesForChannel(channel));
});

router.post('/:channel', express.json(), (req, res) => {
  const { channel } = req.params;
  const { text } = req.body;
  messages.addMessageToChannel(channel, text);
  res.json({ success: true });
});

module.exports = router;