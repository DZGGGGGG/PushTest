const ptools = require("./utils/PlistTools");

const ExtraFields = {
  CFBundleVersion : "",
  CFBundleName : "",
  CFBundleShortVersionString : "",
  CFBundleIdentifier : "",
  WhiteList: [],
  CFBundleURLTypes: [],
  UIBackgroundModes :[],
  NSAppTransportSecurity :[],
  permissionString: {
    camera: "NSCameraUsageDescription",
    album: "NSPhotoLibraryUsageDescription",
    bluetooth: "NSBluetoothPeripheralUsageDescription",
    bluetoothiOS13: "NSBluetoothAlwaysUsageDescription",
    microphone: "NSMicrophoneUsageDescription",
    photo:"NSPhotoLibraryAddUsageDescription",
  },
};

async function configurationModify(appConfig) {
  const permissionArr = [];
  const hash = {};
  const config = await ptools.parse("./Template/defaultInfo.plist");
  const podListInstall = appConfig.component.filter((item) => item.install);
  ExtraFields.UIBackgroundModes = appConfig.UIBackgroundModes;
  ExtraFields.CFBundleIdentifier = appConfig.appID
  ExtraFields.CFBundleName = appConfig.appName
  ExtraFields.CFBundleShortVersionString = appConfig.version
  ExtraFields.CFBundleVersion = appConfig.buildVersion ? "1" : appConfig.buildVersion
  if (appConfig.appScheme) {
    ExtraFields.CFBundleURLTypes.push({
      CFBundleTypeRole: "Editor",
      CFBundleURLName: appConfig.appScheme,
      CFBundleURLSchemes: [appConfig.appScheme],
    });
  }
  if (appConfig.isHTTPS){
    ExtraFields.NSAppTransportSecurity = {NSAllowsArbitraryLoads :true}
  }
  podListInstall.map((item) => {
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
    if (item.weChatID) {
      ExtraFields.WhiteList.push("wechat", "weixin", "weixinULAPI");
      ExtraFields.CFBundleURLTypes.push({
        CFBundleTypeRole: "Editor",
        CFBundleURLName: "weixin",
        CFBundleURLSchemes: [item.weChatID],
      });
    }
  });
  const resultArr = permissionArr.reduce(function (item, next) {
    hash[next.permissionKey]
      ? ""
      : (hash[next.permissionKey] = true && item.push(next));
    return item;
  }, []);


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
  const saveRes = await ptools.save("../pushViewTest/Info.plist", config);
  console.log(saveRes)
}

module.exports = configurationModify;
