const BaseRepository = require('./base_repository');

class PositionRepo extends BaseRepository {
    async findOne(conditions) {
        const mongo = await this.getMongoInstance();
        return mongo.Position.findOne(conditions);
    }

    async findAllDetailed(conditions) {
        const mongo = await this.getMongoInstance();
        return mongo.Position.find(conditions)
            .populate('user');
    }

    async create(payload) {
        const mongo = await this.getMongoInstance();
        return mongo.Position.create(payload);
    }

    async updateOne(conditions, payload) {
        const mongo = await this.getMongoInstance();
        return mongo.Position.updateOne(conditions, payload);
    }

    async getAffected(coordinates, radius) {
        const mongo = await this.getMongoInstance();
        return mongo.Position.find({
            geograph: {
                $near: {
                    $geometry: { type: 'Point', coordinates },
                    $maxDistance: radius
                }
            },
            is_latest: true
        })
            .populate('user', ['fcm_token']);
    }
}

module.exports = PositionRepo;
