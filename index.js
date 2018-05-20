const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/User');

mongoose.connect(keys.mongoURI, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('mongodb connected');
    }
});

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send('hello');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('server started');
});