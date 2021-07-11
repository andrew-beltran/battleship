const {app, BrowserWindow} = require('electron')
    const url = require("url");
    const path = require("path");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 980,
        height: 550,
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/battleship/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()
      mainWindow.removeMenu()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })