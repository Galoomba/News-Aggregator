require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

/**
 * Register node exception handler.
 */
require('./app/config/exception-handler').exceptionHandler();

/**
 * Initialize the container.
 */
require('./app/config/container');

/**
 * Register express middlewares.
 */
require('./app/middlewares')(app);

/**
 * Register express routes.
 */
require('./app/routes')(app, express);

/**
 * Register express exception handler.
 */
require('./app/config/exception-handler').expressExceptionHandler(app);

/**
 * Register express not found middleware.
 */
app.use((req, res) => {
  res.status(404).send({errors: ['not found']});
});

/**
 * Start the server.
 */

server.listen(container.config.port, ()=>console.log('News Aggregator Listening'));

/**
 * Set default time zone;
 */
process.env.TZ = container.config.time_zone;
