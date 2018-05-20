const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    address: String,
    lat: String,
    lon: String,
    coke: Boolean,
    pepsi: Boolean,
    customMix: Boolean,
    fountain: Boolean,
    realSugar: Boolean
});

mongoose.model('restaurants', restaurantSchema);