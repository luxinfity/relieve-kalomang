'use strict';

const { HttpError, JobWorker } = require('relieve-common');

exports.callback = async (data, context) => {
    try {
        const payload = data.body;

        await JobWorker.dispatch('earthquake-save', payload);
        await JobWorker.dispatch('earthquake-broadcast', payload);

        return {
            message: 'callback finished'
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};
