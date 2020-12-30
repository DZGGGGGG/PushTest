const path = require("path");
const fse = require("fs-extra");

const parse = require("mobileprovision-parse");
const runc = require("./utils/runc");
const Task = require("./utils/task");
const logBook = require("./utils/toolsLog");
const task = new Task();

const appConfig = require(`./appConfig`);
const setConfig = require("./setConfig");
const ptools = require("./utils/PlistTools");

function solveUrl(url) {
  return path.join(process.env.HOME, url);
}
function log(content) {
  console.log(content);
}
/* 文件夹路径不要有空格 否则会引起错误
    @Parameters to be modified
    @parame :
    p12Path的地址
    p12PassWord的密码
    mpFilePath的地址
    archivePath 导出archive的地址
    archiveType 打包的类型
    exportIPAPath导出ipa的地址
    exportTemplateFile打包模板的地址
*/
global.logfile = path.resolve("./log/1.log");
const projectDirPath = `${solveUrl(
  "Desktop/DZG_Desktop/打包类/test/pushViewTest"
)}`;
const xcworkspaceName = "pushViewTest";
const ConfigurationBasePath = solveUrl("Desktop/DZG_Desktop/打包类/打包测试");

// const ipaPath = `${projectObject.exportIPAPath}/${projectObject.xcworkspaceName}.ipa`;
// const uploadType = "ios";
// const apiKey = "6P4V7XY6XL";
// const apiIssuer = "69a6de8f-7f3b-47e3-e053-5b8c7c11a4d1";
const template = `
platform :ios,'9.0'
target 'pushViewTest' do
{pod}
end
`;
let projectObject = {
  certName: "",
  copyMBFilePath: "",
  p12Password: "123456",
  archiveType: "release",
  mobileprovisionUUID: "",
  bundleID: "", //需要修改
  xcworkspaceName: "",
  podFilePath: `${projectDirPath}/podfile`,
  resourcePath: `${projectDirPath}/${xcworkspaceName}`,
  xcodeprojPath: `${projectDirPath}/${xcworkspaceName}.xcodeproj`,
  xcworkspacePath: `${projectDirPath}/${xcworkspaceName}.xcworkspace`,
  entitlementsPath: `${projectDirPath}/${xcworkspaceName}/${xcworkspaceName}.entitlements`,
  p12Path: [
    `${ConfigurationBasePath}/生产证书.p12`,
    `${ConfigurationBasePath}/推送证书.p12`,
  ],
  archivePath: `${solveUrl(
    "Desktop/DZG_Desktop/打包类/打包测试/pushViewTest.xcarchive"
  )}`,
  exportIPAPath: `${solveUrl("Desktop/DZG_Desktop/打包类/打包测试")}`,

  exportTemplateFile: `${ConfigurationBasePath}/v2connect_dev.plist`,
  mpFilePathTrim: `${ConfigurationBasePath}/pushTestMB.mobileprovision`,
  p8FilePath: `${ConfigurationBasePath}/AuthKey_6P4V7XY6XL.p8`,
};
projectObject.xcworkspaceName = xcworkspaceName;
projectObject.bundleID = appConfig.appID;

let uploadObj = {
  IPAPath: `${projectObject.exportIPAPath}/${projectObject.xcworkspaceName}.ipa`,
  uploadType: "ios",
  apiKey: "6P4V7XY6XL",
  apiIssuer: "69a6de8f-7f3b-47e3-e053-5b8c7c11a4d1",
};

task.on("clear", 0, async () => {
  try {
    log(`0   清空xcodebuild环境以及描述文件`);
    const xcodeCleanStr = `xcodebuild clean -workspace ${projectObject.xcworkspacePath} -scheme ${projectObject.xcworkspaceName} -configuration ${projectObject.archiveType}`;
    await runc(xcodeCleanStr)
    process.nextTick(() => task.next());
  } catch (error) {
    console.log(error);
    logBook(error);
  }
});

task.on("copyResource", 1, async () => {
  try {
    log(`1   拷贝资源文件`);
    await runc(
      `ruby copyResourceFile.rb ${projectObject.xcworkspaceName} ${projectObject.xcodeprojPath} ${projectObject.resourcePath}`
    )
    process.nextTick(() => task.next());
  } catch (error) {
    logBook(error);
  }
});

task.on("init-config", 2, async () => {
  try {
    log(`2   初始化config`);
    await setConfig(
      appConfig,
      projectObject.xcworkspaceName,
      projectObject.entitlementsPath,
      projectDirPath
    );
    process.nextTick(() => task.next());
  } catch (error) {
    logBook(error);
  }
});

task.on("setPodfile", 3, async () => {
  try {
    log(`3   初始化podfile并install`);
    function json2str(item) {
      let str = "";
      str += `  pod '${item.module}'`;
      if (item.version) {
        str += ` , ${item.version}`;
      }
      return str;
    }
    // 更新 pod组件
    // const list = componentList.map((item) => json2str(item.ios))
    // const content = template.replace(`{pod}`, list.join("\n"));
    // console.log(content);
    // 更新 pod组件

    //1 过滤不需要安装的
    const podListInstall = appConfig.component.filter((item) => item.install);
    // 返回pod 的列表
    const list = podListInstall.map((item) => json2str(item));
    // 组装完整的podfile
    const content = template.replace(`{pod}`, list.join("\n"));
    fse.writeFileSync(projectObject.podFilePath, Buffer.from(content));
    if (list.length > 0) {
      // const stdout = await runc("pod install --verbose");   暂时先不进行podInstall
    }
    process.nextTick(() => task.next());
  } catch (error) {
    logBook(error);
  }
});

