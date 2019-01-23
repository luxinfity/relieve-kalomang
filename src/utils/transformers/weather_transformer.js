const moment = require('moment-timezone');

const common = item => ({
    id: item.ID,
    temperature: {
        fahrenheit: +item.tempf
    },
    humidity: +item.humidity,
    time: moment(item.time).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss')
});

const raw = item => item;

module.exports = {
    common,
    raw
};
