const WeatherRoutes = require('../routes/weather_routes');

module.exports = (app) => {
    app.use('/weather', WeatherRoutes);
};
