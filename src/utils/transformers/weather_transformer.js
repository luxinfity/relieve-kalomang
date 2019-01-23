const moment = require('moment-timezone');

const F2C = deg => (5 / 9) * (deg - 32);

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

const params = parammeters => parammeters.reduce((res, param) => {
    res[param] = 'True';
    return res;
}, {});

const sensor = item => ({
    name: item.ID,
    location_name: item.lokasi,
    geograph: {
        type: 'Point',
        coordinates: [+item.lat, +item.long]
    }
});

module.exports = {
    common,
    raw,
    params,
    sensor
};
