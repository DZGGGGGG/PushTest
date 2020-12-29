/**
 * dali. 任务类
 */

const EventEmitter = require("events");
const evt = new EventEmitter();

class Task {
  constructor() {
    this.list = [];
    this.it = null;
  }
  promise(func) {
    return new Promise((resolve) => {
      func();
      resolve();
    });
  }
  *interator() {
    for (const item of this.list) {
      evt.emit(item.taskName);
      yield item;
    }
  }
  // 任务名称，序列，回调
  on(taskName, serial = 0, callback) {
    if (typeof taskName === "string" && typeof callback === "function") {
      this.list.push({ taskName, serial });
      evt.on(taskName, async () => {
        await this.promise(callback);
      });
    }
  }
  start() {
    if (this.it) return;
    this.list = this.list.sort((prv, curr) => prv.serial - curr.serial);
    this.it = this.interator();
    this.it.next();
  }
  next() {
    if (!this.it) {
      this.start();
    }
    this.it.next();
  }
}

module.exports = Task;
