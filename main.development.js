import { app, BrowserWindow, Menu, shell, crashReporter } from 'electron';
const applicationHelper = require('./backend/ApplicationHelper');
const debug = require('debug')(__filename.split('/').pop());
const shortcutHelper = require('./backend/ShortcutHelper');
const clipboardEventEmitter = require('./backend/ClipboardEventEmitter');
const windowHelper = require('./backend/WindowHelper');
const userStatusHelper = require('./backend/UserStatusHelper');

let menu;
let template;
let mainWindow = null;

crashReporter.start({
  productName: 'cevirgec',
  companyName: 'KodGemisi',
  submitURL: 'https://your-domain.com/url-to-submit',//TODO
  autoSubmit: true
});

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {
        console.error(e);
      } // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  try {
    applicationHelper.initializeApp();

    shortcutHelper.registerGlobalShortcuts();

    clipboardEventEmitter.initialize();
    clipboardEventEmitter.onChange(applicationHelper.clipboardChangeHandler);
  } catch (e) {
    console.error(e);
  }

});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  shortcutHelper.unregisterAll();
  clipboardEventEmitter.stop();

  // if (userStatusHelper.isAuthenticated()) {
  //   sync.stop(); //stop syncing in every 5 minutes
  //   sync.syncSources(userStatus); //one time sync before quit
  // }
});

app.on('window-all-closed', () => {
  // if 'window-all-closed' event is not handeled, main process is killed when all windows are closed.
});
