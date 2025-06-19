const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, default: 'Người dùng mới' },
    dob: { type: Date },
    role: { type: String, default: 'user' },
    description: { type: String, default: '' },
    avatar: { type: String, default: '/img/dafaultAvatar.jpg' },
    address: { type: String, default: '' },
    phone: { type: String },
    email: { type: String, required: true },
    status: { type: String, default: 'non-active' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Follower' }],
    gender: {type: Boolean, default: true},
    serviceId: [{type: Schema.Types.ObjectId, ref: 'Service'}],
    otp: { type: String },
    otpExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', User);