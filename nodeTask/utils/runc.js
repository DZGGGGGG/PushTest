/**
 * dali. 子线程
 */

const exec = require("shelljs");

function runc(cmd) {
  return new Promise((resolve, reject) => {
    exec.exec(cmd, { silent: false }, (code, out, err) => {
      if (code) {
        reject(err)
      }
      resolve(out)
    });
  });
}

module.exports = runc;
