const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const WeatherSensorSchema = new Schema({
    uuid: {
        type: String,
        default: uuid.v4,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location_name: {
        type: String,
        required: true
    },
    geograph: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, { versionKey: false });

module.exports = model('WeatherSensor', WeatherSensorSchema, 'weather_sensors');
