const EventContext = require('../events');
const { HttpResponse } = require('../utils/helpers');

exports.callback = async (req, res, next) => {
    try {
        const Event = await EventContext.getInstance();
        const payload = req.body;

        await Event.emit('earthquake-save', payload);
        await Event.emit('earthquake-broadcast', payload);

        return HttpResponse(res, 'callback finished');
    } catch (err) {
        return next(err);
    }
};
