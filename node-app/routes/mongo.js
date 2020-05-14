const express = require('express');

const MongoClient = require("mongodb").MongoClient;
const uri = ""
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const DATABASE_NAME = 'study_noise';

const router = express.Router();

var database, collection, collectionNames;
client.connect( (err) => {
	if (err) {
		console.log('Error connecting to mongodb: ', err);
		return;
	}
	database = client.db(DATABASE_NAME);

	// Set up routes for every collection
	// `${baseURL}+/${collection_name}`
	database.listCollections().toArray(function(err, collectionInfos) {
		if(err) {
			return;
		}
		collectionNames = [];
		collectionInfos.forEach( (collection) => {
			// Use this name to set up all the document routes for this collection name
			var documents = setUpCollectionNameRoutes(collection.name).then( (documentArray) => {
				// Set up the route for the collection name
				router.get(`/${collection.name}`, (req, res) => {
					res.send(documentArray);
				})
			});
			// Now set up route for collection name
			collectionNames.push(collection.name);
		})
	});
});

/**
 * Sets up route for a specific document `${baseURL}+/${collection_name}/${document_id}`
 */
async function setUpCollectionNameRoutes(collectionName) {
	return new Promise((resolve, reject) => {
		if (!database) reject('Database not connected');
		database.collection(collectionName).find({}).toArray(function(err, documentArray) {
			// TODO do we need a route for every doc? probably not
			documentArray.forEach( (document) => {
				router.get(`/${collectionName}/${document.id}`, (req, res) => {
					res.send(document);
				})
			});
			resolve(documentArray);
		});
	});
};

router.get('/', (req, res) => {
	collection.find({}).toArray((err, result) => {
		if(err) {
			return res.status(500).send(err);
		}
		res.send(result);
	});
});

router.get('/collectionNames', (req, res) => {
	database.listCollections().toArray(function(err, collectionInfos) {
		if(err) {
			return res.status(500).send(err);
		}
		var collectionNames = [];
		collectionInfos.forEach( (collection) => {
			collectionNames.push(collection.name);
		})
		res.send(collectionNames);
	});
})

module.exports = router;
