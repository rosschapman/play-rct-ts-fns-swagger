swagger-cli bundle -r $1 > ./src/swagger.json; 
nodemon -V src/server.js & react-scripts start
