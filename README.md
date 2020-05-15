# webProject
1a. The project no longer uses the node-app server locally. The node-app code is included just for reference, simply run react-app and it will connect to the server it needs.
1b. If the AWS server is not working for, you can alternatively run both the server and client at the webProject level with 'npm start' using concurrently package. Keep it mind you will need to update 'react-app' to point to the new server, you can fix this in 'react-app/src/settings/constants.js'. The node-app defaults to run on http://localhost:3001.

Run npm start from webProject/ to run express and node server that concurrently runs with a react frontend
