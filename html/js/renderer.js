const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const closeApp = document.getElementById('closeApp') // รับข้อมูลจาก index.html
closeApp.addEventListener('click', () => { // รับข้อมูลจาก index.html
    ipc.send('closeX') // ส่งข้อมูลไปยัง app.js
})