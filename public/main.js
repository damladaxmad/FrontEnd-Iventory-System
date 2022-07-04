const { app, BrowserWindow } = require('electron')
// const server = require("../././Inventory-Management-System/server")
const path = require('path')
const isDev = require('electron-is-dev')

// const server = require(path.join(process.resourcesPath, "Inventory-Management-System/server.js"))

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height: 920,
    // width: "100%",
    // height: "100%",
    show: false,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "../Inventory-Management-System/server.js"),
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  win.maximize()
  // win.removeMenu(true)

}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
