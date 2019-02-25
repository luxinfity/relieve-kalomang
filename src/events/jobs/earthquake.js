'use strict';

const Repository = require('../../repositories');

const AFFECTED_RADIUS = 50000; // meters

exports.broadcast = async (data) => {
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

exports.save = async (data) => {
    try {
        const Repo = new Repository();
        await Repo.get('earthquake').create({
            source: 'BMKG',
            magnitude: +data.magnitude,
            depth: +data.depth,
            geograph: {
                type: 'Point',
                coordinates: [+data.longitude, +data.latitude]
            },
            occurs_at: data.occurs_at
        });
    } catch (err) {
        console.error(err.message); // eslint-disable-line
    }
};

module.exports = exports;
