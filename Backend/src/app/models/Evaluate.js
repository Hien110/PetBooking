const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Evaluate = new Schema({
    star: { type: Number },
    comment: { type: String },
    evaluaterId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: {type: Scheema.Types.ObjectId, ref: 'Service'}, 
}, { timestamps: true });

module.exports = mongoose.model('Evaluate', Evaluate);