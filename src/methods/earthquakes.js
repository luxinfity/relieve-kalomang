'use strict';

const { HttpError, JobWorker } = require('relieve-common');
const Repository = require('../repositories');
const { list: earthquakeList } = require('../utils/transformers/earthquake_transformer');

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

exports.getEarthQuakeList = async (data, context) => {
    try {
        const { query: { page, limit } } = data;
        const Repo = new Repository(context);

        const total = await Repo.get('earthquake').count();
        const earthquakes = await Repo.get('earthquake').paginate({}, page, limit);

        return {
            message: 'earthquake data retrieved',
            data: {
                total,
                content: earthquakeList(earthquakes),
                page,
                limit
            }
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};
