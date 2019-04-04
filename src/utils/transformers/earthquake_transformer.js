'use strict';

exports.list = earthquakes => earthquakes.map((quake) => {
    const [lng, lat] = quake.geograph.coordinates;
    return {
        id: quake.id,
        coordinates: `${lat}, ${lng}`,
        magnitude: quake.magnitude,
        depth: quake.depth,
        occurs_at: quake.occurs_at
    };
});

module.exports = exports;
