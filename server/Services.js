var TestController = require('./controllers/TestController');
var InfoController = require('./controllers/InfoController');

class Services {

  static getControllers() {
    let controllers = [];
    // add controlers 
    controllers.push(new TestController('tests').getController());
    controllers.push(new InfoController('info').getController());

    return controllers;
  }

}

module.exports = Services;