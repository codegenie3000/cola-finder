const express = require('express');
const mongoose = require('mongoose');


const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('mongo connected');
    }
});

app.get('/', (req, res) => {
    res.send('hello');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('server started');
});