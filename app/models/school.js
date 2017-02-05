const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SchoolSchema = new Schema({
    name: String,
    adress: String,
    website: String,
    latitude: Number,
    longitude: Number,
});

module.exports = mongoose.model('School', SchoolSchema);
