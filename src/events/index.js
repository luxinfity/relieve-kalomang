const events = require('events');
const fs = require('fs');
const path = require('path');

let instance;

exports.registerListeners = () => {
    fs.readdirSync(path.join(__dirname, 'jobs')).forEach((jobFile) => {
        const [jobName] = jobFile.split('.');
        const job = require(`./jobs/${jobFile}`);
        Object.keys(job).forEach((event) => {
            instance.on(`${jobName}-${event}`, job[event]);
        });
    });
};

exports.initialize = () => {
    instance = new events.EventEmitter();
    exports.registerListeners();
};

exports.getInstance = () => {
    if (!instance) exports.initialize();
    return instance;
};

module.exports = exports;
