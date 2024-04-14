const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Event = require('./event');  

const feedbackSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: Event, required: true },
    feedbackText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, 
    feedbackDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
