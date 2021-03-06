'use strict';

const {
    HttpError, MongoContext, JobWorker, Firebase
} = require('relieve-common');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

/** Configuration file */
const { mongodb: MongoConfig } = require('./config/database');
const { firebase: firebaseConfig } = require('./config/plugins');
const { MODELS_PATH } = require('./utils/constants');

/** Handlers */
const ApiGuard = require('./middlewares/api_guard');
const RateLimiter = require('./utils/libs/rate_limiter');
const RouteHandler = require('./routes');
const ExceptionHandler = require('./exceptions');

/** Initialize Express */
const app = express();

/** Initialize common modules */
HttpError.initialize();
MongoContext.initialize({ path: MODELS_PATH.MONGO, config: MongoConfig });
JobWorker.initialize({ path: MODELS_PATH.JOB });
Firebase.initialize(firebaseConfig);

/** Plugins */
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Global Middlewares */
app.use(ApiGuard);
app.use(RateLimiter());

/** Register Handlers */
RouteHandler(app);
ExceptionHandler(app);

module.exports = app;
