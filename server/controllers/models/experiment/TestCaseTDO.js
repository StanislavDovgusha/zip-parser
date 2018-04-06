class TestCaseTDO {
  constructor(
    name,
    pass,
    fail,
    body,
    isOk,
    idTestFile,
  ) {
    this.body = body;
    this.name = name;
    this.pass = pass;
    this.fail = fail;
    this.isOk = isOk;
    this.idTestFile = idTestFile;
  }
}

module.exports = TestCaseTDO;