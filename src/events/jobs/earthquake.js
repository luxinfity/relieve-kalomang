'use strict';

exports.broadcast = (data) => {
    setTimeout(() => {
        console.log('notify all affected users');
    }, 5000);
};

exports.save = (data) => {
    setTimeout(() => {
        console.log('save earthquake data');
    }, 5000);
};

module.exports = exports;
