const mongoose = require('mongoose');
const uuid = require('uuid');
require('mongoose-uuid2')(mongoose);
const moment = require('moment');

const { Schema, model, Types } = mongoose;
const options = { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true } };

const EarthquakeSchema = new Schema({
    _id: {
        type: Types.UUID,
        default: uuid.v4
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
}, options);

module.exports = model('Earthquake', EarthquakeSchema, 'earthquakes');
