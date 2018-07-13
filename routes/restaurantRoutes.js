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

const convertToBool = (string) => {
    return (string === 'true');
};

const convertCoordinates = (minLat, maxLat, minLon, maxLon) => {
    return {
        minLat: parseFloat(minLat),
        maxLat: parseFloat(maxLat),
        minLon: parseFloat(minLon),
        maxLon: parseFloat(maxLon)
    }
};

module.exports = (app) => {
    // Index - find all restaurants
    app.get('/api/restaurants/all', async (req, res) => {
        try {
            const restaurants = await Restaurant.find({});
            res.send(restaurants);
        } catch {
            res.send('err');
        }
    });

    app.get('/api/restaurants/lookup', async(req, res) => {
        // must be sent for all queries
        let {minLat, maxLat, minLon, maxLon, coke, pepsi} = req.query;
        const coordinates = convertCoordinates(minLat, maxLat, minLon, maxLon);
        coke = convertToBool(coke);
        pepsi = convertToBool(pepsi);

        if (arguments.length < 7) {
            // simple query
            try {
                const restaurants = await Restaurant.find({
                    lat: { $gte: coordinates.minLat, $lte: coordinates.maxLat},
                    lng: { $gte: coordinates.minLon, $lte: coordinates.maxLon},
                    coke: coke,
                    pepsi: pepsi
                });
                res.send(restaurants);
            } catch {
                res.send('err');
            }
        } else {
            // complex query
            let {customMix, fountain, realSugar} = req.query;
            try {
                const restaurants = await Restaurant.find({
                    lat: { $gte: coords.minLat, $lte: coords.maxLat},
                    lng: { $gte: coords.minLon, $lte: coords.maxLon},
                    coke: convertToBool(coke),
                    pepsi: convertToBool(pepsi),
                    customMix: convertToBool(customMix),
                    fountain: convertToBool(fountain),
                    realSugar: convertToBool(realSugar)
                });
                res.send(restaurants);
            } catch {
                res.send('err');
            }
        }
    });

    // New - shows form - NOT REQUIRED

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