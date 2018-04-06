class IController {
  constructor(name) {
    this.name = name;
    this.router;
  }
  setName(name) {
    this.name = name;
  };
  /**
   *  return  controller's name 
   */
  getName() {
    return this.name;
  };
  /**
   * retrun function routing for express
   */
  getRouter() {
    return this.router;
  };
  /**
   * set colback function handel 
   * @param {*} router 
   */
  setRouter(router) {
    this.router = router;
  }

  getController() {
    throw (new Error('not implemented!'));
  }
}

module.exports = IController;