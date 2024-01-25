const express = require('express');
const cors = require('cors');
const app = express();

const channelsRouter = require('./routes/channels');
const messagesRouter = require('./routes/messages');

// Enable CORS for all routes
app.use(cors());


app.use('/channels', channelsRouter);
app.use('/messages', messagesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});