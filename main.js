const {app, BrowserWindow} = require('electron');
const electronReload = require('electron-reload');
const path = require('path');

let win;
const createView = () =>{
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname,"preload.js")
        }
    })
    electronReload(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`) 
    });
    win.loadFile('index.html');
}

app.whenReady().then(createView);
app.on('window-all-closed',()=>{
    if(process.platform === "darwin") app.quit();
})
app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0) createView();
})