const fse = require("fs-extra");
const thread = require("./utils/Thread");

const template = `
platform :ios,'9.0'
target 'pushViewTest' do
{pod}
end
`;

function json2str(item) {
  let str = "";
  str += `  pod '${item.module}'`;
  if (item.version) {
    str += ` , ${item.version}`;
  }
  return str;
}

async function setPodfile(podList) {
  // 1 过滤不需要安装的
  const podListInstall = podList.filter((item) => item.install);
  // 返回pod 的列表
  const list = podListInstall.map((item) => json2str(item));
  // 组装完整的podfile
  const content = template.replace(`{pod}`, list.join("\n"));
  console.log(content);
  // const pod = arr.join(`\n`)
  // const content = template.replace(`{pod}`, pod)
  fse.writeFileSync("../podfile", Buffer.from(content));
  if (list.length > 0) {
    const stdout = await thread.runExec("pod install --verbose");
    await thread.runExec("echo " + stdout);
  }
}

module.exports = setPodfile;
