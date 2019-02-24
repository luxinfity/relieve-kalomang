'use strict';

const Repository = require('../../repositories');

exports.broadcast = (data) => {
    setTimeout(() => {
        console.log('notify all affected users'); // eslint-disable-line
    }, 5000);
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
