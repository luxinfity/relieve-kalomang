const BaseRepository = require('./base_repository');

class EarthquakeRepo extends BaseRepository {
    async findOne(conditions) {
        const mongo = await this.getMongoInstance();
        return mongo.Earthquake.findOne(conditions);
    }

    async create(payload) {
        const mongo = await this.getMongoInstance();
        return mongo.Earthquake.create(payload);
    }

    async updateOne(conditions, payload) {
        const mongo = await this.getMongoInstance();
        return mongo.Earthquake.updateOne(conditions, payload);
    }
}

module.exports = EarthquakeRepo;
