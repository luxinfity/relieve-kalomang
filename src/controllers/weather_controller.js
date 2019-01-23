'use strict';

const axios = require('axios');
const moment = require('moment-timezone');

const { HttpResponse } = require('../utils/helpers');
const Config = require('../models/config');

const ENDPOINTS = {
    raw: 'rawdata',
    recent: 'recentdata',
    daily: 'dailydata',
    monthly: 'mothlydata'
};

const WEATHER_API_URL = 'http://45.126.132.55:4444';

const getWeatherData = async (type) => {
    const { value: key } = await Config.findOne({ key: 'weather_session_id' });
    return axios.get(`${WEATHER_API_URL}/${ENDPOINTS[type]}?format=json`, {
        headers: {
            Cookie: `sessionid=${key}`
        }
    });
};

const F2C = deg => (5 / 9) * (deg - 32);

const transformer = datas => datas.map(item => ({
    id: item.ID,
    temperature: {
        celcius: +F2C(item.tempf).toFixed(2),
        fahrenheit: +item.tempf
    },
    humidity: +item.humidity,
    time: moment(item.time).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss')
}));

exports.list = async (req, res, next) => {
    try {
        const type = req.query.type;
        const { data: [data] } = await getWeatherData(req.query.type);
        return HttpResponse(res, 'weather data retrieved', type === 'raw' ? data : transformer(data));
    } catch (err) {
        return next(err);
    }
};

exports.auth = async (req, res, next) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${WEATHER_API_URL}/o/token/`,
            data: `grant_type=password&username=${process.env.WEATHER_API_USERNAME}&password=${process.env.WEATHER_API_PASSWORD}`,
            auth: {
                username: process.env.WEATHER_API_CLIENT_ID,
                password: process.env.WEATHER_API_CLIENT_SECRET
            }
        });


        return HttpResponse(res, 'weather endpoint re-authenticated', data);
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
