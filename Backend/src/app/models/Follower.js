const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Follower = new Schema({
    followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    followingId: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Follower', Follower);
