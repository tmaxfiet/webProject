const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('It works!');
});

router.get('/love', (req, res) => {
	res.send('love at base');
});

module.exports = router;
