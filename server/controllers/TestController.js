var IController = require('./IController');
var TestHelper = require('./helpers/TestHelper');
var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');

const DIR_TEST_SUITE_ZIP = 'experiments';

class TestController extends IController {

  constructor(name) {
    super(name);
    this.router = express.Router();
  }

  getController() {

    this.router.get(`/${this.name}`, (req, res, next) => {
      let pathDir = path.join(global.DIR_NAME_ROOT_SERVER, DIR_TEST_SUITE_ZIP);
      let helperTest = new TestHelper();
      helperTest.getNameArchives(pathDir, (names) => {
        res.json(names);
      });
    });

    this.router.get(`/${this.name}/:name`, (req, res, next) => {
      let pathDir = path.join(global.DIR_NAME_ROOT_SERVER, DIR_TEST_SUITE_ZIP);
      let helperExperiment = new TestHelper();
      helperExperiment.getTestSuites(pathDir, req.params.name, (promises) => {
        promises.then((promise) => {
          if (promise.length > 0) {
            let proms = promise.reduce((previousValue, currentValue) => {
              return [...previousValue, ...currentValue];
            });
            Promise.all(proms).then(
              (testSutes) => {
                let array = helperExperiment.extractSuites(testSutes);
                try {
                  res.json(array);
                } catch (error) {
                  console.log(error);
                }
              }
            );
          } else {
            res.json({ archiveName: 'root', cases: null });
          }
        })
      });
    });

    return this;
  }

}

module.exports = TestController;