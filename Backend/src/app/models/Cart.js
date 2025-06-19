    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Cart = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
    }, { timestamps: true });

    module.exports = mongoose.model('Cart', Cart);