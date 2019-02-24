'use strict';

const axios = require('axios');

const { HttpResponse } = require('../utils/helpers');
const { WEATHER, CLASSIFICATION: CLASS } = require('../utils/weather');
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


exports.get = async (req, res, next) => {
    try {
        const { coordinates } = req.params;
        const { data: { currently: data } } = await getWeatherData(coordinates);

        const transformed = GET(data);
        const final = determineStatuses([transformed]);

        return HttpResponse(res, 'weather data retrieved', final);
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
