const moment = require('moment-timezone');

const F2C = deg => (5 / 9) * (deg - 32);

const M2K = speed => speed * 1.609344;

const common = item => ({
    id: item.ID,
    temperature: {
        celcius: +F2C(item.tempf).toFixed(2),
        fahrenheit: +item.tempf
    },
    humidity: +item.humidity,
    time: moment(item.time).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss')
});

const raw = item => ({
    id: item.ID,
    rain_intensity: {
        daily: item.dailyrainin,
        weekly: item.weeklyrainin,
        monthly: item.monthlyrainin,
        yearly: item.yearlyrainin
    }
});

const params = parameters => parameters.reduce((res, param) => {
    res[param] = 'True';
    return res;
}, {});

const sensor = item => ({
    name: item.ID,
    location_name: item.lokasi,
    geograph: {
        type: 'Point',
        coordinates: [+item.long, +item.lat]
    }
});

const check = item => ({
    temperature: +F2C(item.tempf).toFixed(2),
    wind_speed: +M2K(item.windspeedmph).toFixed(2),
    uv_index: +item.uv,
    rain_intensity: +item.rainin
});

const get = item => ({
    temperature: +F2C(item.temperature).toFixed(2),
    wind_speed: +M2K(item.windSpeed).toFixed(2),
    uv_index: +item.uvIndex,
    rain_intensity: +item.precipIntensity
});

module.exports = {
    common,
    raw,
    params,
    sensor,
    check,
    get
};
