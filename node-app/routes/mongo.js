const express = require('express');

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://dbUser:Justinmax1024!@cluster0-crzjm.azure.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const DATABASE_NAME = 'foods';

const router = express.Router();

var database, collection;
client.connect( (err) => {
	if (err) {
		console.log('Error connecting to mongodb: ', err);
		return;
	}
	database = client.db(DATABASE_NAME);
	collection = database.collection('mexican');
});

router.get('/', (req, res) => {
	collection.find({}).toArray((err, result) => {
		if(err) {
			return res.status(500).send(err);
		}
		res.send(result);
	});
});

router.get('/collectionInfos', (req, res) => {
	database.listCollections().toArray(function(err, collectionInfos) {
		if(err) {
			return res.status(500).send(err);
		}
		res.send(collectionInfos);
	});
})

module.exports = router;
