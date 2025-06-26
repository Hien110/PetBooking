    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Schedule = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
        shopId: { type: Schema.Types.ObjectId, ref: 'User' },
        time: {type: Date},
        note: {type: String},
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
    }, { timestamps: true });

    module.exports = mongoose.model('Schedule', Schedule);