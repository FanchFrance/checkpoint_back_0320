const express = require('express');
const router = express.Router();
const activities = require('./activities')
const events = require('./events')

router.use('/activities', activities);
router.use('/events', events);

module.exports = router;