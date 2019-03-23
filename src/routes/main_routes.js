'use strict';

const router = require('express').Router();

const { callback } = require('../methods/earthquakes');
const { get } = require('../methods/weathers');
const { ExpressLogicAdapter: Logic } = require('../utils/libs/express');

const Validator = require('../middlewares/request_validator');
const AuthGuard = require('../middlewares/auth_guard');

/** Routes */
router.get('/weather/:coordinates', AuthGuard, Validator('getWeather'), Logic(get));
router.post('/earthquake/callback', Logic(callback));

module.exports = router;
