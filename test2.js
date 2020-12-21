// const fse = require("fs-extra");
// const ptools = require("./utils/PlistTools");
const Thread = require("./utils/Thread");
const setPodfile = require("./nodeTask/setPodfile");
const setConfig = require("./nodeTask/setConfig");
const runBuildIPA = require("./nodeTask/runBuildIPA")
const thread = new Thread()

const appConfig = require(`./nodeTask/appConfig`)
const path = require('path')

global.logfile = path.resolve('./nodeTast/log/1.log')
!(async () => {

  // 1 copy files
  await thread.runExec("ruby copyResourceFile.rb");

  // 2 edit info.plist file
  await setConfig(appConfig); //读取配置 修改info.plist文件等

  // 3 pod intall
  // await setPodfile(appConfig.component); // 修改podFile文件并且po install  module名字还要修改

  // 4 build IPA
  await runBuildIPA();
})();

//---------- 自动生成icon
// const run = require("cordova-res");
// const options = {
//     directory: '/*',
//     resourcesDirectory: 'pushViewTest/Assets.xcassets/AppIcon.appiconset',
//     logstream: process.stdout, // Any WritableStream
//     platforms: {
//       ios: { icon: { sources: ['resources/icon.png'] } },
//     },
//   };
// run(options);
