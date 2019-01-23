'use strict';

const axios = require('axios');

const { HttpResponse } = require('../utils/helpers');
const { WEATHER } = require('../utils/constant');
const { common: COMMON, raw: RAW } = require('../utils/transformers/weather_transformer');
const Config = require('../models/config');

const ENDPOINTS = {
    raw: 'rawdata',
    recent: 'recentdata',
    daily: 'dailydata',
    monthly: 'mothlydata'
};

const getWeatherData = async (type) => {
    const { value: key } = await Config.findOne({ key: WEATHER.ACCESS_TOKEN });
    return axios.get(`${WEATHER.URL}/${ENDPOINTS[type]}?format=json`, {
        headers: {
            Authorization: `Bearer ${key}`
        }
    });
};

exports.list = async (req, res, next) => {
    try {
        const type = req.query.type;
        const { data: [data] } = await getWeatherData(type);
        return HttpResponse(res, 'weather data retrieved', data);
    } catch (err) {
        return next(err);
    }
};

exports.auth = async (req, res, next) => {
    try {
        const { data: { access_token: token } } = await axios({
            method: 'post',
            url: `${WEATHER.URL}/o/token/`,
            data: `grant_type=password&username=${process.env.WEATHER_API_USERNAME}&password=${process.env.WEATHER_API_PASSWORD}`,
            auth: {
                username: process.env.WEATHER_API_CLIENT_ID,
                password: process.env.WEATHER_API_CLIENT_SECRET
            }
        });

        await Config.updateOne({ key: WEATHER.ACCESS_TOKEN }, { value: token }, { upsert: true, setDefaultsOnInsert: true });

        return HttpResponse(res, 'weather endpoint re-authenticated', { access_token: token });
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
