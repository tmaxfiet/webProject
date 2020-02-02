# webProject
To start the web project currently exists as three seperate processes
1. React process starts in react-app through npm start in react-app/
2. Express is ran in node-app/ with npm start
3. MongoDb is ran at webProject base level using mongostart alias (sudo mongod --dbpath ~/webProject/db/data)

1a. You can alternatively run both the server and client at the webProject level with npm start using concurrently package. 

Run npm start from webProject/ to run express and node server that concurrently runs with a react frontend
