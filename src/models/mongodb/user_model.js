
const mongoose = require('mongoose');
const uuid = require('uuid');
require('mongoose-uuid2')(mongoose);

const { Schema, model, Types } = mongoose;
const options = { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true } };

const ContactSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: [10, 20],
        required: true
    }
}, { versionKey: false, _id: false });

const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    expired_at: {
        type: Date,
        required: true
    }
}, { versionKey: false, _id: false });

const UserSchema = new Schema({
    _id: {
        type: Types.UUID,
        default: uuid.v4
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    img_url: {
        type: String
    },
    birthdate: {
        type: Date
    },
    phones: {
        type: [ContactSchema]
    },
    gender: {
        type: String,
        enum: ['m', 'f']
    },
    is_complete: {
        type: Boolean,
        required: true
    },
    fcm_token: {
        type: String
    },
    refresh_token: {
        type: RefreshTokenSchema
    }
}, options);

module.exports = model('User', UserSchema, 'users');
