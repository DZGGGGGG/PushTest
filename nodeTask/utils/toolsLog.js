const moment = require("moment");
const fs = require("fs");
function logBook(content) {
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  const str = `[${moment(new Date()).format(
    "YYYY-MM-DD HH:mm:ss"
  )}]  ${content} \r`;

  fs.appendFileSync(global.logfile, str, (err) => {
    if (err) {
      // 读文件是不存在报错
      // 意外错误
      // 文件权限问题
      // 文件夹找不到(不会自动创建文件夹)
      console.log(err);
    }
  });
}

module.exports = logBook;
