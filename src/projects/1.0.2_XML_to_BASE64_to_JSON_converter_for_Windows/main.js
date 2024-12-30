const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const fs = require('fs');
const path = require('path');
const Store = require('electron-store');

// create new store for the our app
const store = new Store();

// create dirname for the save button
let lastDirectory = store.get('lastDirectory') || app.getPath('desktop');

// create app
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 327,
        height: 560,
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // devTools: false
        },
    });
    mainWindow.loadFile('index.html');
}

app.on('ready', () => {

    createWindow();

    // check license key in the store
    const storedKey = store.get('key');
    if (storedKey) {
        // send to render process
        mainWindow.webContents.send('stored-key', storedKey);
    }

    // some safety
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.alt) {
            event.preventDefault();
        }
    });

    // mainWindow.webContents.on('before-input-event', (event, input) => {
    //     if (input.control && input.shift && input.key.toLowerCase() === 'i') {
    //         event.preventDefault();
    //     }
    // });

    if (app.commandLine.hasSwitch('inspect')) {
        console.error('Running with --inspect is not allowed.');
        app.quit();
    }
});

// remove hot keys when we close app
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// main button logic 
ipcMain.on('convert-files', (event) => {

    // open dialog window
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'XML Files', extensions: ['xml'] }]
    }).then(result => {

        // check our key
        mainWindow.webContents.send('what-about-keys');

        // save key to the store
        ipcMain.on('save-key', (event, key) => {
            store.set('key', key);
        });

        let filePaths = []

        // if key is active after check we take a paths and send them to the main function
        ipcMain.on('key-is-active', () => {
            filePaths = []
            filePaths = result.filePaths;
            if (!result.canceled) {
                mainWindow.webContents.send('process-files', filePaths);
            }
        })

    })
        .catch(error => console.log(error));
})

// we should save the file to json
ipcMain.on('save-file', (event, textarea) => {
    dialog.showSaveDialog({
        title: 'Save JSON file',
        defaultPath: path.join(lastDirectory, 'data.json'),
        filters: [
            { name: 'JSON Files', extensions: ['json'] }
        ],
    }).then(result => {
        if (!result.canceled) {
            fs.writeFile(result.filePath, textarea, (err) => {
                if (err) {
                    event.reply('save-file-response', { success: false, error: err });
                } else {
                    // save last dirname to the store
                    lastDirectory = result.filePath
                    store.set('lastDirectory', lastDirectory);
                    event.reply('save-file-response', { success: true, filePath: result.filePath });
                }
            });
        }
    }).catch(err => {
        console.log(err);
    });
});