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

    async count(conditions) {
        const mongo = await this.getMongoInstance();
        return mongo.Earthquake.count(conditions);
    }

    async paginate(conditions, page = 1, limit = 5) {
        const mongo = await this.getMongoInstance();
        return mongo.Earthquake
            .find(conditions)
            .skip((limit * page) - limit)
            .limit(limit)
            .sort({ occurs_at: -1 });
    }
}

module.exports = EarthquakeRepo;
