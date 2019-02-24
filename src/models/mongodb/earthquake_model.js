const { Schema, model } = require('mongoose');
const uuid = require('uuid');
const moment = require('moment');

const EarthquakeSchema = new Schema({
    uuid: {
        type: String,
        default: uuid.v4,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    magnitude: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    geograph: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    occurs_at: {
        type: String,
        required: false,
        default: moment().format('DD-MM-YYYY h:mm:ss')
    }
}, { versionKey: false });

module.exports = model('Earthquake', EarthquakeSchema, 'earthquakes');