// import-p12
task.on("import-p12", 4, async () => {
  try {
    log(`4  import-p12`);
    const p12PathArr = projectObject.p12Path;
    p12PathArr.forEach(async (item) => {
      // console.log("dasdas",item)
      const importKeyStr = `security import ${item} -k ${solveUrl(
        "Library/Keychains/login.keychain"
      )} -P ${projectObject.p12Password}`;
      await runc(importKeyStr)
    });
    process.nextTick(() => task.next());
  } catch (error) {
    logBook(error);
  }
});

// 获取描述文件的信息 并且复制一份UUID.mobileprovision到电脑下的指定位置
task.on("cp-provision", 5, async () => {
  try {
    log(`5   cp-provision`);
    mbInfo = await parse(projectObject.mpFilePathTrim);
    const cmd = `security find-identity -p codesigning ${solveUrl(
      "Library/Keychains/login.keychain-db"
    )}`;
    const db = await runc(cmd);
    console.log("==>  searchCertName db  ", db);
    const MatchingStr = db.match(
      /Matching\sidentities([\s\S]*)\d+\sidentities\sfound/
    );
    if (MatchingStr === null) {
      throw "没有找到任何key";
    }
    const MatchingArr = MatchingStr[0].split("\n");
    if (MatchingArr.length < 1) {
      throw "没有找到keychain数组";
    }
    const resultLineMatching = MatchingArr.find((item) =>
      item.includes(mbInfo.team.id)
    );
    const resultArrMatching = resultLineMatching.match(/"([^"]+)"/);
    if (resultArrMatching === null) {
      throw "没有匹配到证书";
    }
    const resultMat = resultArrMatching[1];
    const ValidStr = db.match(
      /Valid\sidentities\sonly([\s\S]*)\d+\svalid\sidentities\sfound/
    );
    if (ValidStr === null) {
      throw "没有找到任何可用的key";
    }
    const ValidArr = ValidStr[0].split("\n");
    if (ValidArr.length < 1) {
      throw "没有找到有用的keychain数组";
    }
    const resultLineValid = ValidArr.find((item) =>
      item.includes(mbInfo.team.id)
    );
    const resultArrValid = resultLineValid.match(/"([^"]+)"/);
    if (resultArrValid === null) {
      throw "没有匹配到有效证书";
    }
    const resultVal = resultArrMatching[1];
    if (resultMat == resultVal) {
      console.log("有效可直接使用");
    } else {
      console.log("无效证书");
      throw "无效证书";
    }
    projectObject.mobileprovisionUUID = mbInfo.uuid;
    projectObject.certName = resultVal;
    const UUIDFile = `Library/MobileDevice/Provisioning Profiles/${projectObject.mobileprovisionUUID}.mobileprovision`;
    copyMBFilePath = `${solveUrl(UUIDFile)}`;
    fse.copyFileSync(projectObject.mpFilePathTrim, copyMBFilePath);
    process.nextTick(() => task.next());
  } catch (error) {
    console.log("报错", error);
    logBook(error);
  }
});

// 导出archive文件到指定位置
task.on("mk-archive", 6, async () => {
  try {
    log(`6  mk-archive`);
    console.log("certName 24", projectObject.certName);
    const xcodeArchiveStr = `xcodebuild archive -workspace ${projectObject.xcworkspacePath} -scheme ${projectObject.xcworkspaceName} -archivePath ${projectObject.archivePath} -configuration ${projectObject.archiveType} CODE_SIGN_IDENTITY="${projectObject.certName}" PROVISIONING_PROFILE=${projectObject.mobileprovisionUUID} PRODUCT_BUNDLE_IDENTIFIER="${projectObject.bundleID}"`;
    await runc(xcodeArchiveStr);
    process.nextTick(() => task.next());
  } catch (error) {
    logBook(error);
  }
});

// 导出ipa文件到指定位置
task.on("exp-ipa", 7, async () => {
  try {
    log(`exp-ipa 7 `);
    const config = await ptools.parse(projectObject.exportTemplateFile);
    config.provisioningProfiles[projectObject.bundleID] =
      projectObject.mobileprovisionUUID; // 1f9156d9-bef4-48c7-9954-a6e888c6bc0b
    const saveRes = await ptools.save(projectObject.exportTemplateFile, config);
    const exportIPAFileStr = `xcodebuild  -exportArchive -archivePath ${projectObject.archivePath} -exportPath ${projectObject.exportIPAPath} -exportOptionsPlist ${projectObject.exportTemplateFile}  -allowProvisioningUpdates`;
    await runc(exportIPAFileStr);
    if (fse.existsSync(projectObject.copyMBFilePath)) {
      fse.unlinkSync(projectObject.copyMBFilePath);
    }
    // process.nextTick(() => task.next());
  } catch (error) {
    logBook(error);
    console.log("errorDZG", error);
  }
});

task.on("upload-ipa", 8, async () => {
  try {
    const private_keysFolder = solveUrl(".private_keys");

    if (!fse.existsSync(private_keysFolder)) {
      fse.mkdirSync(private_keysFolder);
    }
    fse.copyFileSync(
      projectObject.p8FilePath,
      `${private_keysFolder}/AuthKey_6P4V7XY6XL.p8`
    );
    const uploadIPAStr = `xcrun altool --upload-app -f ${uploadObj.IPAPath} -t ${uploadObj.uploadType} --apiKey ${uploadObj.apiKey} --apiIssuer ${uploadObj.apiIssuer} --upload`;
    console.log("Uploading.....");
    await runc(uploadIPAStr);
    console.log("Upload Succeeded!!");
  } catch (error) {
    logBook(error);
  }
});

// 开始任务
task.start();
