'use strict';

const axios = require('axios');
const { HttpError } = require('node-common');

const { WEATHER, CLASSIFICATION: CLASS } = require('../utils/libs/weather');
const { get: GET } = require('../utils/transformers/weather_transformer');


const getWeatherData = coordinates => axios.get(`${WEATHER.URL}/forecast/${process.env.DARKSKY_SECRET_KEY}/${coordinates}`, {
    params: {
        exclude: 'hourly,daily,timezone,flags'
    }
});

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

const determineStatuses = (items) => { // eslint-disable-line
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


exports.get = async (data, context) => {
    try {
        const { coordinates } = data.params;
        const { data: { currently: weatherData } } = await getWeatherData(coordinates);

        const transformed = GET(weatherData);
        const final = determineStatuses([transformed]);

        return {
            message: 'weather data retrieved',
            data: final

        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

module.exports = exports;
