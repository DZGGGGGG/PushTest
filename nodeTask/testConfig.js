
const componentList = [
  {
    name: 'progress',
    type: 'component',
    ios: {
      module: 'ProgressModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'ProgressModule',
      version: '1.0.1',
    }
  },
  {
    name: 'qrcode',
    type: 'component',
    ios: {
      module: 'QrcodeModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'QrcodeModule',
      version: '1.0.1',
    }
  },
  {
    name: 'svga',
    type: 'component',
    ios: {
      module: 'SvgaModule',
      version: '1.0.1',
    },
    android: {
      module: 'SvgaModule',
      version: '1.0.1',
    }
  },
  {
    name: 'agorartc',
    type: 'module',
    ios: {
      module: 'AgoraRtcModule',
      version: '1.0.1',
    },
    android: {
      module: 'AgoraRtcModule',
      version: '1.0.1',
    }
  },
  {
    name: 'aliOss',
    type: 'module',
    ios: {
      module: 'AliOssModule',
      version: '1.0.1',
    },
    android: {
      module: 'AliOssModule',
      version: '1.0.1',
    }
  },
  {
    name: 'alipay',
    type: 'module',
    ios: {
      module: 'AlipayModule',
      version: '1.0.1',
    },
    android: {
      module: 'AlipayModule',
      version: '1.0.1',
    }
  },
  {
    name: 'bluetooth',
    type: 'module',
    ios: {
      module: 'BluetoothModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'BluetoothModule',
      version: '1.0.1',
    }
  },
  {
    name: 'broadcast',
    type: 'module',
    ios: {
      module: 'BroadcasthModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'BroadcasthModule',
      version: '1.0.1',
    }
  },
  {
    name: 'dataBase',
    type: 'module',
    ios: {
      module: 'DataBaseModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'DataBaseModule',
      version: '1.0.1',
    }
  },
  {
    name: 'dialog',
    type: 'module',
    ios: {
      module: 'DialogModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'DialogModule',
      version: '1.0.1',
    }
  },
  {
    name: 'download',
    type: 'module',
    ios: {
      module: 'DownloadModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'DownloadModule',
      version: '1.0.1',
    }
  },
  {
    name: 'download',
    type: 'module',
    ios: {
      module: 'DownloadModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'DownloadModule',
      version: '1.0.1',
    }
  },
  {
    name: 'ios',
    type: 'module',
    ios: {
      module: 'IOSModule',
      version: '1.0.1',
    },
    android: null,
  },
  {
    name: 'jpush',
    type: 'module',
    ios: {
      module: 'JpushModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'JpushModule',
      version: '1.0.1',
    }
  },
  {
    name: 'media',
    type: 'module',
    ios: {
      module: 'MediaModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'MediaModule',
      version: '1.0.1',
    }
  },
  {
    name: 'mqtt',
    type: 'module',
    ios: {
      module: 'MqttModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'MqttModule',
      version: '1.0.1',
    }
  },
  {
    name: 'music',
    type: 'module',
    ios: {
      module: 'MusicModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'MusicModule',
      version: '1.0.1',
    }
  },
  {
    name: 'navigator',
    type: 'module',
    ios: {
      module: 'NavigatorModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'NavigatorModule',
      version: '1.0.1',
    }
  },
  {
    name: 'system',
    type: 'module',
    ios: {
      module: 'SystemModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'SystemModule',
      version: '1.0.1',
    }
  },
  {
    name: 'wechat',
    type: 'module',
    ios: {
      module: 'WechatModule',
      permission: 'defailt permission',
      version: '1.0.1',
    },
    android: {
      module: 'WechatModule',
      version: '1.0.1',
    }
  },
]
const sinature = {
  android: {
    debug: {
      "fileName": "Tianli.keystore",
      "storePassword": "123456",
      "keyAlias": "tianli",
      "keyPassword": "tianliapp123",
    },
    release: {
      "fileName": "Tianli.keystore",
      "storePassword": "123456",
      "keyAlias": "tianli",
      "keyPassword": "tianliapp123",
    }
  },
  ios: {
    debug: {
      "p12": "xxxxxxxx",
      "password": "",
      "mobileprovision": "xxxxxx",
    },
    release: {
      "p12": "xxxxxxxx",
      "password": "",
      "mobileprovision": "xxxxxx",
    }
  }
}