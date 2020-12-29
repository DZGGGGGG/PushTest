module.exports = {
    appName: "自动打包测试",
    appID:"com.mthd.shop123",
    version:"1.3.9",
    buildVersion:"5",
    appScheme:"appScheme", /*使用浏览器通过Scheme打开当前应用,Scheme为唤醒地址*/
    UIBackgroundModes:[], /** 后台挂起模式 可不选  */

// 	<array>
//   <string>audio</string> //此个选项包含四种场景，分别是：音频的播放，录音，AirPlay 及画中画的视频播放。
//   <string>bluetooth-central</string> // 此选项与 External Accessory communication 类似，只是此选项无需限制 MFi 外设，而需要的是 Bluetooth LE 设备
//   <string>bluetooth-peripheral</string> // 此选项是指 iOS 设备作为一个蓝牙外设连接时，对应的应用可以后台运行，但是使用此模式需要用户进行授权认证
//   <string>external-accessory</string>// 此选项提供给一些 MFi 外设通过蓝牙，或者 Lightning 接头等方式与 iOS 设备连接，从而可在外设发送消息时，唤醒已经被挂起的应用
//   <string>fetch</string> // iOS 7 新增加的一个选项，用于即使在后台，也需要频繁更新数据的应用。
//   <string>location</string> // 一般用于导航应用中，开启此选项后，应用退到后台，还可以得到系统的定位更新，从而使得应用可以根据定位的变化做出不同的反应。
//   <string>processing</string> // 此为 iOS 7 新增加的特性，用于在后台下载或者上传大文件
//   <string>remote-notification</string> // iOS 7 新增加的一个选项，是一种静默推送，它有别于一般的推送，应用收到此类推送后，不会有任何的界面提示，而当应用退出或者挂起时收到此类推送，iOS 也会启动或者唤醒对应的应用
//   <string>voip</string> //将应用挂起到后台 保持相关服务的网络链接，用以收到来电事件和其他数据 
// </array>
    isHTTPS:true,
    // 功能选择以及描述
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
        module: "JpushModule",
        version: "1.00",
        install: true,
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
  