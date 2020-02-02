const MongoClient = require('mongodb').MongoClient;

async function main() {
    // Connect to mongo client with uri
   const uri = "mongodb+srv://dbUser:Justinmax1024!@cluster0-crzjm.azure.mongodb.net/test?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    /* try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close()
    }; */

    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
    });
}

main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases are: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};