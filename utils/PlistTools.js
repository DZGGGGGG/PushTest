const plist = require('plist-json');
class PlistTools {
    parse(plistPath) {
        return new Promise((resolve, reject) => {
            plist.parse(plistPath, (err, json) => {
                if (err) return reject(err)
                return resolve(json)
            });
        })
    }
    save(plistPath, json) {
        plist.build(json);
        return new Promise((resolve, reject) => {
            plist.save(plistPath, json, (err) => {
                if (err) return reject(err)
                return resolve(true)
            });
        })
    }
}

module.exports = new PlistTools(plist)