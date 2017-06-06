const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.API_PORT || 3014;
const HOSTNAME = process.env.API_HOSTNAME || 'localhost';
const APP_NAME = process.env.APP_NAME || 'CV Share';
const PROTOCOL = process.env.PROTOCOL || 'http';
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
var server;

app.set('root', __dirname);
app.set('env', ENV);

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(err);
});

app.get('/api/status', (req, res, next) => {
  res.json({ message: 'API is running.' });
});

let routesPath = app.get('root') + '/app/routes';
app.use('/api', require(routesPath + '/cvs'));

/**
 * Start the app if not loaded by another module
 */
if (!module.parent) {
  server = http.createServer(app);
  server.listen(PORT, HOSTNAME, () => {
    let addr = server.address();

    console.info('Server is running', {
      app: APP_NAME,
      hostname: HOSTNAME,
      port: PORT,
      environment: ENV.toLowerCase(),
      url: `${PROTOCOL}://${HOSTNAME}:${PORT}`
    });
  });
}

module.exports.default = app;
