const { app, BrowserWindow, ipcMain } = require('electron')
const ipc = ipcMain;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1086,
    height: 674,
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    }
  })

  win.loadFile('Frontend/inicio.html')

  ipc.on("closeApp", () => {
    win.close();
  });
}


app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})