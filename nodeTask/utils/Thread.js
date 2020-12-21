const { exec } = require("child_process");
class Thread {
  runExec(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd,{maxBuffer: 1024 * 500} ,(err,stdout, stderr) => {
        if (err) {
          reject(err,stderr)
          return;
        }
        resolve(stdout)
      });
    });
  }
}

module.exports = Thread;
