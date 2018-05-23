const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Restaurant = mongoose.model('restaurants');

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

    // route for records by lat/lon

    // route for records by lat/lon and filter type

    // New - shows form
    /*app.get('/api/restaurants/new', (req, res) => {
        res.send('new restaurant form');
    });*/

    // Create - new POST route
    app.post('/api/restaurants', requireLogin, async (req, res) => {
        const { name, address, city, state, zip, lat, lon, coke } = req.body;

        const restaurant = new Restaurant({
            name,
            address,
            city,
            state,
            zip,
            lat,
            lon,
            coke,
            dateAdded: Date.now()
        });

        try {
            const newRestaurant = await restaurant.save();
            res.send(newRestaurant);
        } catch(err) {
            res.status(400).send(err.message);
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