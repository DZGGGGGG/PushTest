const KeyChain = require('node-osx-keychain')
const Thread = require("./utils/Thread");
const parse = require("mobileprovision-parse");
// const fs = require("fs");
const path = require('path')
const thread = new Thread();


//  需要修改的参数
//  p12Path的地址
//  p12PassWord的密码
//  mpFilePath的地址
//  archivePath 导出archive的地址
//  archiveType 打包的类型
//  exportIPAPath导出ipa的地址
//  exportTemplateFile打包模板的地址
async function importP12(p12Path,p12PassWord){
  /**  导入p12文件到钥匙串 p12Path(p12存在的地址) p12PassWord(p12的密码) mpFilePath(描述文件的当前地址)*/
  const importKeyStr = `security import ${p12Path} -k ~/Library/Keychains/login.keychain -P ${p12PassWord}`;
  let result = await thread.runExec(importKeyStr);
  console.log(result);
}
async function searchCertName(teamID){
  const db = await thread.runExec(`security find-identity -p codesigning ~/Library/Keychains/login.keychain-db`)
  // 拿到已安装的key
  const MatchingStr  = db.match(/Matching\sidentities([\s\S]*)\d+\sidentities\sfound/)
  if (MatchingStr === null){
    throw '没有找到任何key'
  }
  const MatchingArr = MatchingStr[0].split('\n')
  if (MatchingArr.length < 1){
    throw '没有找到keychain数组'
  }
  const resultLineMatching = MatchingArr.find(item => item.includes(teamID))
  // console.log(resultLineMatching)
  const resultArrMatching = resultLineMatching.match(/"([^"]+)"/)
  if (resultArrMatching === null){
    throw '没有匹配到证书'
  }
  const resultMat = resultArrMatching[1];
  // console.log('***************************')
  // 检测是否key是否有效
  const ValidStr  = db.match(/Valid\sidentities\sonly([\s\S]*)\d+\svalid\sidentities\sfound/)
  if (ValidStr === null){
    throw '没有找到任何可用的key'
  }
  // console.log(ValidStr)
  const ValidArr = ValidStr[0].split('\n')
  if (ValidArr.length < 1){
    throw '没有找到有用的keychain数组'
  }
  const resultLineValid = ValidArr.find(item => item.includes(teamID))
  // console.log(resultLineValid)
  const resultArrValid = resultLineValid.match(/"([^"]+)"/)
  if (resultArrValid === null){
    throw '没有匹配到有效证书'
  }
  const resultVal = resultArrMatching[1];
  if (resultMat == resultVal){
    console.log("有效可直接使用");
    return resultVal;
  }else{
    console.log("无效证书")
    throw '没有匹配到有效证书'
  }
}
async function clearBuild(copyMBFilePath,xcworkspaceName,archiveType){
    //删除UUID.mobileprovision文件
    
    //清空项目 
    const xcodeCleanStr = `xcodebuild clean -workspace ../${xcworkspaceName}.xcworkspace -scheme ${xcworkspaceName} -configuration ${archiveType}`;
    outPut = await thread.runExec(xcodeCleanStr);
    console.log("清空打包环境",outPut)
    outPut = await thread.runExec(`rm -f ${copyMBFilePath}`);
    console.log("删除拷贝后的mobileprovision成功")
}
async function runBuildIPA() {
  let outPut;
  outPut = await importP12("~/Desktop/打包测试/生产证书.p12","123456");
  console.log(outPut)
  const mpFilePath = "~/Desktop/打包测试/cocono3Test.mobileprovision";
  /**  拷贝文件至指定位置，并以UUID命名 获取描述文件中UUID mobileprovisionUUID  */
  const mbInfo = await parse(mpFilePath);
  const certName = await searchCertName(mbInfo.team.id)
  console.log(certName)
  const mobileprovisionUUID = mbInfo.uuid;
  const copyMBFilePath = `~/Library/MobileDevice/Provisioning\\ Profiles/509ca890-7cf3-48a0-b33d-31f4ea09dd7d.mobileprovision`
  const copyMBFileStr = `cp ${mpFilePath} ${copyMBFilePath}`; //复制描述文件到本机指定地址
  // const copyMBFileStr = `cp ${mpFilePath} ~/Library/MobileDevice/Provisioning\\ Profiles/${mobileprovisionUUID}.mobileprovision`; //复制描述文件到本机指定地址
  outPut = await thread.runExec(copyMBFileStr);
  console.log(outPut)
  /**  读取mobileprovision文件内容并取出 certName（证书的名称）,bundleID，archiveType（打什么类型的包），archivePath（导出的archive地址），xcworkspaceName（项目名称）  */
  const xcworkspaceName = "pushViewTest";
  const archivePath = "~/Desktop/打包测试/pushViewTest.xcarchive";
  const archiveType = "release";
  const bundleID = "com.mthd.cocoono3";
  const xcodeArchiveStr = `xcodebuild archive -workspace ../${xcworkspaceName}.xcworkspace -scheme ${xcworkspaceName} -archivePath ${archivePath} -configuration ${archiveType} CODE_SIGN_IDENTITY="${certName}" PROVISIONING_PROFILE=${mobileprovisionUUID} PRODUCT_BUNDLE_IDENTIFIER="${bundleID}"`;
  /**  导出ipa  需要exportIPAPath（导出地址） exportTemplateFile（模板文件） */
  outPut = await thread.runExec(xcodeArchiveStr);
  console.log(outPut)

  const exportIPAPath = "~/Desktop/打包测试";
  const exportTemplateFile =
    "~/Desktop/打包测试/v2connect_dev.plist";
  const exportIPAFileStr = `xcodebuild -exportArchive -archivePath ${archivePath} -exportPath ${exportIPAPath} -exportOptionsPlist ${exportTemplateFile}  -allowProvisioningUpdates`;
  outPut = await thread.runExec(exportIPAFileStr);
  console.log(outPut)

  outPut = await clearBuild(copyMBFilePath,xcworkspaceName,archiveType);
}
module.exports = runBuildIPA;
