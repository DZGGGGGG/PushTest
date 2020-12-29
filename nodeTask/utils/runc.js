/**
 * dali. 子线程
 */

const exec = require("shelljs");
const spawn = require("child_process").spawn;
function runc(cmd) {
  const bodyArr = cmd.split(/\s/g)
  const header = bodyArr.shift()
  return new Promise((resolve, reject) => {
    var result = spawn(header, bodyArr);
    result.stdout.on("data", function (data) {
      console.log("stdout: " + data);
    });
    result.stderr.on("data", function (data) {
      console.log("stderr: " + data);
      reject(new Error(stderr.toString()));
    });
    result.on("close", (code) => {
      console.log(`子进程退出，退出码 ${code}`);
    });
  });
}
function runc3(cmd) {
  return new Promise((resolve, reject) => {
    exec.exec(cmd, { silent: false }, (code, out, err) => {
      if (code) {
        reject(err);
      }
      resolve(out);
    });
  });
}

module.exports = runc;
