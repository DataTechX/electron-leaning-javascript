const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    maxHeight: 430,
    maxWidth: 800,
    minHeight: 430,
    minWidth: 800,
    titleBarStyle: 'hidden',
    width: 800, // ความกว้าง 800px
    height: 430, // ความสูง 430px
    resizable: false, // ปิดใช้งานการปรับขนาด
    transparent: true, // ใช้เป็นสีขาว
    frame: false, // ถอดกรอบข้างทั้ง
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true, // เปิดใช้งาน node ใน electron
        contextIsolation: false, // เปิดใช้งาน contextIsolation ใน electron
        enableRemoteModule: true, // เปิดใช้งาน enableRemoteModule ใน electron
    }
  });

  // แล้วทำการโหลด index.html ของแอป
  win.loadFile('html/index.html');

    // ipcMain
    ipc.on('closeX', () => { // รับข้อมูลจาก index.html
        win.close(); // ปิดโปรแกรม
    })
}

app.whenReady().then(createWindow); // เมื่อแอปถูกเริ่มต้นแล้วจะทำการสร้างหน้าต่างขึ้น

app.on('window-all-closed', () => { // เมื่อหน้าต่างทั้งหมดถูกปิดแล้วจะทำการปิดแอป
    if (process.platform !== 'darwin') {
        app.quit();
    }
})


app.on('activate', () => { // เมื่อแอปถูกเริ่มต้นแล้วจะทำการสร้างหน้าต่างขึ้น
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})