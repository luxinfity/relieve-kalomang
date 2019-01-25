const router = require('express').Router();
const WeatherController = require('../controllers/weather_controller');
const WeatherRequest = require('../middlewares/request-validator/weather_request');
const JWTAuth = require('../middlewares/request-handler/jwt_auth');

router.get('/:coordinates', JWTAuth, WeatherRequest('get'), WeatherController.get);

module.exports = router;
