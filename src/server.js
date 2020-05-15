const express = require("express");
const path = require("path");
const app = express();

const createMiddleware = require("@apidevtools/swagger-express-middleware");

createMiddleware("./petstore.yaml", app, function (err, middleware) {
  // Add all the Swagger Express Middleware, or just the ones you need.
  // NOTE: Some of these accept optional options (omitted here for brevity)
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock()
  );

  app.listen(9000, function () {
    console.log("The PetStore sample is now running at http://localhost:9000");
  });
});
