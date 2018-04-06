var IController = require('./IController');
var express = require('express');
var InfoTDO = require('./models/info/InfoTDO');
var url = require('url');

const CONFIG = require('../../server/config.json');

class InfoController extends IController {
  constructor(name) {
    super(name);
    this.name = name;
    this.router = express.Router();
  }

  getController() {

    this.router.get(`/${this.name}`, (req, res, next) => {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      switch (query.key) {
        case 'version':
          let info = new InfoTDO('version', CONFIG['VERSION']);
          res.json(info);
          break;
        default:
          res.status(400);
          res.json('Bad request!');
          break;
      }
    });

    return this;
  }

}

module.exports = InfoController;