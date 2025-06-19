    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const WeightRange = new Schema({
        minWeight: { type: Number, required: true },
        maxWeight: { type: Number, required: true },
    }, { timestamps: true });

    module.exports = mongoose.model('WeightRange', WeightRange);