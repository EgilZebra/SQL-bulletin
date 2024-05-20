const express = require('express');
const route = express.Router();
const { getChannel, postChannel } = require('../controllers/channelController')

// create channel
route.post( '/create', postChannel)
// subscribe to channel
route.post( '/subscribe', getChannel)
// how many subscribers to a channel
// route.get('/', checkSubscribers)

module.exports = route;
// route.delete( '/', removeChannel)
// route.put( '/', updateChannel)