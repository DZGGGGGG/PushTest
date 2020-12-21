var fs = require("fs");
const { resolve } = require("path");
// const infoPlistPath = process.cwd() + "/pushViewTest/Info.plist";
const infoPlistPath = process.cwd() + "/defalutInfo1.plist";
const realPlistPath = process.cwd() + "/pushViewTest/Info.plist";
const { exec } = require("child_process");
const { type } = require("os");
const { get } = require("http");

var configJson;
var statementList = [];
var infoPlistFile = "";
var stringStatementList = [];
// 每次读取配置文件时 都将copy原始数据到 defalutInfo1.plist文件;
function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}
copyFile('./defalutInfo.plist', './defalutInfo1.plist')


fs.readFile(infoPlistPath, "utf8", function (err, data) {
  if (err) console.log(err);
  infoPlistFile = data;
});
fs.readFile("config.json", "utf8", function (err, data) {
  if (err) console.log(err);
  //var test1 = JSON.parse(data); //读取的值
  configJson = JSON.parse(data);
  for (let key in configJson) {
    value = configJson[key];
    // if (typeof value == "string") {
    //   statementList.push(getAddStatement(key, "string", value, false, ""));
    // } else if (Array.isArray(value)) {
    //   arrayStatement(key, value, "array");
    // }
    if (key === "stringConfig") {
      stringStatement(value[0], "string");
    } else if (key === "arrayConfig") {
      // arrayStatement(value[0], "array");
    } else if (key === "dictConfig") {
      // dictStatement(value[0], "dict");
    }
  }
  stringStatementList.forEach((item) => {
    executeStatement(item);
  });
});
function stringStatement(listvalue, fatherType) {
  for (let key in listvalue) {
    value = listvalue[key];
    stringStatementList.push(getStringAddStateMent(key, "string", value));
  }
}
function getStringAddStateMent(key, type, value) {
  var add_statement;
  if (infoPlistFile.indexOf(key) != -1) {
    add_statement =
      "/usr/libexec/PlistBuddy -c 'Set :" +
      key +
      " " +
      value +
      "' " +
      infoPlistPath;
  } else {
    add_statement =
      "/usr/libexec/PlistBuddy -c 'Add :" +
      key +
      " " +
      type +
      " " +
      value +
      "' " +
      infoPlistPath;
  }
  return add_statement;
}
function dictStatement(listvalue, fatherType) {
  for (let key in listvalue) {
    value = listvalue[key][0];
    var index = 0;
    for (let childKey in value) {
      childValue = value[childKey];
      // console.log("childKey",childKey)
      // console.log("childValue",childValue)
      ///usr/libexec/PlistBuddy -c 'Add :aaa:1:key string value' "
      if (Array.isArray(childValue)) {
        var statement =
          "/usr/libexec/PlistBuddy -c 'Add :" +
          key +
          ":" +
          childKey +
          " array' -c 'Add :" +
          key +
          ":" +
          childKey +
          ":0 string " +
          childValue[0] +
          "' " +
          infoPlistPath;
        //console.log(statement);
        statementList.push(statement);
      } else {
        var statement =
          "/usr/libexec/PlistBuddy -c 'Add :" +
          key +
          ":" +
          childKey +
          " string " +
          childValue +
          "' " +
          infoPlistPath;
        statementList.push(statement);
      }
      // statementList.push(
      //   getAddStatement(key, "string", value[index], "array", "")
      // );
    }
    index++;
  }
}
function arrayStatement(listvalue, fatherType) {
  for (let key in listvalue) {
    value = listvalue[key];
    for (let index in value) {
      statementList.push(
        getAddStatement(key, "string", value[index], "array", "")
      );
    }
    // console.log("listvalue",listvalue)
    // console.log("value",value)
    // console.log("key",key)
    // if(fatherType === "array"){
    // }
    // if (typeof value == "string") {
    //   statementList.push(
    //     getAddStatement(listkey, "string", value, fatherType, "")
    //   );
    // } else if (typeof value == "object" || !Array.isArray(value)) {
    //   statementList.push(
    //     getAddStatement(listkey, "dict", value, fatherType, listkey)
    //   );
    //   var type;
    //   if (typeof value == "array") type = "array";
    //   if (typeof value == "dict") type = "dict";
    //   dictStatement(value, type);
    // } else if (Array.isArray(value)) {
    //   statementList.push(
    //     getAddStatement(listkey, "array", value, fatherType, "")
    //   );
    //   var type;
    //   if (typeof value == "array") type = "array";
    //   if (typeof value == "dict") type = "dict";
    //   dictStatement(value, type);
    // }
  }
}
function getAddStatement(key, type, value, fatherType, dictName) {
  var add_statement;
  if (fatherType === "string") {
    add_statement =
      "/usr/libexec/PlistBuddy -c 'Add :" +
      key +
      " " +
      type +
      " " +
      value +
      "' " +
      infoPlistPath;
    return add_statement;
  } else if (fatherType === "array") {
    add_statement =
      "/usr/libexec/PlistBuddy -c 'Add :" +
      key +
      ": " +
      type +
      " " +
      value +
      "' " +
      infoPlistPath;
    return add_statement;
  } else if (fatherType === "dict") {
    add_statement =
      "/usr/libexec/PlistBuddy -c 'Add :" +
      dictName +
      ":" +
      key +
      " " +
      type +
      " " +
      value +
      "' " +
      infoPlistPath;
    return add_statement;
  }
}
function getSetStatement(key, value) {
  var set_statement =
    "/usr/libexec/PlistBuddy -c 'Set :" +
    key +
    " " +
    value +
    "' " +
    infoPlistPath;
  return set_statement;
}
function executeStatement(system) {
  exec(system, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
