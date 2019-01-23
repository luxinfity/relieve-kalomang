'use strict';

const axios = require('axios');
const Promise = require('bluebird');

const { HttpResponse } = require('../utils/helpers');
const { WEATHER, ENDPOINTS, CLASSIFICATION: CLASS } = require('../utils/constant');
const { sensor: SENSOR, check: CHECK } = require('../utils/transformers/weather_transformer');

const Config = require('../models/config');
const Sensor = require('../models/weather_sensor');

const getWeatherData = async (type, params = {}) => {
    const { value: key } = await Config.findOne({ key: WEATHER.ACCESS_TOKEN });
    return axios.get(`${WEATHER.URL}/${ENDPOINTS[type]}`, {
        params,
        headers: {
            Authorization: `Bearer ${key}`
        }
    });
};

const between = (x, min, max) => x >= min && x <= max;

const detStat = (key, value) => {
    let desc;
    if (CLASS[key]) {
        const chs = CLASS[key].find(item => between(value, item.min, item.max));
        desc = {
            id: chs.id,
            en: chs.en
        };
    }
    return { value, desc };
};

const determineStatuses = (items) => {
    const len = items.length;
    const sum = items.reduce((res, item) => {
        Object.keys(item).forEach((key) => {
            if (res[key]) { res[key] += item[key]; } else res[key] = item[key];
        });
        return res;
    }, {});

    Object.keys(sum).forEach((item) => {
        sum[item] = detStat(item, sum[item] / len); // eslint-disable-line
    });

    return sum;
};


exports.list = async (req, res, next) => {
    try {
        const { type } = req.query;
        const { data: [data] } = await getWeatherData(type);
        return HttpResponse(res, 'weather data retrieved', data);
    } catch (err) {
        return next(err);
    }
};

exports.raw = async (req, res, next) => {
    try {
        const { data: [data] } = await getWeatherData('raw');
        return HttpResponse(res, 'raw weather data retrieved', data);
    } catch (err) {
        return next(err);
    }
};

exports.sensor = async (req, res, next) => {
    try {
        const { data: [data] } = await getWeatherData('sensor');
        return HttpResponse(res, 'raw weather data retrieved', data);
    } catch (err) {
        return next(err);
    }
};

exports.check = async (req, res, next) => {
    try {
        /** get nearest sensor */
        const [lat, lng] = req.query.coordinates.split(',');
        const sensor = await Sensor.findOne(
            { geograph: { $near: { $geometry: { type: 'Point', coordinates: [+lng, +lat] } } } }
        );

        const { data: [sensorData] } = await getWeatherData('recent', {
            id: sensor.name,
            limit: 2,
            rainin: 'True',
            uv: 'True',
            windspeedmph: 'True'
        });

        const transformed = sensorData.map(CHECK);
        const final = determineStatuses(transformed);

        return HttpResponse(res, 'weather check completed', final);
    } catch (err) {
        return next(err);
    }
};

exports.seedSensor = async (req, res, next) => {
    try {
        const { data: [sensors] } = await getWeatherData('sensor');

        await Promise.map(sensors, sensor => Sensor.updateOne(
            { name: sensor.ID },
            SENSOR(sensor),
            { upsert: true, setDefaultsOnInsert: true }
        ), { concurrency: 10 });

        return HttpResponse(res, 'weather sensor data updated');
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
