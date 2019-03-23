'use strict';

const firebase = require('./libs/firebase');

const options = {};

exports.sendToDevice = async (tokens, { data, notification }) => {
    const instance = await firebase.getInstance();
    return instance.messaging().sendToDevice(tokens, { data, notification }, options);
};

exports.sendToTopic = () => ({});
exports.sendToGroup = () => ({});
exports.subscribeTopic = () => ({});
exports.unSubscribeTopic = () => ({});

module.exports = exports;
