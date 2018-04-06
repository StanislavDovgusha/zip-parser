var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var services = require('./server/Services');
// require configs files
const CONFIG = require('./server/config.json');

// app server
const app = express();

// set global vars
global.DIR_NAME_ROOT_SERVER = __dirname;

function registerContrpllers() {
  let conrtollers = services.getControllers();
  try {
    for (let i = 0; i < conrtollers.length; i++) {
      app.use('/api', conrtollers[i].router);
      console.log('Controller ( ' + conrtollers[i].name + ' ) has benn connected!');
    }
  } catch (error) {
    console.log(error);
  }
}

function start() {
  // init server 
  let port = CONFIG["SERVER_PORT"];
  // config server
  app.set('json spaces', 2);

  // Register Services
  registerContrpllers();

  app.listen(port, () => {
    console.log('Server has benn started and listenr port=', port);
  });

};
start();