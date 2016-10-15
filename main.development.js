import { app } from 'electron';
const applicationHelper = require('./backend/ApplicationHelper');
const debug = require('debug')(__filename.split('/').pop());

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


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
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  try {
    applicationHelper.initializeApp();
  } catch (e) {
    debug(e);
  }
  // let userStatus = userStatusHelper.getUserStatus();
  //
  // if (userStatusHelper.getUserStatus().loggedIn) {
  //   shortcutHelper.registerGlobalShortcuts();
  //   sync.start(userStatus);
  // }
  //
  // clipboardEventEmitter.initialize();
  // clipboardEventEmitter.onChange(applicationHelper.clipboardChangeHandler);
});
