const ptools = require("./utils/PlistTools");
const runc = require("./utils/runc");

const ExtraFields = {
  CFBundleVersion: "",
  CFBundleName: "",
  CFBundleShortVersionString: "",
  CFBundleIdentifier: "",
  WhiteList: [],
  CFBundleURLTypes: [],
  UIBackgroundModes: [],
  NSAppTransportSecurity: [],
  permissionString: {
    camera: "NSCameraUsageDescription",
    album: "NSPhotoLibraryUsageDescription",
    bluetooth: "NSBluetoothPeripheralUsageDescription",
    bluetoothiOS13: "NSBluetoothAlwaysUsageDescription",
    microphone: "NSMicrophoneUsageDescription",
    photo: "NSPhotoLibraryAddUsageDescription",
  },
};
async function configurationModify(
  appConfig,
  xcworkspaceName,
  entitlementsPath,
  projectDirPath
) {
  const permissionArr = [];
  const hash = {};
  const config = await ptools.parse("./Template/defaultInfo.plist");
  const resultArr = [];
  const podListInstall = appConfig.component.filter((item) => item.install); //权限列表置换成ios的版本

  if (appConfig.appID.trim() == "" || appConfig.appID === null) {
    throw "appID不能为空";
  }
  if (appConfig.appName.trim() == "" || appConfig.appName === null) {
    throw "appID不能为空";
  }
  if (appConfig.version.trim() == "" || appConfig.version === null) {
    throw "appID不能为空";
  }
  if (appConfig.buildVersion.trim() == "" || appConfig.buildVersion === null) {
    throw "appID不能为空";
  }
  ExtraFields.UIBackgroundModes = appConfig.UIBackgroundModes;
  ExtraFields.CFBundleIdentifier = appConfig.appID;
  ExtraFields.CFBundleName = appConfig.appName;
  ExtraFields.CFBundleShortVersionString = appConfig.version;
  ExtraFields.CFBundleVersion = appConfig.buildVersion;
  if (appConfig.appScheme) {
    ExtraFields.CFBundleURLTypes.push({
      CFBundleTypeRole: "Editor",
      CFBundleURLName: appConfig.appScheme,
      CFBundleURLSchemes: [appConfig.appScheme],
    });
  }
  if (appConfig.isHTTPS) {
    ExtraFields.NSAppTransportSecurity = { NSAllowsArbitraryLoads: true };
  }
  podListInstall.map(async (item) => {
    //const item = itemPlat.ios
    if (item.permission) {
      Object.keys(item.permission).forEach((key) => {
        permissionArr.push({
          permissionKey: ExtraFields.permissionString[key],
          permissionDesc: item.permission[key],
        });
        if (key == "bluetooth")
          permissionArr.push({
            permissionKey: ExtraFields.permissionString["bluetoothiOS13"],
            permissionDesc: item.permission[key],
          });
      });
    }
    if (item.module == "WechatModule") {
      ExtraFields.WhiteList.push("wechat", "weixin", "weixinULAPI");
    }
    if (item.module == "JpushModule") {
      const config = await ptools.parse(entitlementsPath);
      config["aps-environment"] = "development";
      // delete config["aps-environment"]
      const saveRes = await ptools.save(entitlementsPath, config);
      console.log(saveRes);
      console.log("执行添加push文件的操作");
    }
  });
  if (permissionArr.length > 0) {
    resultArr = permissionArr.reduce(function (item, next) {
      hash[next.permissionKey]
        ? ""
        : (hash[next.permissionKey] = true && item.push(next));
      return item;
    }, []);
  }
  config.CFBundleName = ExtraFields.CFBundleName;
  config.CFBundleVersion = ExtraFields.CFBundleVersion;
  config.CFBundleIdentifier = ExtraFields.CFBundleIdentifier;
  config.CFBundleShortVersionString = ExtraFields.CFBundleShortVersionString;
  if (ExtraFields.WhiteList.length > 0)
    config.LSApplicationQueriesSchemes = ExtraFields.WhiteList;
  resultArr.forEach((item) => {
    config[item.permissionKey] = item.permissionDesc;
  });
  if (ExtraFields.CFBundleURLTypes.length > 0)
    config.CFBundleURLTypes = ExtraFields.CFBundleURLTypes;
  if (ExtraFields.UIBackgroundModes.length > 0)
    config.UIBackgroundModes = ExtraFields.UIBackgroundModes;
  if (ExtraFields.NSAppTransportSecurity.length > 0)
    config.NSAppTransportSecurity = ExtraFields.NSAppTransportSecurity;
  const saveRes = await ptools.save(
    `${projectDirPath}/${xcworkspaceName}/info.plist`,
    config
  );
  console.log(saveRes);
}

module.exports = configurationModify;
