const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    address: String,
    city: String,
    State: String,
    Zip: String,
    lat: Number,
    lng: Number,
    coke: { type: Boolean, default: false },
    pepsi: { type: Boolean, default: false },
    customMix: { type: Boolean, default: false },
    fountain: { type: Boolean, default: false },
    realSugar: { type: Boolean, default: false },
    dateAdded: Date,
    dateUpdated: Date
});

mongoose.model('restaurants', restaurantSchema);