const MongoClient = require('mongodb').MongoClient;

function main() {
    // Connect to mongo client with uri
    const uri = "mongodb+srv://dbUser:Justinmax1024!@cluster0-crzjm.azure.mongodb.net/test?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect( (err) => {
        if (err) {
            console.log('Error connecting to mongodb: ', err);
            return;
        }
        var item = {name: 'taco', tasty: true};

        addItemToCollection(client, 'foods', 'mexican', item).then( () => {
            // Collection successfully added, close client
            client.close();
        }).catch( (err) => {
            console.log('Error adding to collection: ', err);
        });
    })
}

async function addItemToCollection(client, dbName, collectionName, item) {
    return new Promise((resolve, reject) => {
        var db = client.db(dbName);
        checkIfCollectionExists(db, dbName, collectionName).then( (dbExists) => {
            if (!dbExists) {
                db.createCollection(collectionName, (err) => {
                    if (err) {
                        console.log('Error creating ', collectionName, ' collection: ', err);
                        return;
                    }

                    console.log('Created collection: ', collectionName);
                });
            }

            var collection = client.db(dbName).collection(collectionName);
            checkIfItemExistsInCollection(collection, dbName, collectionName, item).then( (itemExists) => {
                if (!itemExists) {
                    collection.insertOne(item, function(err, result) {
                        if (err) {
                            console.log('Error inserting one into ', dbName, ':', collectionName, err);
                        }
                        
                        console.log('Added to collection: ', collectionName, ' item: ', item);
                    });
                } else {
                    console.log('item: ', item, ' Already in collection: ', collectionName);
                }
                // End of promise chain, resolve if reached here
                resolve();
            }).catch( (err) => {
                reject(err);
                console.log('Error checking if item exists: ', err);
            });
        }).catch( (err) => {
            reject(err);
            console.log('Error checking if collection exists: ', err);
        });
    });
}

/**
 * 
 * @param { MongoClient.db } db used to access mongo db functions
 * @param { String } dbName used to provide error messaging
 * @param { String } collectionName used to specify which collection to check
 */
async function checkIfCollectionExists(db, dbName, collectionName) {
    return new Promise((resolve, reject) => {
        var response = false;

        db.listCollections({},{nameOnly: true}).toArray( (err, collections) => {
            collections.forEach( (collection) => {
                if (collection.name === collectionName) {
                    response = true;
                    resolve(response);
                }
            });

            err ? reject(err) : resolve(response);
        });
    });
}

/**
 * 
 * @param { MongoClient.db.collection } collection used to access mongo collection functions
 * @param { String } dbName string of db for error print out
 * @param { String } collectionName string of collection to check
 * @param { Object } item object to add to collection in JSON format
 */
async function checkIfItemExistsInCollection(collection, dbName, collectionName, item) {
    return new Promise((resolve, reject) => {
        var response = false;

        collection.find(item).limit(1).toArray( (err, item) => {
            // If array has length that means item exists since properties under query were found
            if (item.length != 0) response = true;
            err ? reject(err) : resolve(response);
        });
    });
}



// main();