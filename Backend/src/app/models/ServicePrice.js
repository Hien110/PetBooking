    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const ServicePrice = new Schema({
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        weightRange: { type: Schema.Types.ObjectId, ref: 'WeightRange', required: true },
        price: { type: Number, required: true },
    }, { timestamps: true });

    module.exports = mongoose.model('ServicePrice', ServicePrice);