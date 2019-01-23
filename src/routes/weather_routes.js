const router = require('express').Router();
const WeatherController = require('../controllers/weather_controller');
const WeatherRequest = require('../middlewares/request-validator/weather_request');
const JWTAuth = require('../middlewares/request-handler/jwt_auth');

router.get('/', JWTAuth, WeatherRequest('list'), WeatherController.list);
router.get('/raw', JWTAuth, WeatherController.raw);
router.get('/sensor', JWTAuth, WeatherController.sensor);

router.get('/check', WeatherRequest('check'), JWTAuth, WeatherController.check);

router.post('/sensor/seed', WeatherController.seedSensor);
router.post('/auth', WeatherController.auth);

module.exports = router;
