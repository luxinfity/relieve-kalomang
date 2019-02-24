const WeatherRoutes = require('../routes/weather_routes');
const EarthquakeRoutes = require('../routes/earthquake_routes');

module.exports = (app) => {
    app.use('/weather', WeatherRoutes);
    app.use('/earthquake', EarthquakeRoutes);
};
