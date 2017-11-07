const path = require('path');

let baiduWindow = null;
let webContents = null;

const preloadJs = path.join(__dirname, '/preload.js');
const loginUrl = 'https://passport.baidu.com/v2/?login';

export const init = () => {
	$('#open').click(openHandler);
};

// return void(0);

function openHandler() {
	baiduWindow = createWindow();
	webContents = baiduWindow.webContents;

	webContents.openDevTools();
	webContents.loadURL(loginUrl);
}

function createWindow() {
	const remote = require('electron').remote;
	const BrowserWindow = remote.BrowserWindow;
	return new BrowserWindow({
		parent: this,
		width: 800,
		height: 600,
		webPreferences: {
			preload: preloadJs,
			webSecurity: false,
			nodeIntegration: false
		}
	});
};
