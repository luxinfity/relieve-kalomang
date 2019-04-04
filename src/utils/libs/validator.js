'use strict';

const Joi = require('joi');
const { HttpError } = require('relieve-common');

const COOR_REGEX = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

const schemas = {
    getWeather: Joi.object({
        params: Joi.object({
            coordinates: Joi.string().regex(COOR_REGEX).required()
        }).required()
    }),
    getEarthquake: Joi.object({
        query: Joi.object({
            page: Joi.number().integer().positive().default(1)
                .optional(),
            limit: Joi.number().integer().positive().default(5)
                .optional()
        }).required()
    })
};

const defaultOptions = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

module.exports = (input, schema, options = defaultOptions) => Joi.validate(input, schemas[schema], options)
    .catch((err) => {
        const details = err.details.reduce((detail, item) => {
            detail[item.context.key] = item.message.replace(/"/g, '');
            return detail;
        }, {});
        throw HttpError.UnprocessableEntity('validation error', details);
    });
