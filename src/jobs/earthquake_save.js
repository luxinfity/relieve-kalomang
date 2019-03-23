'use strict';

const Repository = require('../repositories');

module.exports = async (data) => {
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
