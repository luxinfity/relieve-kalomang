
module.exports = {
    WEATHER: {
        URL: 'http://45.126.132.55:4444',
        ACCESS_TOKEN: 'weather_access_token',
        PARAMS: [
            'dewptf',
            'windchillf',
            'winddir',
            'windspeedmph',
            'windgustmph',
            'rainin',
            'dailyrainin',
            'weeklyrainin',
            'monthlyrainin',
            'yearlyrainin',
            'solarradiation',
            'uv',
            'indoortempf',
            'indoorhumidity',
            'baromin'
        ]
    },
    ENDPOINTS: {
        raw: 'rawdata',
        recent: 'recentdata',
        daily: 'dailydata',
        monthly: 'mothlydata',
        sensor: 'sensor'
    },
    CLASSIFICATION: {
        rain_intensity: [
            {
                en: 'Not Rain',
                id: 'Tidak Hujan',
                min: 0,
                max: 0.009
            },
            {
                en: 'Light Rain',
                id: 'Hujan Ringan',
                min: 0.01,
                max: 0.097
            },
            {
                en: 'Moderate Rain',
                id: 'Hujan Sedang',
                min: 0.098,
                max: 0.380
            },
            {
                en: 'Heavy Rain',
                id: 'Hujan Deras',
                min: 0.390,
                max: 1.900
            },
            {
                en: 'Violent Rain',
                id: 'Hujan Badai',
                min: 2.000,
                max: 99.000
            }
        ],
        uv_index: [
            {
                en: 'Low',
                id: 'Rendah',
                min: 0,
                max: 2
            },
            {
                en: 'Moderate',
                id: 'Sedang',
                min: 3,
                max: 5
            },
            {
                en: 'High',
                id: 'Tinggi',
                min: 6,
                max: 7
            },
            {
                en: 'Very High',
                id: 'Sangat Tinggi',
                min: 8,
                max: 10
            },
            {
                en: 'Extreme',
                id: 'Extrim',
                min: 11,
                max: 99
            }
        ],
        wind_speed: [
            {
                en: 'Calm',
                id: 'Tenang',
                min: 0,
                max: 2
            },
            {
                en: 'Moderate Breeze',
                id: 'Angin Kecil',
                min: 2,
                max: 19
            },
            {
                en: 'Light Breeze',
                id: 'Angin Kecil',
                min: 2,
                max: 19
            },
            {
                en: 'Moderate Breeze',
                id: 'Angin Sedang',
                min: 20,
                max: 49
            },
            {
                en: 'High Wind',
                id: 'Angin Besar',
                min: 50,
                max: 74
            },
            {
                en: 'Storm',
                id: 'Angin Badai',
                min: 75,
                max: 102
            },
            {
                en: 'Hurricane',
                id: 'Angin Topan',
                min: 75,
                max: 102
            }
        ]
    }
};
