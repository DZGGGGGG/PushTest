// const fse = require("fs-extra");
// const ptools = require("./utils/PlistTools");
// const thread = require("./utils/Thread");
const setPodfile = require("./nodeTask/setPodfile");
const setConfig = require("./nodeTask/setConfig");
const runBuildIPA = require("./nodeTask/runBuildIPA")

const appConfig = require(`./pushViewTest/res/ios2/config/appConfig.js`)

!(async () => {

  // 1 copy files
  await thread.runExec("ruby copyResourceFile.rb");

  // 2 edit info.plist file
  // await setConfig(appConfig); //读取配置 修改info.plist文件等

  // 3 pod intall
  // await setPodfile(appConfig.component); // 修改podFile文件并且po install  module名字还要修改

  // 4 build IPA
  //await runBuildIPA();
  
})();
// async function buildIpa() {
//   /**  导入p12文件到钥匙串 p12Path(p12存在的地址) p12PassWord(p12的密码) mpFilePath(描述文件的当前地址)*/
//   const p12Path = "/Users/mt010/Desktop/打包测试/测试证书.p12";
//   const p12PassWord = "123456";
//   const importKeyStr = `security import ${p12Path} -k ~/Library/Keychains/login.keychain -P ${p12PassWord}`;
//   const outPut = await thread.runExec(importKeyStr);
//   console.log(outPut)
//   const mpFilePath =
//     "/Users/mt010/Desktop/打包测试/cocono3Test.mobileprovision";
//   /**  拷贝文件至指定位置，并以UUID命名 获取描述文件中UUID mobileprovisionUUID  */
//   const mobileprovisionUUID = `grep UUID -A1 -a ${mpFilePath} | grep -io '[-A-F0-9]\{36\}`;
//   const copyMBFileStr = `cp ${mpFilePath} "~/Library/MobileDevice/Provisioning Profiles/${mobileprovisionUUID}.mobileprovision"`; //复制描述文件到本机指定地址
//   outPut = await thread.runExec(copyMBFileStr);
//   console.log(outPut)
//   /**  读取mobileprovision文件内容并取出 certName（证书的名称）,bundleID，archiveType（打什么类型的包），archivePath（导出的archive地址），xcworkspaceName（项目名称）  */
//   const xcworkspaceName = "pushViewTest";
//   const archivePath = "/Users/mt010/Desktop/打包测试/pushViewTest.xcarchive";
//   const archiveType = "release";
//   const certName =
//     "iPhone Distribution: Meite Hudong(Shenzhen) Technology Co., Ltd. (NT6WQJV2L2)";
//   const bundleID = "com.mthd.cocoono3";
//   /**  进行导出archive文件 */
//   const xcodeArchiveStr = `xcodebuild archive -workspace ${xcworkspaceName}.xcworkspace -scheme ${xcworkspaceName} -archivePath ${archivePath} -configuration ${archiveType} CODE_SIGN_IDENTITY="${certName}" PROVISIONING_PROFILE=${mobileprovisionUUID} PRODUCT_BUNDLE_IDENTIFIER="${bundleID}"`;
//   /**  导出ipa  需要exportIPAPath（导出地址） exportTemplateFile（模板文件） */
//   outPut = await thread.runExec(xcodeArchiveStr);
//   console.log(outPut)
//   const exportIPAPath = "/Users/mt010/Desktop/打包测试";
//   const exportTemplateFile =
//     "/Users/mt010/Desktop/打包测试/v2connect_dev.plist";
//   const exportIPAFileStr = `xcodebuild -exportArchive -archivePath ${archivePath} -exportPath ${exportIPAPath} -exportOptionsPlist ${exportTemplateFile}  -allowProvisioningUpdates`;
//   outPut = await thread.runExec(exportIPAFileStr);
//   console.log(outPut)
// }

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
