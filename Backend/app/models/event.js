const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: String, required: false },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mediaURL: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);



