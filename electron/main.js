// electron/main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, screen,desktopCapturer  ,globalShortcut ,Notification  } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV


// 创建浏览器窗口
function createWindow() {

  const mainWindow = new BrowserWindow({
    title: 'crescent',
    width: screen.getPrimaryDisplay().workAreaSize.width / 2, //宽
    height: screen.getPrimaryDisplay().workAreaSize.height / 1.5, //高
    titleBarStyle:"hiddenInset",
    icon:path.join(__dirname,'@/assets/crescent.ico'),
    // show:false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  //加载页面
  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:8887'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  // 打开开发工具
  if (NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
  }
}



  // 检查快捷键是否注册成功
  // console.log(globalShortcut.isRegistered('CommandOrControl+X'))



function showNotification () {
  new Notification({ title: '我是你的父亲', body: '欢迎使用' }).show()
}


//相当远 js的windows.ready()生命周期
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


    // 注册一个'CommandOrControl+X' 快捷键监听器
    // const ret = globalShortcut.register('CommandOrControl+X', () => {
    //   console.log('CommandOrControl+X is pressed')
    // })
  
}).then(showNotification)

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


