const router = require('express').Router();
const EarthquakeController = require('../controllers/earthquake_controller');

router.post('/callback', EarthquakeController.callback);

module.exports = router;
