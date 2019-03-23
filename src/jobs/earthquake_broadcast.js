'use strict';

const Repository = require('../repositories');

const AFFECTED_RADIUS = 50000; // meters

module.exports = async (data) => {
    try {
        const Repo = new Repository();
        const positions = await Repo.get('position').getAffected([+data.longitude, +data.latitude], AFFECTED_RADIUS);
        const fcmTokens = positions.reduce((acc, item) => {
            if (item.user && item.user.fcm_token) acc.push(item.user.fcm_token);
            return acc;
        }, []);
        console.log(fcmTokens); // eslint-disable-line
    } catch (err) {
        console.error(err.message); // eslint-disable-line
    }
};
