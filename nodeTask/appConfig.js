module.exports = {
    appName: "项目名称",
    appID:"com.mthd.cocoono3",
    version:"1.0.3",
    buildVersion:"2",
    appScheme:"appScheme", /*使用浏览器通过Scheme打开当前应用,Scheme为唤醒地址*/
    UIBackgroundModes:[], /** 后台挂起模式 可不选  */
    isHTTPS:true,
    component: [
      {
        module: "baseModule",
        version: "",
        install: false,
        permission:{
          camera:"使用相机进行拍照上传功能及二维码扫描功能",
          album:"使用相册进行头像上传功能",
          photo:"使用添加图片到相册的功能进行添加图片"
        }
      },
      {
        module: "SVGAModule",
        version: "1.00",
        install: false,
      },
      {
        module: "QRViewModule",
        version: "1.29",
        install: false,
        permission:{
          camera:"使用相机进行拍照上传功能及二维码扫描功能",
        }
      },
      {
        module: "BlueModule",
        version: "1.29",
        install: false,
        permission:{
          bluetooth:"使用蓝牙进行蓝牙操作功能"
        }
      },
      {
        module: "AgoraHippyModule",
        version: "1.29",
        install: false,
        permission:{
          microphone:"使用麦克风进行语音直播"
        }
      },
      {
        module: "weChatModule",
        version: "1.0.1",
        install: false,
        weChatID:""
      }
    ],
  
    
  };
  