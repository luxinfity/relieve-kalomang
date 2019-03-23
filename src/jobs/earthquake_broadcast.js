'use strict';

const Repository = require('../repositories');
const FCM = require('../utils/messaging');
const { isEmptyArray } = require('../utils/helpers');

const AFFECTED_RADIUS = 50000; // meters

module.exports = async (data) => {
    try {
        const Repo = new Repository();
        const positions = await Repo.get('position').getAffected([+data.longitude, +data.latitude], AFFECTED_RADIUS);
        const fcmTokens = positions.reduce((acc, item) => {
            if (item.user && item.user.fcm_token) acc.push(item.user.fcm_token);
            return acc;
        }, []);

        /** broadcast notification if not empty array */
        if (!isEmptyArray(fcmTokens)) {
            const notification = { title: 'earthquake', body: 'youre within an earthquake affected radius' };
            await FCM.sendToDevice(fcmTokens, { data, notification });
        }
    } catch (err) {
        console.error(err.message); // eslint-disable-line
    }
};
