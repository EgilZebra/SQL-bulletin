const express = require('express');
const route = express.Router();
const { getChannel, postChannel, removeChannel, updateChannel } = require('../controllers/channelController')

route.get( '/', getChannel)
route.post( '/', postChannel)
route.delete( '/', removeChannel)
route.put( '/', updateChannel)