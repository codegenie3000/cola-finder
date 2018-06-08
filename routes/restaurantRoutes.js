const mongoose = require('mongoose');
const NodeGeocoder = require('node-geocoder');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const Restaurant = mongoose.model('restaurants');

const geocoderOptions = {
    provider: 'google',

    httpAdapter: 'https',
    apiKey: keys.googleGeocoderClientKey,
    formatter: null
};

const geocoder = NodeGeocoder(geocoderOptions);

module.exports = (app) => {
    // Index - find all restaurants
    app.get('/api/restaurants', async (req, res) => {
        try {
            const restaurants = await Restaurant.find({});
            res.send(restaurants);
        } catch {
            res.send('err');
        }
    });

    // route for records by lat/lng
    // query is minLat, maxLat, minLon, MaxLon
    app.get('/api/restaurants/bounds/', async (req, res) => {
        const {minLat, maxLat, minLon, maxLon} = req.query;
        const coords = {
            minLat: parseFloat(minLat),
            maxLat: parseFloat(maxLat),
            minLon: parseFloat(minLon),
            maxLon: parseFloat(maxLon)
        };

        try {
            const restaurants = await Restaurant.find({
                lat: { $gte: coords.minLat, $lte: coords.maxLat},
                lng: { $gte: coords.minLon, $lte: coords.maxLon}
            });
            res.send(restaurants);
        } catch {
            res.send('err');
        }
    });

    // route for records by lat/lng and filter type

    // New - shows form
    /*app.get('/api/restaurants/new', (req, res) => {
        res.send('new restaurant form');
    });*/


    // Create - new POST route
    //TODO sanitize body
    //TODO Try catch?
    app.post('/api/restaurants', requireLogin, async (req, res) => {
        const { name, address, city, state, zip, lat, lng, coke } = req.body;

        if (lat) {
            let reverseData = await geocoder.reverse({lat: lat, lon: lng});
            reverseData = reverseData[0];

            const restaurantData = {
                name: name,
                address: `${reverseData.streetNumber} ${reverseData.streetName}`,
                city: reverseData.city,
                state: reverseData.administrativeLevels.level1short,
                zip: reverseData.zipcode,
                lat: lat,
                lng: lng,
                coke: coke,
                dateAdded: Date.now()
            };

                const restaurant = new Restaurant(restaurantData);
                const newRestaurant = await restaurant.save();
                res.send(newRestaurant);

        } else {
            let data = await geocoder.geocode(`${address}, ${city}, ${state}, ${zip}`);
            data = data[0];
            console.log(data);

            const restaurantData = {
                name: name,
                address: `${data.streetNumber} ${data.streetName}`,
                city: data.city,
                state: data.administrativeLevels.level1short,
                zip: data.zipcode,
                lat: data.latitude,
                lng: data.longitude,
                dateAdded: Date.now()
            };

            const restaurant = new Restaurant(restaurantData);
            const newRestaurant = await restaurant.save();
            res.send(newRestaurant);
        }
    });
    // show /:id
    app.get('/api/restaurants/:id', async (req, res) => {
        const restaurantId = req.params.id;
        console.log(restaurantId);
        try {
            const restaurant = await Restaurant.findOne({_id: restaurantId});
            res.send(restaurant);
        } catch {

        }
    });

    // Edit /:id
    app.get('/api/restaurants/:id/edit', async (req, res) => {
        res.send('edit route reached');
    });
    // Update - PUT
    app.put('/api/restaurants/:id', requireLogin, async (req, res) => {
        const restaurantId = req.params.id;
        const { name, address, city, state, zip, lat, lon, coke } = req.body;

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId,
            {
                $set: {
                    name: name,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    lat: lat,
                    lon: lon,
                    coke: coke,
                    dateUpdated: Date.now()
                }
            }).exec();

        res.send(updatedRestaurant);
    });

    // DELETE
    app.delete('/api/restaurants/:id', requireLogin, async (req, res) => {
        const restaurantId = req.params.id;
        const deletedRestaurant = await Restaurant.findByIdAndRemove(restaurantId).exec();
        res.send(deletedRestaurant);
    });
};