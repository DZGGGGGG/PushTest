/**
 * dali. 子线程
 */

const exec = require("shelljs");
const spawn = require("child_process").spawn;
const chalk = require('chalk');
 
function runcTest(cmd) {
  var bodyArr = cmd.split(/\s/g);
  const header = bodyArr.shift();
  bodyArr = bodyArr.map((element) => {
    return element.toString().replace(/#/g, " ");
  });
  return new Promise((resolve, reject) => {
    var result = spawn(header, bodyArr);
    let dataResult;
    let failurResult;
    result.stdout.on("data", function (data) {
      // console.log("stdout: " + data);
      console.log(chalk.green(data.toString()));
      dataResult += data;
    });
    result.stderr.on("data", function (data) {
      failurResult = data.toString();
      console.log(chalk.red(data.toString()));
      // console.log("stderr: " + data.toString());
    });
    result.on("close", (code) => {
      if (code == 0) {
        resolve(dataResult);
      } else {
        reject(failurResult);
      }
    });
  });
}
function runc(cmd) {
  return new Promise((resolve, reject) => {
    exec.exec(cmd, { silent: false }, (code, out, err) => {
      if (code) {
        reject(err);
      }
      resolve(out);
    });
  });
}

module.exports = runcTest;
