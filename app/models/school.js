const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SchoolSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('School', SchoolSchema);
