const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const PromoSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Promo', PromoSchema);
