'use strict';

const MainRoutes = require('../routes/main_routes');

module.exports = (app) => {
    app.use('/', MainRoutes);
};
