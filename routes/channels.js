const express = require('express');
const route = express.Router();
const { getChannel, postChannel, SubscriptionToChannel, updateChannel } = require('../controllers/channelController')

// create channel
route.post( '/create', postChannel)
// subscribe to channel
route.post( '/subscribe', SubscriptionToChannel)

// Subscribe or unsubscribe to/from channel
route.post('/subscription', SubscriptionToChannel);

// Get channel details
route.get('/:channel_ID', getChannel);

module.exports = route;
// route.delete( '/', removeChannel)
// route.put( '/', updateChannel)