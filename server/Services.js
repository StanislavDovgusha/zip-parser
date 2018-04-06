var TestController = require('./controllers/TestController');
var InfoController = require('./controllers/InfoController');

class Services {

  static getControllers() {
    let controllers = [];
    // add controlers 
    console.log(global.CONFIG['DIR_TEST_SUITS']);
    controllers.push(new TestController("tests", global.CONFIG['DIR_TEST_SUITS']).getController());
    controllers.push(new InfoController("info").getController());

    return controllers;
  }

}

module.exports = Services;