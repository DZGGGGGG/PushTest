const Thread = require("./utils/Thread");
const moment = require('moment')
const thread = new Thread()
function log(content) {
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    const str = `[${moment(new Date()).format('YYYY-MM-DD')}]  content`
    thread.runExec(`echo > ${content} ${global.logfile}`)
}

module.exports = log