const express = require('express');
const path = require('path');
const mongoRoutes = require('./routes/mongo');
const spotifyRoutes = require('./routes/spotify');

const app = express();
const uiBuildPath = '../react-app/build';

app.use(express.static(path.join(__dirname, uiBuildPath)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, uiBuildPath, 'index.html'));
});

app.use('/spotify', spotifyRoutes);

app.use('/data', mongoRoutes);

module.exports = app;
