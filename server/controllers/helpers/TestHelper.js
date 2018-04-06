var path = require('path');
var fs = require('fs');
var TestCaseTDO = require('../models/experiment/TestCaseTDO');
var StreamZip = require('node-stream-zip');

const TEST_CASE_HEADER = '! TEST CASE';

class TestHelper {
  getPromisesTestSuites(pathFile) {
    return new Promise((resolve) => {
      let promises = [];
      const zip = new StreamZip({
        file: pathFile,
        storeEntries: true
      });
      zip.on('ready', () => {
        for (const entry of Object.values(zip.entries())) {
          if (!entry.isDirectory) {
            let archiveName = entry.name;
            const data = zip.entryDataSync(entry.name);
            promises.push(this.extractFileData(archiveName, data));
          }
        }
        resolve(promises);
        zip.close();
      });

    })
  }

  extractFileData(archiveName, dataTestCute) {
    return new Promise((resolve) => {
      resolve({ archiveName: archiveName, data: dataTestCute });
    })
  }

  /**
   *  Return  Promise<{ archiveName: strign, cases:TestCaseTDO[]}>
   * @param {String} pathDir 
   * @param {Function} callback 
   */
  getTestSuites(pathDir, nameZip, callback) {
    let promises = [];
    fs.readdir(pathDir, (error, files) => {
      let pathChild = pathDir;
      files.forEach((file) => {
        pathChild += path.sep + file;
        let stat = fs.statSync(pathChild);
        if (stat.isFile()) {
          let dataString = pathChild.split('.');
          let type = dataString[dataString.length - 1];
          if (type === 'zip') {
            if (this.getArchiveName(pathChild) === nameZip) {
              promises.push(this.getPromisesTestSuites(pathChild));
            }
          }
        } else {
          this.getTestSuites(pathChild, nameZip);
        }
        pathChild = pathDir;
      });
      return callback(Promise.all(promises));
    });
  }

  /**
   * 
   */
  getNameArchives(pathDir, callback) {
    console.log(pathDir);
    let names = [];
    fs.readdir(pathDir, (error, files) => {
      let pathChild = pathDir;
      files.forEach((file) => {
        pathChild += path.sep + file;
        let stat = fs.statSync(pathChild);
        if (stat.isFile()) {
          let dataString = pathChild.split('.');
          let type = dataString[dataString.length - 1];
          if (type === 'zip') {
            names.push(this.getArchiveName(pathChild));
          }
        } else {
          this.getNameArchives(pathChild);
        }
        pathChild = pathDir;
      });
      return callback(names);
    });
  }

  getArchiveName(path) {
    let nameZip = path.match(/[^\\\/]+(?=\.zip)+(.*)$/)[0];
    return nameZip;
  }
  /**
   * 
   * @param { Object{ archiveName: string, data: Buffer }[] } testSutes 
   * @returns {{ archiveName: string, id:number, cases: TestCaseTDO[] }[]} { archiveName: string, cases: TestCaseTDO[] }[]
   */
  extractSuites(testSutes) {
    let list = [];
    for (let i = 0; i < testSutes.length; i++) {
      let cases = this.getTestCases(testSutes[i].data);
      let testCase = [];
      for (let j = 0; j < cases.length; j++) {
        let test = this.extractTestCase(testSutes[i].archiveName, cases[j], (i + 1));
        if (test) {
          testCase.push(test);
        }
      }
      list.push({
        id: (i + 1),
        archiveName: testSutes[i].archiveName,
        cases: testCase,
      });
    }
    return list;
  }
  /**
   * 
   * @param {buffer} data 
   * @returns { string[] }
   */
  getTestCases(data) {
    let cases = data.toString("utf-8", 0).trim().split(TEST_CASE_HEADER);
    return cases;
  }
  /**
   * 
   * @param {string} data 
   * @returns { TestCaseTDO };
   */
  extractTestCase(archiveName, data, idTestFile) {
    let testCase = new TestCaseTDO;
    if (data.length > 1) {
      try {
        testCase.body = TEST_CASE_HEADER + data;
        testCase.name = data.match(/# (.{0,})/)[1];
        let resultDate = this.getResultTestCase(data);
        testCase.fail = resultDate[1];
        testCase.pass = resultDate[0];
        testCase.isOk = true;
        testCase.idTestFile = idTestFile;
      } catch (error) {
        console.log('Error parser in fail ' + archiveName + '\n and TestCase name ' + testCase.name);
        testCase.isOk = false;
        // console.log(error);
      }
      return testCase;
    } else {
      return null;
    }
  }
  /**
   * retrun part result testCase 
   * number[0]=> pass
   * number[1]=> fail
   * @param {number[]} data 
   * @returns {string}
   */
  getResultTestCase(data) {
    //reg rex to get results
    let dataString = data.match(/Test case.{0,}\s{0,}.{0,}Pass:(.{0,})\s{0,}.{0,}Fail:(.{0,})\s/);
    let res = [];
    if (dataString[0]) {
      res[0] = Number.parseInt(dataString[1]);
      res[1] = Number.parseInt(dataString[2]);
    } else {
      throw new Error('Parser error');
    }
    return res;
  }

}

module.exports = TestHelper;