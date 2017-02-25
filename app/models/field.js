const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const FieldSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Field', FieldSchema);
