const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoRoutes = require('./routes/mongo');
const spotifyRoutes = require('./routes/spotify');

const app = express();
const uiBuildPath = '../react-app/build';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, uiBuildPath)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, uiBuildPath, 'index.html'));
});

app.use('/spotify', spotifyRoutes);

app.use('/data', mongoRoutes);

module.exports = app;
