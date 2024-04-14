const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Event = require('./event');

const registerSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: Event, required: true },
    registrationDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Register', registerSchema);