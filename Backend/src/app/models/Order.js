    const e = require('express');
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Order = new Schema({
        productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        totalPrice: { type: Number },
        status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
        address: { type: String },
        phone: { type: String },
    }, { timestamps: true });

    module.exports = mongoose.model('Order', Order);